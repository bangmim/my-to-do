'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

export function CompletionChart({ total, completed }) {
    const [hoveredSection, setHoveredSection] = useState(null); // 'completed' 또는 'pending'
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const pending = total - completed;
    const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-700">달성률</h2>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                {/* 도넛 차트 */}
                <div className="relative">
                    <svg width="160" height="160" className="transform -rotate-90">
                        {/* 배경 원 (진행중 영역) */}
                        <g
                            onMouseEnter={() => setHoveredSection('pending')}
                            onMouseLeave={() => setHoveredSection(null)}
                            className="cursor-pointer"
                        >
                            <circle cx="80" cy="80" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="12" />
                        </g>
                        {/* 진행 원 (완료 영역) */}
                        <g
                            onMouseEnter={() => setHoveredSection('completed')}
                            onMouseLeave={() => setHoveredSection(null)}
                            className="cursor-pointer"
                        >
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="none"
                                stroke={percentage >= 80 ? '#10b981' : percentage >= 50 ? '#3b82f6' : '#f59e0b'}
                                strokeWidth="12"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-500 ease-in-out"
                            />
                        </g>
                    </svg>
                    {/* 중앙 퍼센트 텍스트 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-700">{percentage}%</div>
                            <div className="text-xs text-slate-500">완료</div>
                        </div>
                    </div>

                    {/* 완료 영역 호버 툴팁 */}
                    {hoveredSection === 'completed' && (
                        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg border border-slate-200 bg-slate-800 px-4 py-3 shadow-lg">
                            <div className="space-y-2 text-sm text-white">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-300">완료</span>
                                    <span className="font-semibold text-green-400">{completed}개</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-300">달성률</span>
                                    <span className="font-semibold">{percentage}%</span>
                                </div>
                            </div>
                            {/* 툴팁 화살표 */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full">
                                <div className="h-0 w-0 border-4 border-transparent border-b-slate-800"></div>
                            </div>
                        </div>
                    )}

                    {/* 진행중 영역 호버 툴팁 */}
                    {hoveredSection === 'pending' && (
                        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg border border-slate-200 bg-slate-800 px-4 py-3 shadow-lg">
                            <div className="space-y-2 text-sm text-white">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-300">진행중</span>
                                    <span className="font-semibold text-yellow-400">{pending}개</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-300">달성률</span>
                                    <span className="font-semibold">{pendingPercentage}%</span>
                                </div>
                            </div>
                            {/* 툴팁 화살표 */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full">
                                <div className="h-0 w-0 border-4 border-transparent border-b-slate-800"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 통계 정보 */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm text-slate-500">완료</span>
                            <span className="text-lg font-semibold text-slate-700">{completed}</span>
                            <span className="text-xs text-slate-400">/ {total}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm text-slate-500">진행중</span>
                            <span className="text-lg font-semibold text-slate-700">{total - completed}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CompletionChart.propTypes = {
    total: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
};

CompletionChart.defaultProps = {
    total: 0,
    completed: 0,
};
