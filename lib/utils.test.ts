import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500', 'hover:bg-red-600');
    expect(result).toBe('px-2 py-1 bg-red-500 hover:bg-red-600');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    );
    
    expect(result).toBe('base-class active-class');
  });

  it('should override conflicting Tailwind classes', () => {
    // clsx with tailwind-merge will handle conflicts
    const result = cn('px-2', 'px-4', 'py-1');
    expect(result).toBe('px-4 py-1');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, '', 'final');
    expect(result).toBe('base final');
  });

  it('should handle arrays of classes', () => {
    const classes = ['mx-auto', 'max-w-7xl'];
    const result = cn(...classes, 'px-4');
    expect(result).toBe('mx-auto max-w-7xl px-4');
  });
});