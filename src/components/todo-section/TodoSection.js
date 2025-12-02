'use client'

import PropTypes from 'prop-types'

export function TodoSection({ title, children }) {
    return (
        <section className='space-y-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow'>
            <h2 className='text-xs font-semibold uppercase tracking-[0.4em] text-slate-500'>
                {title}
            </h2>
            {children}
        </section>
    )
}

TodoSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

