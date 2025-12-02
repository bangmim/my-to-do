'use client'

import PropTypes from 'prop-types'

export function AddTodoModal({ isOpen, value, onChange, onSubmit, onClose }) {
    if (!isOpen) return null

    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) onClose()
    }

    return (
        <div
            className='fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm'
            onClick={handleBackdropClick}
            role='dialog'
            aria-modal='true'
        >
            <div className='w-full max-w-sm rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-2xl'>
                <header className='mb-4 space-y-1 text-center'>
                    <p className='text-xs font-semibold uppercase tracking-[0.4em] text-teal-600'>
                        새 작업
                    </p>
                    <h2 className='text-lg font-semibold text-slate-900'>해야 할 일을 입력하세요</h2>
                </header>

                <form onSubmit={onSubmit} className='space-y-4'>
                    <input
                        className='w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100'
                        placeholder='예: 디자인 QA 체크'
                        value={value}
                        onChange={onChange}
                        autoFocus
                    />

                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:bg-slate-50'
                        >
                            취소
                        </button>
                        <button
                            type='submit'
                            disabled={!value.trim()}
                            className='rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:bg-slate-300'
                        >
                            추가
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

AddTodoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

