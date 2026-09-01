(() => {
  const selector = document.currentScript.dataset.selector || '.post-image, article .photo, article .entry-photo img, article > img';
  const images = Array.from(document.querySelectorAll(selector));
  if (!images.length) return;

  const style = document.createElement('style');
  style.textContent = '.arg-zoomable{cursor:zoom-in}.arg-lightbox{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;padding:64px 22px 24px;background:rgba(15,16,18,.92);opacity:0;visibility:hidden;transition:.18s}.arg-lightbox.is-open{opacity:1;visibility:visible}.arg-lightbox img{display:block;max-width:96vw;max-height:calc(100vh - 92px);object-fit:contain;box-shadow:0 18px 60px rgba(0,0,0,.55)}.arg-lightbox button{position:absolute;top:16px;right:18px;display:grid;width:42px;height:42px;place-items:center;padding:0;border:1px solid #8a8d92;border-radius:50%;color:#fff;background:#292b30;font-size:1.5rem;cursor:pointer}body.arg-lightbox-open{overflow:hidden}@media(prefers-reduced-motion:reduce){.arg-lightbox{transition:none}}';
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'arg-lightbox';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<button type="button" aria-label="拡大画像を閉じる">×</button><img src="" alt="">';
  document.body.appendChild(overlay);
  const largeImage = overlay.querySelector('img');
  const closeButton = overlay.querySelector('button');

  function open(source) {
    largeImage.src = source.currentSrc || source.src;
    largeImage.alt = source.alt || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('arg-lightbox-open');
    closeButton.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('arg-lightbox-open');
    largeImage.removeAttribute('src');
  }

  images.forEach(image => {
    image.classList.add('arg-zoomable');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || '画像'}を拡大表示`);
    image.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      open(image);
    });
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(image);
      }
    });
  });
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('is-open')) close(); });
})();
