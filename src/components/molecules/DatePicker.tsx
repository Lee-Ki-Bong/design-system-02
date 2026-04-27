'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/atoms/Icon';

/* ─── types ─── */

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  dateFormat?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  className?: string;
  style?: React.CSSProperties;
}

type View = 'days' | 'months' | 'years';

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

/* ─── sub: NavButton ─── */

function NavBtn({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 32,
        height: 32,
        border: 'none',
        borderRadius: 'var(--radius-md)',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background var(--token-transition-fast), color var(--token-transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-text-secondary)';
      }}
    >
      {children}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/* ─── sub: GridCell ─── */

function GridCell({
  label,
  active,
  current,
  onClick,
}: {
  label: string;
  active: boolean;
  current: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: 'var(--pad-sm) var(--pad-xs)',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        background: active ? 'var(--color-emphasis)' : 'transparent',
        color: active
          ? 'var(--color-on-emphasis)'
          : current
            ? 'var(--color-primary)'
            : 'var(--color-text)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: active || current ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
        cursor: 'pointer',
        transition: 'background var(--token-transition-fast)',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      {label}
    </button>
  );
}

/* ─── main ─── */

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'YYYY-MM-DD',
  dateFormat = 'yyyy-MM-dd',
  disabled = false,
  error,
  label,
  hint,
  className,
  style,
}: DatePickerProps) {
  const isControlled = controlledValue !== undefined;
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue);
  const selected = isControlled ? controlledValue : internalDate;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selected ? format(selected, dateFormat) : '');
  const [view, setView] = useState<View>('days');
  const [viewMonth, setViewMonth] = useState(() => selected ?? new Date());
  const [yearRangeStart, setYearRangeStart] = useState(() => {
    const y = (selected ?? new Date()).getFullYear();
    return y - 10;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const themeParent = containerRef.current.closest('[data-theme]') as HTMLElement | null;
    setPortalTarget(themeParent ?? document.body);
  }, []);

  useEffect(() => {
    if (isControlled) {
      setInputValue(controlledValue ? format(controlledValue, dateFormat) : '');
    }
  }, [controlledValue, dateFormat, isControlled]);

  // Reset view when opening
  useEffect(() => {
    if (isOpen) {
      setView('days');
      const d = selected ?? new Date();
      setViewMonth(d);
      setYearRangeStart(d.getFullYear() - 10);
    }
  }, [isOpen, selected]);

  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);

  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom, left: rect.left });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDropdownPos(null);
      return;
    }
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) setInternalDate(date);
    setInputValue(date ? format(date, dateFormat) : '');
    onChange?.(date);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const parsed = parse(val, dateFormat, new Date());
    if (isValid(parsed) && val.length === dateFormat.length) {
      if (!isControlled) setInternalDate(parsed);
      onChange?.(parsed);
    }
  };

  const handleInputBlur = () => {
    if (selected) setInputValue(format(selected, dateFormat));
  };

  /* ─── nav handlers ─── */

  const handlePrev = () => {
    if (view === 'days') {
      setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else if (view === 'months') {
      setViewMonth((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    } else {
      setYearRangeStart((s) => s - 21);
    }
  };

  const handleNext = () => {
    if (view === 'days') {
      setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else if (view === 'months') {
      setViewMonth((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
    } else {
      setYearRangeStart((s) => s + 21);
    }
  };

  const handleMonthSelect = (monthIdx: number) => {
    setViewMonth(new Date(viewMonth.getFullYear(), monthIdx, 1));
    setView('days');
  };

  const handleYearSelect = (year: number) => {
    setViewMonth(new Date(year, viewMonth.getMonth(), 1));
    setView('days');
  };

  const handleToday = () => {
    handleSelect(new Date());
  };

  const hasError = !!error;
  const now = new Date();

  /* ─── nav title ─── */

  const navBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    padding: '2px var(--pad-xs)',
    borderRadius: 'var(--radius-md)',
    transition: 'background var(--token-transition-fast)',
  };

  const chevronDown = (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const renderNavTitle = () => {
    if (view === 'days') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <button
            type="button"
            onClick={() => {
              setYearRangeStart(viewMonth.getFullYear() - 10);
              setView('years');
            }}
            style={navBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-surface)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {viewMonth.getFullYear()}년 {chevronDown}
          </button>
          <button
            type="button"
            onClick={() => setView('months')}
            style={navBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-surface)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {viewMonth.getMonth() + 1}월 {chevronDown}
          </button>
        </div>
      );
    }
    if (view === 'months') {
      return (
        <button
          type="button"
          onClick={() => {
            setYearRangeStart(viewMonth.getFullYear() - 10);
            setView('years');
          }}
          style={navBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-surface)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {viewMonth.getFullYear()}년 {chevronDown}
        </button>
      );
    }
    return (
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--font-size-body)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text)',
          padding: '0 var(--pad-xs)',
        }}
      >
        {yearRangeStart} ~ {yearRangeStart + 20}
      </span>
    );
  };

  /* ─── render ─── */

  return (
    <div className={cn('ds-date-picker flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => !disabled && setIsOpen(true)}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-xl text-sm outline-none"
          style={{
            height: 'var(--height-lg)',
            padding: '0 40px 0 16px',
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-text)',
            borderWidth: 'var(--border-width-thin)',
            borderStyle: 'solid',
            borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)',
            boxShadow: isOpen ? 'var(--ring)' : undefined,
            transition: 'var(--token-transition-fast)',
            ...(disabled ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' } : {}),
            ...style,
          }}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <Icon name="calendar" size={18} />
        </span>
      </div>

      {(error || hint) && (
        <span
          className="text-xs"
          style={{ color: error ? 'var(--color-error)' : 'var(--color-text-tertiary)' }}
        >
          {error || hint}
        </span>
      )}

      {isOpen &&
        dropdownPos &&
        portalTarget &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              zIndex: 9999,
              top: dropdownPos.top + 4,
              left: dropdownPos.left,
            }}
          >
            <style>{`
            .ds-rdp-panel {
              background: var(--color-surface-raised);
              border-radius: var(--radius-2xl);
              box-shadow: var(--shadow-lg);
              border: 1px solid var(--color-border-subtle);
              padding: var(--pad-lg);
              font-family: var(--font-sans);
              min-width: 300px;
            }
            @media (min-width: 640px) {
              .ds-rdp-panel {
                min-width: 380px;
                padding: var(--pad-xl);
              }
            }
            .ds-rdp-panel .rdp-root {
              --rdp-accent-color: var(--color-emphasis) !important;
              --rdp-accent-background-color: var(--color-emphasis) !important;
              --rdp-day-height: 44px !important;
              --rdp-day-width: 44px !important;
              --rdp-day_button-height: 40px !important;
              --rdp-day_button-width: 40px !important;
              --rdp-day_button-border-radius: var(--radius-md) !important;
              --rdp-day_button-border: 2px solid transparent !important;
              --rdp-outside-opacity: 0.4 !important;
              --rdp-today-color: var(--color-primary) !important;
              color: var(--color-text) !important;
              font-family: var(--font-sans) !important;
            }
            @media (min-width: 640px) {
              .ds-rdp-panel .rdp-root {
                --rdp-day-height: 48px !important;
                --rdp-day-width: 48px !important;
                --rdp-day_button-height: 44px !important;
                --rdp-day_button-width: 44px !important;
              }
            }
            .ds-rdp-panel .rdp-months { width: 100% !important; }
            .ds-rdp-panel .rdp-month { width: 100% !important; }
            .ds-rdp-panel .rdp-month_grid { width: 100% !important; }
            .ds-rdp-panel .rdp-month_caption { display: none !important; }
            .ds-rdp-panel .rdp-nav { display: none !important; }
            .ds-rdp-panel .rdp-weekdays {
              display: grid !important;
              grid-template-columns: repeat(7, 1fr) !important;
              width: 100% !important;
            }
            .ds-rdp-panel .rdp-week {
              display: grid !important;
              grid-template-columns: repeat(7, 1fr) !important;
              width: 100% !important;
            }
            .ds-rdp-panel .rdp-day {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              height: auto !important;
              width: auto !important;
              padding: 3px !important;
            }
            .ds-rdp-panel .rdp-weekday {
              font-size: var(--font-size-caption) !important;
              font-weight: var(--font-weight-medium) !important;
              color: var(--color-text-tertiary) !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .ds-rdp-panel .rdp-day_button {
              font-size: var(--font-size-body-sm) !important;
              color: var(--color-text) !important;
              background: transparent !important;
              cursor: pointer !important;
              border-radius: var(--radius-lg) !important;
              width: 100% !important;
              height: 100% !important;
              padding: var(--pad-sm) !important;
              transition: background var(--token-transition-fast);
            }
            .ds-rdp-panel .rdp-day_button:hover {
              background: var(--color-surface) !important;
            }
            .ds-rdp-panel .rdp-selected .rdp-day_button {
              background: var(--color-emphasis) !important;
              color: var(--color-on-emphasis) !important;
              border-color: var(--color-emphasis) !important;
            }
            .ds-rdp-panel .rdp-today:not(.rdp-selected) .rdp-day_button {
              font-weight: var(--font-weight-bold) !important;
              color: var(--color-primary) !important;
            }
            .ds-rdp-panel .rdp-outside .rdp-day_button {
              color: var(--color-text-disabled) !important;
            }
            /* sunday (first column) */
            .ds-rdp-panel .rdp-weekday:first-child {
              color: var(--color-error) !important;
            }
            .ds-rdp-panel .rdp-day:first-child .rdp-day_button {
              color: var(--color-error) !important;
            }
            .ds-rdp-panel .rdp-selected .rdp-day_button,
            .ds-rdp-panel .rdp-day:first-child .rdp-selected .rdp-day_button {
              color: var(--color-on-emphasis) !important;
            }
            .ds-rdp-panel .rdp-outside .rdp-day_button,
            .ds-rdp-panel .rdp-day:first-child .rdp-outside .rdp-day_button {
              color: var(--color-text-disabled) !important;
            }
            .ds-rdp-panel .rdp-chevron {
              fill: currentColor !important;
            }
          `}</style>

            <div className="ds-rdp-panel">
              {/* Custom Nav: title + 오늘 + < > */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'var(--gap-md)',
                }}
              >
                {renderNavTitle()}
                <button
                  type="button"
                  onClick={handleToday}
                  style={{
                    marginLeft: 'var(--gap-sm)',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--font-size-caption)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-primary)',
                    cursor: 'pointer',
                    padding: 'var(--pad-xs) var(--pad-sm)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background var(--token-transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  오늘
                </button>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                  <NavBtn onClick={handlePrev} ariaLabel="이전">
                    <ChevronLeft />
                  </NavBtn>
                  <NavBtn onClick={handleNext} ariaLabel="다음">
                    <ChevronRight />
                  </NavBtn>
                </div>
              </div>

              {/* Days View */}
              {view === 'days' && (
                <DayPicker
                  mode="single"
                  selected={selected}
                  month={viewMonth}
                  onMonthChange={setViewMonth}
                  onSelect={handleSelect}
                  locale={ko}
                  showOutsideDays
                  hideNavigation
                />
              )}

              {/* Months View */}
              {view === 'months' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'var(--gap-sm)',
                    padding: 'var(--pad-sm) 0',
                  }}
                >
                  {MONTHS.map((m, i) => (
                    <GridCell
                      key={m}
                      label={m}
                      active={
                        selected !== undefined &&
                        selected.getFullYear() === viewMonth.getFullYear() &&
                        selected.getMonth() === i
                      }
                      current={
                        now.getFullYear() === viewMonth.getFullYear() && now.getMonth() === i
                      }
                      onClick={() => handleMonthSelect(i)}
                    />
                  ))}
                </div>
              )}

              {/* Years View */}
              {view === 'years' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'var(--gap-sm)',
                    padding: 'var(--pad-sm) 0',
                  }}
                >
                  {Array.from({ length: 21 }, (_, i) => yearRangeStart + i).map((y) => (
                    <GridCell
                      key={y}
                      label={String(y)}
                      active={selected !== undefined && selected.getFullYear() === y}
                      current={now.getFullYear() === y}
                      onClick={() => handleYearSelect(y)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>,
          portalTarget,
        )}
    </div>
  );
}
