/* ====== TAB SWITCHING ====== */
function showTab(tabId, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  if (btn) btn.classList.add('active');

  // Trigger bar fill animation when skills tab is shown
  if (tabId === 'skills') {
    setTimeout(() => {
      document.querySelectorAll('.lang-bar-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
      });
    }, 50);
  }
}

/* ====== TIMELINE ACCORDION ====== */
function toggleCard(card) {
  const isOpen = card.classList.contains('open');
  // Close all
  document.querySelectorAll('.tl-card').forEach(c => c.classList.remove('open'));
  // Open clicked (if it wasn't already open)
  if (!isOpen) card.classList.add('open');
}

/* ====== TYPING EFFECT ====== */
const phrases = [
  'Desenvolvedor de Software',
  'Entusiasta de Dados',
  'Estudante de Computação',
  'Resolvedor de Problemas',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}

typeLoop();

/* ====== SCROLL REVEAL ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.animationPlayState = 'running';
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tl-item, .lang-card, .comp-card, .tool-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

/* ====== OPEN FIRST TIMELINE CARD BY DEFAULT ====== */
document.addEventListener('DOMContentLoaded', () => {
  const firstCard = document.querySelector('.tl-card');
  if (firstCard) firstCard.classList.add('open');
});
