'use client';

import { useEffect, useState } from 'react';
import { NavigationBar } from '@/components/navigation-bar/NavigationBar';
import { getCurrentUser } from '@/lib/auth';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const { data, error } = await getCurrentUser();
                if (error) {
                    console.error('Error fetching user:', error);
                    window.location.href = '/signin';
                    return;
                }
                setUser(data?.user || null);
            } catch (err) {
                console.error('Error:', err);
                window.location.href = '/signin';
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoDashboard = () => {
        window.location.href = '/dashboard';
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
        <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-16">
            <div className="w-full max-w-4xl space-y-6 rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl">
                <NavigationBar onGoHome={handleGoHome} onGoDashboard={handleGoDashboard} />

                <header className="space-y-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">대시보드</p>
                    <h1 className="text-2xl font-semibold text-slate-900">환영합니다!</h1>
                    <p className="text-sm text-slate-500">{user.email}로 로그인하셨습니다.</p>
                </header>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">대시보드 콘텐츠</h2>
                    <p className="text-sm text-slate-600">여기에 대시보드 콘텐츠를 추가하세요.</p>
                </div>
            </div>
        </main>
    );
}
