export function launchConfetti() {
  const duration = 3000;
  const colors = ['#14b8a6', '#0ea5e9', '#f59e0b', '#ec4899', '#8b5cf6'];

  const confettiCount = 50;
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 0.5;
    const size = Math.random() * 10 + 5;

    confetti.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: -10px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      opacity: 1;
      animation: confetti-fall ${2 + Math.random()}s linear ${animationDelay}s forwards;
    `;

    container.appendChild(confetti);
  }

  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(${Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    container.remove();
  }, duration);
}
