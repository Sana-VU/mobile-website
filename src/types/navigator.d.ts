interface WindowNavigator extends Navigator {
  standalone?: boolean;
}

declare global {
  interface Window {
    navigator: WindowNavigator;
  }
}

export {};
