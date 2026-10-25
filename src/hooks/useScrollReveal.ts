import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(
        '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)'
      );
      targets.forEach(el => observer.observe(el));
    };

    observeAll();
    const interval = setInterval(observeAll, 800);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
}
