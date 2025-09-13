// src/test/mocks/next-themes.tsx
import React from 'react';
import { vi } from 'vitest';

// Mock for next-themes library
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div data-testid="theme-provider-mock">{children}</div>;
}

export function useTheme() {
  return {
    theme: 'light',
    setTheme: vi.fn(),
    themes: ['light', 'dark', 'system'],
  };
}