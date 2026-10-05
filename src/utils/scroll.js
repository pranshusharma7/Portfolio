/**
 * Ultra-smooth, hardware-accelerated scroll helper.
 * Automatically synchronizes with Lenis if active, or falls back to native smooth scrolling.
 * Prevents competing scroll animations that cause lag/stutter.
 */
export function smoothScrollTo(target, offset = -70) {
  if (typeof window === 'undefined') return;

  const targetId = typeof target === 'string' ? target.replace('#', '') : null;
  const element = targetId ? document.getElementById(targetId) : target;

  if (window.__lenis) {
    if (element) {
      window.__lenis.scrollTo(element, {
        offset,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (target === 0 || target === 'top') {
      window.__lenis.scrollTo(0, {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    return;
  }

  // Native fallback
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  } else if (target === 0 || target === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
