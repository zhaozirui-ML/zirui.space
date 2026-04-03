export const typography = Object.freeze({
  families: {
    display: '"Inter", "Avenir Next", "Helvetica Neue", sans-serif',
    ui: '"Avenir Next", "Inter", "Segoe UI", sans-serif',
    body: '"Inter", "Segoe UI", sans-serif',
  },
  scales: {
    display: {
      size: "clamp(3.2rem, 7vw, 5.25rem)",
      lineHeight: "1.02",
      weight: 400,
    },
    headingLg: {
      size: "clamp(2.3rem, 4vw, 3.25rem)",
      lineHeight: "1.08",
      weight: 400,
    },
    headingMd: {
      size: "1.5rem",
      lineHeight: "1.33",
      weight: 500,
    },
    headingSm: {
      size: "1.125rem",
      lineHeight: "1.45",
      weight: 500,
    },
    bodyLg: {
      size: "1rem",
      lineHeight: "1.7",
      weight: 400,
    },
    bodySm: {
      size: "0.875rem",
      lineHeight: "1.5",
      weight: 400,
    },
    label: {
      size: "0.875rem",
      lineHeight: "1.4",
      weight: 600,
    },
    overline: {
      size: "0.75rem",
      lineHeight: "1.2",
      weight: 600,
    },
  },
});
