'use client';

import { supabase } from './supabaseClient';

export async function signUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            return { error: error.message, data: null };
        }

        return { error: null, data };
    } catch (error) {
        return { error: error.message || '회원가입 중 오류가 발생했습니다.', data: null };
    }
}

export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { error: error.message, data: null };
        }

        return { error: null, data };
    } catch (error) {
        return { error: error.message || '로그인 중 오류가 발생했습니다.', data: null };
    }
}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { error: error.message };
        }
        return { error: null };
    } catch (error) {
        return { error: error.message || '로그아웃 중 오류가 발생했습니다.' };
    }
}

export function getCurrentUser() {
    return supabase.auth.getUser();
}

export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
}
