'use client'

import PropTypes from 'prop-types'

export function FloatingButton({ onClick }) {
    return (
        <button
            type='button'
            onClick={onClick}
            className='absolute -bottom-10 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white shadow-2xl transition hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-200'
            aria-label='작업 추가'
        >
            +
        </button>
    )
}

FloatingButton.propTypes = {
    onClick: PropTypes.func.isRequired
}

