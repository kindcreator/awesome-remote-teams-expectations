import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme-provider';

/**
 * Custom render function that includes providers
 * No IS_TEST_MODE needed - providers work the same in tests
 */
function render(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { render };