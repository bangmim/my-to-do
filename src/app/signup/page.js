import { SignupForm } from '@/components/signup-form/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-16">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl">
                <header className="space-y-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">회원가입</p>
                    <h1 className="text-2xl font-semibold text-slate-900">새 계정 만들기</h1>
                    <p className="text-sm text-slate-500">이메일과 비밀번호를 입력하여 계정을 만드세요</p>
                </header>

                <SignupForm />

                <div className="text-center">
                    <p className="text-sm text-slate-600">
                        이미 계정이 있으신가요?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-teal-600 transition hover:text-teal-700 hover:underline"
                        >
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
