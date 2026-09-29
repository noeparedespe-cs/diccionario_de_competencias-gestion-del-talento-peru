
function initAccordions() {
  document.querySelectorAll<HTMLElement>('[data-accordion-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling as HTMLElement | null;
      if (!panel) return;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        panel.style.gridTemplateRows = '0fr';
      } else {
        panel.style.gridTemplateRows = '1fr';
      }
    });
  });
}

function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
    const buttons = group.querySelectorAll<HTMLElement>('[data-filter-btn]');
    const scope = group.getAttribute('data-filter-scope');
    if (!scope) return;
    const targets = document.querySelectorAll<HTMLElement>(`[data-filter-target="${scope}"]`);

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-filter-btn');
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        targets.forEach((t) => {
          const cat = t.getAttribute('data-category');
          const show = value === 'todas' || cat === value;
          t.style.display = show ? '' : 'none';
        });

        const container = document.querySelector(`[data-filter-scroll="${scope}"]`);
        if (container) {
          (container as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
}

function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
    const tabs = group.querySelectorAll<HTMLElement>('[data-tab]');
    const panels = group.querySelectorAll<HTMLElement>('[data-tab-panel]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        panels.forEach((p) => {
          const match = p.getAttribute('data-tab-panel') === target;
          p.classList.toggle('hidden', !match);
          p.classList.toggle('grid', match);
        });
      });
    });
  });
}

function initLevelPickers() {
  document.querySelectorAll<HTMLElement>('[data-level-card]').forEach((card) => {
    const buttons = card.querySelectorAll<HTMLElement>('[data-level-btn]');
    const panels = card.querySelectorAll<HTMLElement>('[data-level-panel]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level-btn');
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        panels.forEach((p) => {
          p.classList.toggle('hidden', p.getAttribute('data-level-panel') !== level);
        });
      });
    });
  });
}

function wireActiveLinks(selector: string) {
  const links = document.querySelectorAll<HTMLAnchorElement>(selector);
  if (!links.length) return;

  const pairs: { link: HTMLAnchorElement; section: Element }[] = [];
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const section = href ? document.querySelector(href) : null;
    if (section) pairs.push({ link, section });
  });
  if (!pairs.length) return;

  const setActive = (href: string) => {
    pairs.forEach(({ link }) => {
      link.classList.toggle('is-active', link.getAttribute('href') === href);
    });
  };

  const BAND_TOP = 0.12;
  const BAND_BOTTOM = 0.55;

  const evaluate = () => {
    const vh = window.innerHeight;
    const bandTop = vh * BAND_TOP;
    const bandBottom = vh * BAND_BOTTOM;
    let best: { href: string; top: number } | null = null;

    pairs.forEach(({ link, section }) => {
      const rect = section.getBoundingClientRect();
      const overlaps = rect.bottom > bandTop && rect.top < bandBottom;
      if (overlaps && (!best || rect.top > best.top)) {
        best = { href: link.getAttribute('href') || '', top: rect.top };
      }
    });

    if (best) setActive(best.href);
  };

  const observer = new IntersectionObserver(evaluate, {
    rootMargin: `-${BAND_TOP * 100}% 0px -${(1 - BAND_BOTTOM) * 100}% 0px`,
    threshold: 0,
  });

  pairs.forEach(({ section }) => observer.observe(section));
}

function initActiveNav() {
  wireActiveLinks('[data-nav-link]');
  wireActiveLinks('[data-quickjump-link="crecer"]');
  wireActiveLinks('[data-quickjump-link="radar"]');
}

function initProgressBar() {
  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrolled))})`;
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
}

function initMobileNav() {
  const toggle = document.querySelector<HTMLElement>('[data-mobile-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-mobile-nav-panel]');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  panel.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

export function initInteractions() {
  initAccordions();
  initFilters();
  initTabs();
  initLevelPickers();
  initActiveNav();
  initProgressBar();
  initMobileNav();
}
