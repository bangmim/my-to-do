'use client'

import PropTypes from 'prop-types'

export function NavigationBar({ onGoHome, onGoDashboard }) {
    return (
        <nav className='flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/95 p-4 shadow'>
            <span className='text-lg font-bold text-slate-900'>MyTodoApp</span>
            <div className='flex gap-2'>
                <button
                    onClick={onGoHome}
                    className='rounded-md px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700'
                    aria-label='홈'
                >
                    홈
                </button>
                <button
                    onClick={onGoDashboard}
                    className='rounded-md px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700'
                    aria-label='대시보드'
                >
                    대시보드
                </button>
            </div>
        </nav>
    )
}

NavigationBar.propTypes = {
    onGoHome: PropTypes.func.isRequired,
    onGoDashboard: PropTypes.func.isRequired
}

