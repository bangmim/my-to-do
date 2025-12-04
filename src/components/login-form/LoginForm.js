'use client';

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function LoginForm({ onSuccess, onError }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = useCallback((event) => {
        setEmail(event.target.value);
        setError('');
    }, []);

    const handlePasswordChange = useCallback((event) => {
        setPassword(event.target.value);
        setError('');
    }, []);

    const validateForm = useCallback(() => {
        if (!email.trim()) {
            setError('이메일을 입력해주세요.');
            return false;
        }

        if (!email.includes('@')) {
            setError('올바른 이메일 형식이 아닙니다.');
            return false;
        }

        if (!password) {
            setError('비밀번호를 입력해주세요.');
            return false;
        }

        return true;
    }, [email, password]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setError('');

            if (!validateForm()) {
                return;
            }

            setIsLoading(true);

            try {
                const { error: signInError, data } = await signIn(email, password);

                if (signInError) {
                    setError(signInError);
                    if (onError) onError(signInError);
                    return;
                }

                if (onSuccess) {
                    onSuccess(data);
                } else {
                    router.push('/');
                }
            } catch (err) {
                const errorMessage = err.message || '로그인 중 오류가 발생했습니다.';
                setError(errorMessage);
                if (onError) onError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        [email, password, validateForm, onSuccess, onError, router]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    이메일
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="example@email.com"
                    required
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    autoComplete="email"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    비밀번호
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력하세요"
                    required
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    autoComplete="current-password"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {isLoading ? '처리 중...' : '로그인'}
            </button>
        </form>
    );
}

LoginForm.propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};
