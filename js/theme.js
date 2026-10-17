const themeToggleBtn = document.getElementById('theme-toggle');
const themeLayer = document.getElementById('theme-layer');
const transitionDuration = 700;
const lightBackground = 'linear-gradient(to right, #385244 0%, #385244 23%, #ede8dd 23%, #ede8dd 100%)';
const darkBackground = 'linear-gradient(to right, #adbae3 0%, #adbae3 23%, #1c1e4d 23%, #1c1e4d 100%)';
let isTransitioning = false;

themeToggleBtn.addEventListener('click', () => {
    if (isTransitioning) {
        return;
    }

    const isDark = document.body.classList.contains('dark-mode');
    const targetBackground = isDark ? lightBackground : darkBackground;

    if (
        !CSS.supports('clip-path', 'circle(0px at 100% 0%)') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        document.body.classList.toggle('dark-mode', !isDark);
        document.body.classList.toggle('dark-background', !isDark);
        themeLayer.hidden = true;
        return;
    }

    isTransitioning = true;
    themeToggleBtn.disabled = true;
    themeLayer.style.background = targetBackground;
    themeLayer.style.setProperty(
        '--theme-reveal-radius',
        `${Math.hypot(window.innerWidth, window.innerHeight)}px`
    );

    requestAnimationFrame(() => {
        document.body.classList.toggle('dark-mode', !isDark);
        themeLayer.classList.add('is-revealing');
    });

    let fallbackTimer;
    const finishTransition = () => {
        clearTimeout(fallbackTimer);
        themeLayer.removeEventListener('transitionend', onTransitionEnd);
        themeLayer.classList.remove('is-revealing');
        document.body.classList.toggle('dark-background', !isDark);
        isTransitioning = false;
        themeToggleBtn.disabled = false;
    };
    const onTransitionEnd = (event) => {
        if (event.target === themeLayer && event.propertyName === 'clip-path') {
            finishTransition();
        }
    };

    themeLayer.addEventListener('transitionend', onTransitionEnd);
    fallbackTimer = window.setTimeout(finishTransition, transitionDuration + 100);
});
