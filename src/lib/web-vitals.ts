// Performance monitoring utilities for tracking Core Web Vitals

export function reportWebVitals(metric: any) {
  // Track Core Web Vitals
  switch (metric.name) {
    case "CLS":
      console.log("Cumulative Layout Shift:", metric.value);
      break;
    case "FID":
      console.log("First Input Delay:", metric.value);
      break;
    case "FCP":
      console.log("First Contentful Paint:", metric.value);
      break;
    case "LCP":
      console.log("Largest Contentful Paint:", metric.value);
      break;
    case "TTFB":
      console.log("Time to First Byte:", metric.value);
      break;
    default:
      break;
  }

  // In production, send to analytics service
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // Example: send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
  }
}
