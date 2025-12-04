'use client';

import PropTypes from 'prop-types';

export function TodoList({ todos, onToggle, onDelete, isChecked }) {
    if (!todos.length) {
        return (
            <p className="py-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
                해야 할 작업이 없어요 🎉
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm group"
                >
                    <label className="flex flex-1 items-center gap-3 pr-3 text-sm font-medium text-slate-800 cursor-pointer">
                        <span className="relative inline-flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isChecked ? todo.completed : false}
                                onChange={() => onToggle(todo.id)}
                                className="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white transition-all checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                aria-label={`${todo.text} 완료 처리`}
                            />
                            <svg
                                className="absolute inset-0 h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth="3"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        {todo.text}
                    </label>
                    {onDelete && (
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                            aria-label={`${todo.text} 삭제`}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    isChecked: PropTypes.bool,
};

TodoList.defaultProps = {
    isChecked: false,
};
