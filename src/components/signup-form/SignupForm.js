'use client';

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { signUp } from '@/lib/auth';

export function SignupForm({ onSuccess, onError }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleEmailChange = useCallback((event) => {
        setEmail(event.target.value);
        setError('');
    }, []);

    const handlePasswordChange = useCallback((event) => {
        setPassword(event.target.value);
        setError('');
    }, []);

    const handleConfirmPasswordChange = useCallback((event) => {
        setConfirmPassword(event.target.value);
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

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return false;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }

        return true;
    }, [email, password, confirmPassword]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setError('');

            if (!validateForm()) {
                return;
            }

            setIsLoading(true);

            try {
                const { error: signUpError, data } = await signUp(email, password);

                if (signUpError) {
                    setError(signUpError);
                    if (onError) onError(signUpError);
                    return;
                }

                setSuccess(true);
                setError('');

                if (onSuccess) {
                    onSuccess(data);
                }
            } catch (err) {
                const errorMessage = err.message || '회원가입 중 오류가 발생했습니다.';
                setError(errorMessage);
                if (onError) onError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        [email, password, validateForm, onSuccess, onError]
    );

    if (success) {
        return (
            <div className="space-y-4">
                <div
                    className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700"
                    role="alert"
                >
                    <p className="font-semibold">회원가입이 완료되었습니다!</p>
                    <p className="mt-2">
                        이메일 인증 링크를 {email}로 전송했습니다. 이메일을 확인하여 계정을 활성화해주세요.
                    </p>
                </div>
            </div>
        );
    }

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
                    placeholder="최소 6자 이상"
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    autoComplete="new-password"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                    비밀번호 확인
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    autoComplete="new-password"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !email || !password || !confirmPassword}
                className="w-full rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {isLoading ? '처리 중...' : '회원가입'}
            </button>
        </form>
    );
}

SignupForm.propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};
