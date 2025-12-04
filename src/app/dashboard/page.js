'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const {
                    data: { user },
                    error,
                } = await getCurrentUser();
                if (error || !user) {
                    // AuthSessionMissingError는 정상적인 상황 (로그인하지 않은 상태)
                    // 에러 로그를 출력하지 않고 조용히 리다이렉트
                    router.replace('/signin');
                    return;
                }
                setUser(user || null);
                fetchStats(user.id);
            } catch (err) {
                // AuthSessionMissingError는 정상적인 상황
                if (err?.message && !err.message.includes('Auth session missing')) {
                    console.error('Error:', err);
                }
                router.replace('/signin');
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    const fetchStats = async (userId) => {
        try {
            const { data: todos, error } = await supabase.from('todos').select('*').eq('user_id', userId);
            if (error) throw error;

            const completed = todos.filter((todo) => todo.completed).length;
            setStats({
                total: todos.length,
                completed: completed,
                pending: todos.length - completed,
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
            alert('대시보드 정보를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-16">
                <div className="text-center text-white">
                    <p>로딩 중...</p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-700">대시보드</h1>
            {/* 사용자 정보 카드 */}
            <div className="rounded-lg flex flex-row items-center border border-slate-200 bg-white p-6 rounded-lg shadow-sm gap-8">
                <p className="text-sm text-slate-500">사용자 정보</p>
                <p className="text-sm text-slate-700">이메일: {user.email}</p>
            </div>
            {/* 메인 콘텐츠 */}

            <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 전체 할 일 카드 */}
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-slate-500">전체 할 일</p>
                        <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
                    </div>

                    {/* 완료된 할 일 카드 */}
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-slate-500">완료된 할 일</p>
                        <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
                    </div>

                    {/* 진행중인 할 일 카드 */}
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-slate-500">진행중인 할 일</p>
                        <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
