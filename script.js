
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.mobile-panel');
if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const open = panel.getAttribute('data-open') === 'true';
    panel.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
}
document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('.deal-wheel').forEach((wheel) => {
  const disc = wheel.querySelector('.wheel-disc');
  const button = wheel.querySelector('.spin-btn');
  const result = wheel.querySelector('.deal-result');
  const offers = JSON.parse(wheel.getAttribute('data-offers') || '[]');
  let spinning = false;
  let currentRotation = 0;

  if (!disc || !button || !result || !offers.length) return;

  button.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    const index = Math.floor(Math.random() * offers.length);
    const segment = 360 / offers.length;
    const target = (index * segment) + (segment / 2);
    currentRotation += 2160 + (360 - target);
    disc.style.transform = `rotate(${currentRotation}deg)`;
    result.innerHTML = '<strong>Checking the spin…</strong><br>Pulling one current offer into view.';
    window.setTimeout(() => {
      const picked = offers[index];
      result.innerHTML = `<strong>${picked.title}</strong><br>${picked.detail}`;
      spinning = false;
    }, 3400);
  });
});
