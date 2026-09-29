
interface OrbitAPI {
  cameraOrbit: string;
  getCameraOrbit(): { theta: number; phi: number; radius: number };
}

export interface BottleSwayOptions {
  
  amplitude?: number;
  
  swaySpeed?: number;
  
  defaultPhi?: number;
  
  radius?: string;
  
  scrollKick?: boolean;
  
  kickRange?: number;
}

export function initBottleSway(viewer: HTMLElement, options: BottleSwayOptions = {}) {
  const api = viewer as HTMLElement & OrbitAPI;
  const {
    amplitude = 24,
    swaySpeed = 0.00035,
    defaultPhi = 76,
    radius = '105%',
    scrollKick = false,
    kickRange = 16,
  } = options;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAD_TO_DEG = 180 / Math.PI;

  if (prefersReducedMotion) {
    api.cameraOrbit = `10deg ${defaultPhi}deg ${radius}`;
    return;
  }

  let kick = 0;
  let kickVelocity = 0;
  let phi = defaultPhi;
  let isInteracting = false;
  let lastY = window.scrollY;
  let lastRender = 0;
  const RENDER_INTERVAL = 32;

  if (scrollKick) {
    window.addEventListener(
      'scroll',
      () => {
        if (isInteracting) return;
        const y = window.scrollY;
        kickVelocity += (y - lastY) * 0.06;
        lastY = y;
      },
      { passive: true }
    );
  }

  let resumeTimer: ReturnType<typeof setTimeout> | null = null;

  const resumeFromUserOrbit = () => {
    resumeTimer = null;
    const orbit = api.getCameraOrbit();
    const theta = orbit.theta * RAD_TO_DEG;
    phi = orbit.phi * RAD_TO_DEG;
    const idleNow = Math.sin(performance.now() * swaySpeed) * amplitude;
    const rawKick = theta - idleNow;
    kick = Math.max(-kickRange * 2.2, Math.min(kickRange * 2.2, rawKick));
    kickVelocity = 0;
    isInteracting = false;
  };

  const onInteractionStart = () => {
    isInteracting = true;
    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  };

  const onInteractionEnd = () => {
    if (!isInteracting) return;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(resumeFromUserOrbit, 180);
  };

  viewer.addEventListener('pointerdown', onInteractionStart);
  viewer.addEventListener('pointerup', onInteractionEnd);
  viewer.addEventListener('pointercancel', onInteractionEnd);
  window.addEventListener('pointerup', onInteractionEnd);
  window.addEventListener('pointercancel', onInteractionEnd);

  const tick = (time: number) => {
    if (!isInteracting) {
      kickVelocity *= 0.93;
      kick = Math.max(-kickRange, Math.min(kickRange, kick + kickVelocity));
      kick *= 0.965;
      phi += (defaultPhi - phi) * 0.03;

      if (time - lastRender >= RENDER_INTERVAL) {
        lastRender = time;
        const idle = Math.sin(time * swaySpeed) * amplitude;
        api.cameraOrbit = `${(idle + kick).toFixed(2)}deg ${phi.toFixed(2)}deg ${radius}`;
      }
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
