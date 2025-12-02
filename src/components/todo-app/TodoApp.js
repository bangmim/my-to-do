'use client'

import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { NavigationBar } from '@/components/navigation-bar/NavigationBar'
import { TodoSection } from '@/components/todo-section/TodoSection'
import { FloatingButton } from '@/components/floating-button/FloatingButton'
import { AddTodoModal } from '@/components/add-todo-modal/AddTodoModal'

const initialTodos = [
    { id: crypto.randomUUID(), label: 'Next.js 구조 정리', isDone: false },
    { id: crypto.randomUUID(), label: 'Zustand 상태 설계', isDone: false }
]

function TodoList({ todos, onToggle, isChecked }) {
    if (!todos.length) {
        return (
            <p className='py-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400'>
                해야 할 작업이 없어요 🎉
            </p>
        )
    }

    return (
        <ul className='space-y-2'>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className='flex items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm'
                >
                    <label className='flex flex-1 items-center gap-3 pr-3 text-sm font-medium text-slate-800'>
                        <input
                            type='checkbox'
                            checked={isChecked ? todo.isDone : false}
                            onChange={() => onToggle(todo.id)}
                            className='h-4 w-4 appearance-none rounded border border-slate-300 checked:bg-teal-500 checked:text-white focus:outline-none focus:ring-2 focus:ring-teal-200'
                            aria-label={`${todo.label} 완료 처리`}
                        />
                        {todo.label}
                    </label>
                </li>
            ))}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    isChecked: PropTypes.bool
}

TodoList.defaultProps = {
    isChecked: false
}

function CompletedList({ todos, onToggle }) {
    if (!todos.length) {
        return (
            <p className='py-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400'>
                완료된 작업이 여기에 표시돼요
            </p>
        )
    }

    return (
        <ul className='space-y-2'>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className='flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm'
                >
                    <label className='flex flex-1 items-center gap-3 pr-3 text-sm text-slate-600 line-through'>
                        <input
                            type='checkbox'
                            checked
                            onChange={() => onToggle(todo.id)}
                            className='h-4 w-4 appearance-none rounded border border-slate-300 checked:bg-teal-500 checked:text-white focus:outline-none focus:ring-2 focus:ring-teal-200'
                            aria-label={`${todo.label} 다시 진행`}
                        />
                        {todo.label}
                    </label>
                </li>
            ))}
        </ul>
    )
}

CompletedList.propTypes = {
    todos: TodoList.propTypes.todos,
    onToggle: PropTypes.func.isRequired
}

export function TodoApp() {
    const [todos, setTodos] = useState(initialTodos)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalValue, setModalValue] = useState('')

    const pendingTodos = useMemo(
        () => todos.filter(todo => !todo.isDone),
        [todos]
    )

    const completedTodos = useMemo(
        () => todos.filter(todo => todo.isDone),
        [todos]
    )

    const handleToggle = useCallback(id => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        )
    }, [])

    const handleModalChange = useCallback(event => {
        setModalValue(event.target.value)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setModalValue('')
    }, [])

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const handleAddTodo = useCallback(
        event => {
            event.preventDefault()
            const label = modalValue.trim()
            if (!label) return
            setTodos(prev => [
                { id: crypto.randomUUID(), label, isDone: false },
                ...prev
            ])
            setModalValue('')
            setIsModalOpen(false)
        },
        [modalValue]
    )

    const handleGoHome = useCallback(() => {
        window.location.href = '/'
    }, [])

    const handleGoDashboard = useCallback(() => {
        window.location.href = '/dashboard'
    }, [])

    return (
        <div className='flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-10'>
            <div className='relative w-full max-w-xl space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl'>
                <NavigationBar onGoHome={handleGoHome} onGoDashboard={handleGoDashboard} />

                <header className='space-y-1 text-center'>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.4em] text-teal-600'>
                        Todo Studio
                    </p>
                    <h1 className='text-xl font-semibold text-slate-900'>오늘의 작업을 정리해요</h1>
                    <p className='text-sm text-slate-500'>
                        위쪽에는 해야 할 일, 아래쪽에는 완료한 작업을 모아보세요.
                    </p>
                </header>

                <TodoSection title='할 일'>
                    <TodoList todos={pendingTodos} onToggle={handleToggle} />
                </TodoSection>

                <TodoSection title='완료'>
                    <CompletedList todos={completedTodos} onToggle={handleToggle} />
                </TodoSection>

                <FloatingButton onClick={handleOpenModal} />
            </div>

            <AddTodoModal
                isOpen={isModalOpen}
                value={modalValue}
                onChange={handleModalChange}
                onSubmit={handleAddTodo}
                onClose={handleCloseModal}
            />
        </div>
    )
}

