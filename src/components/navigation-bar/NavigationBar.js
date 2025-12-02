'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getCurrentUser, signOut, onAuthStateChange } from '@/lib/auth';

export function NavigationBar({ onGoHome, onGoDashboard }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            try {
                const { data } = await getCurrentUser();
                setUser(data?.user || null);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        checkUser();

        // 인증 상태 변경 감지
        const {
            data: { subscription },
        } = onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            console.error('로그아웃 오류:', error);
            return;
        }
        setUser(null);
        window.location.href = '/signin';
    };

    return (
        <nav className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/95 p-4 shadow">
            <button onClick={onGoHome}>
                <span className="text-lg font-bold text-slate-900 hover:bg-teal-50 hover:text-teal-700">Todo App</span>
            </button>
            <div className="flex gap-2">
                <button
                    onClick={onGoDashboard}
                    className="rounded-md px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                    aria-label="대시보드"
                >
                    대시보드
                </button>
                {!isLoading && (
                    <>
                        {user ? (
                            <button
                                onClick={handleSignOut}
                                className="rounded-md px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                                aria-label="로그아웃"
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link
                                href="/signin"
                                className="rounded-md px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                                aria-label="로그인"
                            >
                                로그인
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
