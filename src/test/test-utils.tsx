import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Use our mock ThemeProvider for tests
import { ThemeProvider } from "@/test/mocks/next-themes";

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
