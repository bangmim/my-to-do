'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/login-form/LoginForm';

export default function LoginPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/');
    };

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
