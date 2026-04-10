// ── ROUTER ────────────────────────────────────
const PAGES = {
  'home':'p-home','servicos':'p-servicos','equipe':'p-equipe',
  'quem-somos':'p-quem-somos','gestao':'p-gestao','midia':'p-midia',
  'clientes':'p-clientes','onde':'p-onde','contatos':'p-contatos'
};
function goTo(key) {
  if (!PAGES[key]) return;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(PAGES[key]).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(() => { initAnims(); initCarousels(); }, 60);
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) { e.preventDefault(); goTo(el.dataset.page); }
});

// ── CAROUSELS ─────────────────────────────────
function makeCarousel(trackId, dotsId, prevId, nextId, vis, gap) {
  const track = document.getElementById(trackId);
  const dotsEl = document.getElementById(dotsId);
  if (!track || !dotsEl) return;
  const total = track.children.length;
  const max = Math.max(0, total - vis);
  let cur = 0;
  dotsEl.innerHTML = '';
  for (let i = 0; i <= max; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = () => go(i);
    dotsEl.appendChild(d);
  }
  function go(n) {
    cur = Math.max(0, Math.min(n, max));
    const w = track.parentElement.offsetWidth;
    const cw = (w - gap*(vis-1)) / vis;
    track.style.transform = `translateX(-${cur*(cw+gap)}px)`;
    dotsEl.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===cur));
  }
  const pb = document.getElementById(prevId);
  const nb = document.getElementById(nextId);
  if (pb) pb.onclick = () => go(cur-1);
  if (nb) nb.onclick = () => go(cur+1);
  window.addEventListener('resize', () => go(cur));
}
function initCarousels() {
  makeCarousel('svc-track','svc-dots','svc-prev','svc-next',3,16);
  makeCarousel('team-track','team-dots','team-prev','team-next',5,14);
  makeCarousel('photo-track','photo-dots','photo-prev','photo-next',2,8);
}
initCarousels();

// ── ANIMATIONS ────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target)} });
},{threshold:.05,rootMargin:'0px 0px -16px 0px'});
function initAnims() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.page.active .fu').forEach(el => { el.classList.remove('on'); obs.observe(el); });
  });
}
initAnims();