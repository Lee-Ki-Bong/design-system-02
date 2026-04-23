'use client';

import { cn } from '@/lib/cn';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  searchable?: boolean;
  multiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
}

export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  disabled,
  value: controlledValue,
  defaultValue,
  onChange,
  searchable = false,
  multiple = false,
  className,
  style,
  id,
  name,
}: SelectProps) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasError = !!error;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [multiValues, setMultiValues] = useState<string[]>(defaultValue ? [defaultValue] : []);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  // Filter options for search
  const filteredOptions =
    searchable && search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

  // Get display label
  const getDisplayLabel = () => {
    if (multiple) {
      if (multiValues.length === 0) return null;
      return multiValues.map((v) => options.find((o) => o.value === v)?.label).filter(Boolean);
    }
    const selected = options.find((o) => o.value === selectedValue);
    return selected ? selected.label : null;
  };

  const displayLabel = getDisplayLabel();
  const showPlaceholder = multiple ? multiValues.length === 0 : !displayLabel;

  // Dropdown position (portal)
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    width: number;
    dropUp: boolean;
  } | null>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldDropUp = spaceBelow < 240 && rect.top > spaceBelow;
    setDropdownPos({
      top: shouldDropUp ? rect.top + window.scrollY : rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      dropUp: shouldDropUp,
    });
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

  // Close on outside click
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
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Reset highlight when filtered options change
  useEffect(() => {
    setHighlightIndex(-1);
  }, [search]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multiple) {
        setMultiValues((prev) => {
          const next = prev.includes(optionValue)
            ? prev.filter((v) => v !== optionValue)
            : [...prev, optionValue];
          onChange?.(next.join(','));
          return next;
        });
        // Keep open for multi-select
        return;
      }
      if (!isControlled) setInternalValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearch('');
      triggerRef.current?.focus();
    },
    [isControlled, multiple, onChange],
  );

  const handleRemoveChip = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setMultiValues((prev) => {
      const next = prev.filter((v) => v !== val);
      onChange?.(next.join(','));
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ': {
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        } else if (highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
          e.preventDefault();
          handleSelect(filteredOptions[highlightIndex].value);
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (isOpen) {
          setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        }
        break;
      }
      case 'Escape': {
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setSearch('');
          triggerRef.current?.focus();
        }
        break;
      }
      case 'Tab': {
        if (isOpen) {
          setIsOpen(false);
          setSearch('');
        }
        break;
      }
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !dropdownRef.current) return;
    const items = dropdownRef.current.querySelectorAll('[role="option"]');
    items[highlightIndex]?.scrollIntoView({ block: 'nearest' });
  }, [highlightIndex]);

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}

      {/* Hidden native input for form submission */}
      {name && (
        <input type="hidden" name={name} value={multiple ? multiValues.join(',') : selectedValue} />
      )}

      <div className="relative">
        {/* Trigger */}
        <button
          ref={triggerRef}
          id={selectId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={selectId ? `${selectId}-listbox` : undefined}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setIsOpen((prev) => !prev);
          }}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl text-sm outline-none text-left flex items-center gap-1.5"
          style={{
            minHeight: 'var(--height-lg)',
            padding: multiple && multiValues.length > 0 ? '4px 40px 4px 8px' : '0 40px 0 16px',
            backgroundColor: 'var(--color-surface-sunken)',
            color: showPlaceholder ? 'var(--color-text-disabled)' : 'var(--color-text)',
            border: `var(--border-width-thin) solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
            boxShadow: isOpen ? 'var(--ring)' : undefined,
            transition: 'var(--token-transition-fast)',
            flexWrap: multiple ? 'wrap' : undefined,
            ...(disabled
              ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' }
              : { cursor: 'pointer' }),
            ...style,
          }}
        >
          {multiple && multiValues.length > 0 ? (
            multiValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-lg text-xs font-medium"
                  style={{
                    padding: '2px 6px 2px 8px',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {opt?.label}
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => handleRemoveChip(val, e)}
                    className="cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--color-text-tertiary)', lineHeight: 1 }}
                  >
                    ×
                  </span>
                </span>
              );
            })
          ) : (
            <span className="truncate">
              {showPlaceholder ? placeholder : (displayLabel as string)}
            </span>
          )}
        </button>

        {/* Chevron */}
        <svg
          className="absolute right-3 top-1/2 pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: 'var(--color-text-tertiary)',
            transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
            transition: 'transform 150ms',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>

        {/* Dropdown (portal) */}
        {isOpen &&
          dropdownPos &&
          createPortal(
            <div
              ref={dropdownRef}
              id={selectId ? `${selectId}-listbox` : undefined}
              role="listbox"
              aria-multiselectable={multiple || undefined}
              className="overflow-auto"
              style={{
                position: 'absolute',
                zIndex: 9999,
                left: dropdownPos.left,
                width: dropdownPos.width,
                ...(dropdownPos.dropUp
                  ? { bottom: `calc(100vh - ${dropdownPos.top}px + 4px)` }
                  : { top: dropdownPos.top + 4 }),
                maxHeight: '200px',
                backgroundColor: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
                padding: 'var(--pad-xs)',
                border: '1px solid var(--color-border-subtle)',
              }}
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              {searchable && (
                <div style={{ padding: '0 var(--pad-xs) var(--pad-xs)' }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="검색..."
                    className="w-full rounded-lg text-sm outline-none"
                    style={{
                      height: '32px',
                      padding: '0 var(--pad-sm)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div
                  className="text-sm text-center py-3"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  결과 없음
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isActive = multiple
                    ? multiValues.includes(option.value)
                    : option.value === selectedValue;
                  const isHighlighted = index === highlightIndex;

                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => handleSelect(option.value)}
                      className="flex items-center justify-between cursor-pointer text-sm font-medium"
                      style={{
                        padding: 'var(--pad-sm) var(--pad-md)',
                        borderRadius: 'var(--radius-md)',
                        color:
                          isActive || isHighlighted
                            ? 'var(--color-text)'
                            : 'var(--color-text-secondary)',
                        backgroundColor: isHighlighted
                          ? 'var(--color-surface)'
                          : isActive
                            ? 'var(--color-surface)'
                            : undefined,
                        transition: 'background 150ms',
                      }}
                      onMouseEnter={() => setHighlightIndex(index)}
                      onMouseLeave={() => setHighlightIndex(-1)}
                    >
                      <span>{option.label}</span>
                      {isActive && (
                        <span
                          className="text-sm font-semibold"
                          style={{ color: 'var(--color-emphasis)' }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>,
            document.body,
          )}
      </div>

      {(error || hint) && (
        <span
          className="text-xs"
          style={{
            color: error ? 'var(--color-error)' : 'var(--color-text-tertiary)',
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
