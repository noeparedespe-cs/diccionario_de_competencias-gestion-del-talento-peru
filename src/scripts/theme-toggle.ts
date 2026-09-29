
export function initThemeToggle(sectionId: string) {
  const section = document.getElementById(sectionId);
  const btn = section?.querySelector<HTMLElement>('[data-theme-toggle]');
  if (!section || !btn) return;

  const sun = btn.querySelector<HTMLElement>('[data-icon-light]');
  const moon = btn.querySelector<HTMLElement>('[data-icon-dark]');

  const apply = (theme: string) => {
    section.setAttribute('data-theme', theme);
    if (sun && moon) {
      sun.style.display = theme === 'dark' ? 'block' : 'none';
      moon.style.display = theme === 'dark' ? 'none' : 'block';
    }
  };

  btn.addEventListener('click', () => {
    const current = section.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  });
}
