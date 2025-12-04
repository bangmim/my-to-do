'use client';

import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavigationBar } from '@/components/navigation-bar/NavigationBar';
import { TodoSection } from '@/components/todo-section/TodoSection';
import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { AddTodoModal } from '@/components/add-todo-modal/AddTodoModal';
import { supabase } from '@/lib/supabaseClient';

export function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTodoText, setNewTodoText] = useState('');
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                return;
            }
            setUser(user);
        };
        getUser();
    }, []);
    useEffect(() => {
        const fetchTodos = async () => {
            if (!user?.user?.id) return;
            const { data, error } = await supabase.from('todos').select('*').eq('user_id', user.user.id);
            if (error) {
                console.error('Error fetching todos:', error);
            } else {
                const formattedTodos = data.map((todo) => ({
                    id: todo.id,
                    text: todo.text,
                    completed: todo.completed,
                }));
                setTodos(formattedTodos);
            }
        };
        if (user?.user?.id) {
            console.log('Fetching todos for user:', user.user.id);
            fetchTodos();
        } else {
            console.log('No user ID available');
        }
    }, [user]);

    const handleToggle = async (id) => {
        try {
            const todoToUpdate = todos.find((todo) => todo.id === id);
            console.log('todoToUpdate', todoToUpdate);
            const { data, error } = await supabase
                .from('todos')
                .update({ completed: !todoToUpdate.completed })
                .eq('id', id)
                .select();
            if (error) {
                console.error('Error updating todo:', error);
                return;
            }

            setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleModalChange = useCallback((event) => {
        setNewTodoText(event.target.value);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setNewTodoText('');
    }, []);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleAddTodo = async (event) => {
        event.preventDefault();
        const text = newTodoText.trim();
        if (!text) return;
        if (!user || !user.user) {
            console.error('User not authenticated');
            alert('로그인이 필요합니다.');
            return;
        }
        const newTodo = {
            text: newTodoText,
            completed: false,
            user_id: user.user.id,
        };
        const { data, error } = await supabase.from('todos').insert([newTodo]).select();

        if (error) {
            alert(`할 일 추가 실패: ${error.message}`);

            return;
        }
        if (data && data.length > 0) {
            // Supabase 데이터를 UI 형식으로 변환
            const insertedTodo = {
                id: data[0].id,
                text: data[0].text, // text를 text로 매핑
                completed: data[0].completed, // completed를 completed으로 매핑
            };

            setTodos((prev) => [...prev, insertedTodo]);
            setNewTodoText('');
            setIsModalOpen(false);
        }
    };

    const handleGoHome = useCallback(() => {
        window.location.href = '/';
    }, []);

    const handleGoDashboard = useCallback(() => {
        window.location.href = '/dashboard';
    }, []);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-10">
            <div className="relative w-full max-w-xl space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl">
                <NavigationBar onGoHome={handleGoHome} onGoDashboard={handleGoDashboard} />

                <TodoSection title="Todo Studio">
                    <div className="space-y-1 text-center">
                        <h1 className="text-xl font-semibold text-slate-900">오늘의 작업을 정리해요</h1>
                        <p className="text-sm text-slate-500">
                            위쪽에는 해야 할 일, 아래쪽에는 완료한 작업을 모아보세요.
                        </p>
                    </div>

                    <TodoSection title="할 일" todos={todos} onToggle={handleToggle} />

                    <TodoSection title="완료" todos={todos} onToggle={handleToggle} isCompleted />
                </TodoSection>

                <FloatingButton onClick={handleOpenModal} />
            </div>

            <AddTodoModal
                isOpen={isModalOpen}
                value={newTodoText}
                onChange={handleModalChange}
                onSubmit={handleAddTodo}
                onClose={handleCloseModal}
            />
        </div>
    );
}
