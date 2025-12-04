'use client';

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '@/components/todo-list/TodoList';
import { CompletedList } from '@/components/todo-list/CompletedList';

export function TodoSection({ title, children, todos, onToggle, isCompleted }) {
    const filteredTodos = useMemo(() => {
        if (!todos) return [];
        if (isCompleted) {
            return todos.filter((todo) => todo.completed);
        }
        return todos.filter((todo) => !todo.completed);
    }, [todos, isCompleted]);

    return (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow">
            {title && <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{title}</h2>}
            {children && <div className="space-y-5">{children}</div>}
            {todos &&
                onToggle &&
                (isCompleted ? (
                    <CompletedList todos={filteredTodos} onToggle={onToggle} />
                ) : (
                    <TodoList todos={filteredTodos} onToggle={onToggle} isChecked={false} />
                ))}
        </section>
    );
}

TodoSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        })
    ),
    onToggle: PropTypes.func,
    isCompleted: PropTypes.bool,
};
