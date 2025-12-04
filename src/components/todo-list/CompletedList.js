'use client';

import PropTypes from 'prop-types';

export function CompletedList({ todos, onToggle }) {
    if (!todos.length) {
        return (
            <p className="py-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
                완료된 작업이 여기에 표시돼요
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm group"
                >
                    <label className="flex flex-1 items-center gap-3 pr-3 text-sm text-slate-600 line-through cursor-pointer">
                        <span className="relative inline-flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked
                                onChange={() => onToggle(todo.id)}
                                className="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white transition-all checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                aria-label={`${todo.text} 다시 진행`}
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
                </li>
            ))}
        </ul>
    );
}

CompletedList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
};
