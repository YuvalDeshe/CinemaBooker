'use client';

import React, { useState } from 'react';

type CalendarProps = {
  availableDates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

const Calendar: React.FC<CalendarProps> = ({
  availableDates,
  selectedDate,
  onDateSelect,
  isOpen,
  onToggle
}) => {
  // Get current month and year
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Convert available dates to Date objects for easier comparison
  const availableDateObjects = availableDates.map(date => new Date(date));
  
  // Get the first and last day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Get the number of days in the month
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Create array of days to display
  const days = [];
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const isDateAvailable = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    return availableDateObjects.some(availableDate => 
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
    );
  };

  const isDateSelected = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const selected = new Date(selectedDate);
    return selected.getFullYear() === date.getFullYear() &&
           selected.getMonth() === date.getMonth() &&
           selected.getDate() === date.getDate();
  };

  const handleDateClick = (day: number) => {
    if (isDateAvailable(day)) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0].split('-').join('/');
      // Format to match your database format (MM/DD/YYYY)
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      onDateSelect(formattedDate);
      onToggle();
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 1000,
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      minWidth: '280px'
    }}>
      {/* Header with month navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => navigateMonth('prev')}
          style={{
            background: 'none',
            border: 'none',
            color: '#f9fafb',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ‹
        </button>
        <span style={{
          color: '#f9fafb',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={() => navigateMonth('next')}
          style={{
            background: 'none',
            border: 'none',
            color: '#f9fafb',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ›
        </button>
      </div>

      {/* Day names header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px'
      }}>
        {dayNames.map(dayName => (
          <div key={dayName} style={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#9ca3af',
            padding: '4px'
          }}>
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px'
      }}>
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => day && handleDateClick(day)}
            style={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: day && isDateAvailable(day) ? 'pointer' : 'default',
              backgroundColor: day && isDateSelected(day) ? '#3b82f6' : 'transparent',
              color: day && isDateAvailable(day) 
                ? (day && isDateSelected(day) ? '#ffffff' : '#f9fafb')
                : '#6b7280',
              opacity: day && isDateAvailable(day) ? 1 : 0.4,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (day && isDateAvailable(day) && !isDateSelected(day)) {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }
            }}
            onMouseLeave={(e) => {
              if (day && isDateAvailable(day) && !isDateSelected(day)) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;