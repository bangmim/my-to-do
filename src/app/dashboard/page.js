'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/calendar/Calendar';
import { DateTodoModal } from '@/components/date-todo-modal/DateTodoModal';
import { CompletionChart } from '@/components/completion-chart/CompletionChart';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
    });
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTodos, setSelectedDateTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                if (user?.id) {
                    fetchStats(user.id);
                    fetchMonthlyStats(user.id);
                    fetchTodos(user.id);
                }
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

    const fetchTodos = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            if (error) throw error;
            setTodos(data || []);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

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

    const fetchMonthlyStats = async (userId) => {
        if (!userId) {
            console.log('No user ID available');
            setMonthlyStats([]);
            return;
        }

        try {
            // view를 통해 월별 통계 조회
            const { data, error } = await supabase
                .from('monthly_todo_stats')
                .select('*')
                .eq('user_id', userId)
                .order('month', { ascending: false })
                .limit(6);
            if (error) throw error;
            console.log('Monthly stats data:', data); // 디버깅용
            setMonthlyStats(data || []);
        } catch (err) {
            console.error('Error fetching monthly stats:', err);
            alert('월별 통계 정보를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateClick = (date, dateTodos) => {
        setSelectedDate(date);
        setSelectedDateTodos(dateTodos);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setSelectedDateTodos([]);
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
        <div className="space-y-6 px-8">
            <h1 className="text-2xl font-semibold text-slate-700">대시보드</h1>
            {/* 사용자 정보 카드 */}
            <div className="rounded-lg flex flex-row items-center border border-slate-200 bg-white p-6 rounded-lg shadow-sm gap-8">
                <p className="text-sm text-slate-500">사용자 정보</p>
                <p className="text-sm text-slate-700">이메일: {user.email}</p>
            </div>

            {/* 달력 카드 */}
            <Calendar todos={todos} onDateClick={handleDateClick} />

            {/* 메인 콘텐츠 */}

            <div className=" py-8">
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

                {/* 달성률 차트 */}
                <div className="mt-6">
                    <CompletionChart total={stats.total} completed={stats.completed} />
                </div>

                {/* 월별 통계 카드 */}
                <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-700">월별 통계</h2>
                    {monthlyStats && monthlyStats.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">월</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">
                                            전체
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">
                                            완료
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">
                                            진행중
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyStats.map((stat, index) => {
                                        // 다양한 필드명 시도 (month, month_year, period 등)
                                        const monthValue = stat.month || stat.month_year || stat.period || stat.date;
                                        let monthDate;

                                        if (monthValue) {
                                            monthDate = new Date(monthValue);
                                        } else {
                                            // month 필드가 없으면 인덱스로 임시 처리
                                            monthDate = new Date();
                                            monthDate.setMonth(monthDate.getMonth() - index);
                                        }

                                        const monthLabel = `${monthDate.getFullYear()}년 ${monthDate.getMonth() + 1}월`;

                                        // 다양한 필드명 시도
                                        const total = stat.total_todos;
                                        const completed = stat.completed_todos;
                                        const pending = total - completed;

                                        return (
                                            <tr
                                                key={stat.month || stat.month_year || stat.period || index}
                                                className="border-b border-slate-100 hover:bg-slate-50"
                                            >
                                                <td className="px-4 py-3 text-sm text-slate-700">{monthLabel}</td>
                                                <td className="px-4 py-3 text-right text-sm text-blue-600">{total}</td>
                                                <td className="px-4 py-3 text-right text-sm font-medium text-green-600">
                                                    {completed}
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm font-medium text-yellow-500">
                                                    {pending}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">월별 통계 데이터가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 날짜별 Todo 모달 */}
            <DateTodoModal
                isOpen={isModalOpen}
                date={selectedDate}
                todos={selectedDateTodos}
                onClose={handleCloseModal}
            />
        </div>
    );
}
