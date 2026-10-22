(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)');
  const root = document.documentElement;
  root.classList.add('motion-enabled');
  addEventListener('keydown', () => root.classList.add('keyboard-input'));
  addEventListener('pointerdown', () => root.classList.remove('keyboard-input'), { passive: true });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.remove('is-pending');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => {
    if (!reduce.matches && el.getBoundingClientRect().top > innerHeight * .92) el.classList.add('is-pending');
    observer.observe(el);
  });

  const hero = document.querySelector('.hero');
  const prints = [...document.querySelectorAll('.hero-print')];
  const scene = document.querySelector('.storyboard-section');
  const sheet = document.querySelector('.contact-sheet');
  const frames = [...document.querySelectorAll('.select-print')];
  let ticking = false;
  function renderScroll() {
    ticking = false;
    if (reduce.matches) return;
    const heroBox = hero.getBoundingClientRect();
    if (heroBox.bottom > 0 && heroBox.top < innerHeight) {
      const travel = Math.max(0, -heroBox.top);
      prints.forEach(el => el.style.translate = `0 ${Math.min(44, travel * Number(el.dataset.depth) * .12)}px`);
    }
    if (!mobile.matches) {
      const bounds = scene.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < innerHeight) {
        const progress = Math.max(0, Math.min(1, (innerHeight * .12 - bounds.top) / (innerHeight * .6)));
        const eased = 1 - (1 - progress) ** 3;
        const center = sheet.getBoundingClientRect();
        frames.forEach((el, i) => {
          const targetX = (1.5 - i % 4) * (center.width / 4) * .7;
          const targetY = (i < 4 ? 1 : -1) * 70;
          el.style.transform = `translate(${targetX * (1 - eased)}px, ${targetY * (1 - eased)}px) rotate(${(i % 2 ? 1 : -1) * 9 * (1 - eased)}deg)`;
        });
      }
    }
  }
  function requestRender() { if (!ticking) { ticking = true; requestAnimationFrame(renderScroll); } }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  function resetMotion() { prints.forEach(el => el.style.translate = ''); frames.forEach(el => el.style.transform = ''); requestRender(); }
  reduce.addEventListener('change', resetMotion);
  mobile.addEventListener('change', resetMotion);
  requestRender();

  const logoCanvas = document.querySelector('.logo-canvas');
  const logoToggle = document.querySelector('#logo-toggle');
  const logoCollection = document.querySelector('#logo-collection');
  new IntersectionObserver(entries => {
    logoCanvas.classList.toggle('is-in-view', entries[0].isIntersecting);
  }).observe(logoCanvas);
  let logosOpen = false;
  function setLogos(open) {
    logosOpen = open;
    logoCanvas.classList.toggle('is-open', open);
    logoToggle.setAttribute('aria-expanded', String(open));
    logoToggle.setAttribute('aria-label', open ? 'Kumpulkan kembali lima logo' : 'Sebarkan lima logo');
    logoCollection.setAttribute('aria-hidden', String(!open));
    logoCollection.inert = !open;
  }
  logoToggle.hidden = false;
  setLogos(false);
  logoToggle.addEventListener('click', () => setLogos(!logosOpen));

  const dialog = document.querySelector('#work-viewer');
  const viewerImage = document.querySelector('#viewer-image');
  let returnFocus;
  document.querySelectorAll('[data-view]').forEach(link => link.addEventListener('click', event => {
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    viewerImage.src = link.getAttribute('href');
    viewerImage.alt = link.dataset.view;
    document.querySelector('#viewer-title').textContent = link.dataset.view;
    document.querySelector('#viewer-original').href = link.getAttribute('href');
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.querySelector('#viewer-close').focus({ preventScroll: true });
  }));
  document.querySelector('#viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; returnFocus?.focus({ preventScroll: true }); });

  const checkboxes = [...document.querySelectorAll('input[name="pilihan"]')];
  const initial = ['andong', 'triwindu-masks', 'bandongan', 'jepara'];
  const chosen = new Set();
  const valid = new Set(checkboxes.map(el => el.value));
  try {
    const stored = JSON.parse(localStorage.getItem('habib-storyboard') || '[]');
    if (Array.isArray(stored)) stored.filter(key => valid.has(key)).slice(0, 4).forEach(key => chosen.add(key));
  } catch { /* Storage can be unavailable in a private browsing context. */ }
  function updateSelection() {
    checkboxes.forEach(el => { el.checked = chosen.has(el.value); });
    const keys = chosen.size ? [...chosen] : initial;
    const strip = document.querySelector('#selected-strip');
    strip.replaceChildren(...keys.map(key => {
      const original = document.querySelector(`[data-photo="${key}"] img`);
      const copy = original.cloneNode();
      copy.removeAttribute('loading');
      return copy;
    }));
    document.querySelector('#saved-title').textContent = chosen.size ? 'Storyboard pilihanmu.' : 'Beberapa foto untuk dibawa pulang.';
    document.querySelector('#selection-status').textContent = `${chosen.size} dari 4 foto dipilih.`;
    try { localStorage.setItem('habib-storyboard', JSON.stringify([...chosen])); } catch { /* Selection still works without persistence. */ }
  }
  checkboxes.forEach(el => el.addEventListener('change', () => {
    if (el.checked && chosen.size === 4) {
      el.checked = false;
      document.querySelector('#selection-status').textContent = 'Maksimal 4 foto dapat dipilih.';
      return;
    }
    el.checked ? chosen.add(el.value) : chosen.delete(el.value);
    updateSelection();
  }));
  updateSelection();

  const download = document.querySelector('#download-board');
  download.addEventListener('click', async () => {
    const status = document.querySelector('#download-status');
    download.disabled = true;
    status.textContent = 'Menyiapkan storyboard…';
    try {
      const images = [...document.querySelectorAll('#selected-strip img')].map(cover => {
        const original = new Image();
        original.src = cover.dataset.original || cover.src;
        return original;
      });
      await Promise.all(images.map(img => img.decode()));
      const canvas = document.createElement('canvas');
      canvas.width = 1600; canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f2e3dd'; ctx.fillRect(0, 0, 1600, 1000);
      ctx.fillStyle = '#254b3b'; ctx.font = '600 68px "Bricolage Grotesque", sans-serif';
      ctx.fillText('Satu foto, cerita lain.', 72, 125);
      ctx.font = '28px "Bricolage Grotesque", sans-serif'; ctx.fillText('Fotografi oleh Habib Maulana', 72, 180);
      const gap = 24, width = (1456 - gap * (images.length - 1)) / images.length;
      images.forEach((img, i) => {
        const targetRatio = width / 590;
        const sourceRatio = img.naturalWidth / img.naturalHeight;
        let sw = img.naturalWidth, sh = img.naturalHeight;
        if (sourceRatio > targetRatio) sw = sh * targetRatio; else sh = sw / targetRatio;
        ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 72 + i * (width + gap), 240, width, 590);
      });
      ctx.font = '24px "Bricolage Grotesque", sans-serif'; ctx.fillText('habib maulana.     @beekoesnoo', 72, 922);
      const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Gambar tidak bisa dibuat')), 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'storyboard-habib-maulana.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      status.textContent = 'Storyboard siap.';
    } catch {
      status.textContent = 'Storyboard belum bisa disimpan.';
    } finally { download.disabled = false; }
  });
})();
