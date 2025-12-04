'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/login-form/LoginForm';
import { getCurrentUser } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const { data, error } = await getCurrentUser();
                if (!error && data?.user) {
                    // 이미 로그인된 사용자는 홈으로 리다이렉트
                    router.replace('/');
                    return;
                }
            } catch (err) {
                // 에러는 무시 (로그인되지 않은 상태)
            } finally {
                setIsChecking(false);
            }
        }

        checkAuth();
    }, [router]);

    const handleSuccess = () => {
        // replace를 사용해서 히스토리를 교체 (뒤로가기 방지)
        router.replace('/');
    };

    if (isChecking) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-16">
                <div className="text-center text-white">
                    <p>로딩 중...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-16">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl">
                <header className="space-y-1 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">로그인</h1>
                    <p className="text-sm text-slate-500">이메일과 비밀번호를 입력하여 로그인하세요</p>
                </header>

                <LoginForm onSuccess={handleSuccess} />
            </div>
        </main>
    );
}
