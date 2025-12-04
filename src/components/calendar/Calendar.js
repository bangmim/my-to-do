'use client';

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export function Calendar({ todos, onDateClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // 현재 월의 첫 번째 날과 마지막 날 계산
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // todos를 날짜별로 그룹화
    const todosByDate = useMemo(() => {
        const grouped = {};
        todos.forEach((todo) => {
            if (todo.created_at) {
                const date = new Date(todo.created_at);
                const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                    date.getDate()
                ).padStart(2, '0')}`;
                if (!grouped[dateKey]) {
                    grouped[dateKey] = [];
                }
                grouped[dateKey].push(todo);
            }
        });
        return grouped;
    }, [todos]);

    // 날짜 키 생성 헬퍼 함수
    const getDateKey = (day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    // 이전 달로 이동
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    // 다음 달로 이동
    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // 오늘로 이동
    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // 날짜 클릭 핸들러
    const handleDateClick = (day) => {
        const dateKey = getDateKey(day);
        const dateTodos = todosByDate[dateKey] || [];
        if (onDateClick) {
            onDateClick(new Date(year, month, day), dateTodos);
        }
    };

    // 달력 그리드 생성
    const calendarDays = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 빈 칸 추가 (첫 번째 날 이전)
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDays.push(null);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // 오늘 날짜 확인
    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm max-w-lg mx-auto">
            {/* 헤더 */}
            <div className="mb-2 flex items-center justify-between">
                <button
                    onClick={goToPreviousMonth}
                    className="rounded-md px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    aria-label="이전 달"
                >
                    ←
                </button>
                <h2 className="text-base font-semibold text-slate-700">
                    {year}년 {month + 1}월
                </h2>
                <button
                    onClick={goToNextMonth}
                    className="rounded-md px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    aria-label="다음 달"
                >
                    →
                </button>
            </div>

            {/* 오늘로 이동 버튼 */}
            <div className="mb-2 flex justify-center">
                <button
                    onClick={goToToday}
                    className="rounded-md px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                    오늘
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="mb-1 grid grid-cols-7 gap-0.5">
                {weekDays.map((day) => (
                    <div key={day} className="text-center text-[10px] font-medium text-slate-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* 달력 그리드 */}
            <div className="grid grid-cols-7 gap-0.5">
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dateKey = getDateKey(day);
                    const hasTodos = todosByDate[dateKey] && todosByDate[dateKey].length > 0;
                    const todoCount = hasTodos ? todosByDate[dateKey].length : 0;
                    const todayClass = isToday(day) ? 'bg-blue-100 font-semibold' : '';

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square rounded text-xs transition-colors ${
                                hasTodos
                                    ? 'bg-teal-50 text-slate-700 hover:bg-teal-100'
                                    : 'text-slate-700 hover:bg-slate-50'
                            } ${todayClass}`}
                        >
                            <div className="flex h-full flex-col items-center justify-center">
                                <span className="text-xs">{day}</span>
                                {hasTodos && (
                                    <span className="mt-0.5 text-[10px] font-medium text-teal-600">{todoCount}</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

Calendar.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool,
            created_at: PropTypes.string,
        })
    ),
    onDateClick: PropTypes.func,
};

Calendar.defaultProps = {
    todos: [],
    onDateClick: null,
};
