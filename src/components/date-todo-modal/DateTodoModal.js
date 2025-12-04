'use client';

import PropTypes from 'prop-types';

export function DateTodoModal({ isOpen, date, todos, onClose }) {
    if (!isOpen) return null;

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${weekDay})`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-700">{formatDate(date)}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                {/* Todo 목록 */}
                <div className="max-h-96 overflow-y-auto">
                    {todos && todos.length > 0 ? (
                        <ul className="space-y-2">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={`rounded-md border border-slate-200 p-3 ${
                                        todo.completed ? 'bg-slate-50 opacity-75' : 'bg-white'
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span
                                            className={`mt-1 h-4 w-4 flex-shrink-0 rounded border-2 ${
                                                todo.completed ? 'border-green-500 bg-green-500' : 'border-slate-300'
                                            }`}
                                        >
                                            {todo.completed && (
                                                <svg
                                                    className="h-full w-full text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                        <span
                                            className={`flex-1 text-sm ${
                                                todo.completed ? 'text-slate-500 line-through' : 'text-slate-700'
                                            }`}
                                        >
                                            {todo.text}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="py-8 text-center text-sm text-slate-500">이 날짜에 할 일이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

DateTodoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date),
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        })
    ),
    onClose: PropTypes.func.isRequired,
};

DateTodoModal.defaultProps = {
    date: null,
    todos: [],
};
