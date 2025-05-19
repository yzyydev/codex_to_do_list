/** Utility to conditionally join class names */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}