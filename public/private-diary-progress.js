(() => {
  const file = location.pathname.split('/').pop();
  const mailPromptKey = 'hanazono-mail-private-prompt-v1';

  document.body.style.display = 'flex';
  document.body.style.minHeight = '100vh';
  document.body.style.flexDirection = 'column';
  const main = document.querySelector('.wrap');
  if (main) main.style.flex = '1 0 auto';

  if (file !== 'hana-private-move.html') return;
  localStorage.setItem(mailPromptKey, '1');
  if ((Number(localStorage.getItem('hanazono-mail-report-progress-v3')) || 0) >= 1) return;

  const style = document.createElement('style');
  style.textContent = '.mail-notification{position:fixed;right:22px;top:22px;z-index:2500;width:min(360px,calc(100% - 32px));display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;padding:14px 16px;border:1px solid #789096;color:#414b4e;background:#fbfdfc;box-shadow:0 12px 34px rgba(43,58,62,.24);text-decoration:none;font-family:"Yu Gothic","YuGothic",sans-serif;opacity:0;transform:translateY(-10px);transition:.22s}.mail-notification.is-visible{opacity:1;transform:translateY(0)}.notification-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;color:#fff;background:#6f858a;font-size:1.1rem}.notification-copy strong{display:block;color:#526c73;font-size:.82rem}.notification-copy span{display:block;margin-top:2px;font-size:.72rem;line-height:1.55}@media(prefers-reduced-motion:reduce){.mail-notification{transition:none}}';
  document.head.appendChild(style);

  const notice = document.createElement('a');
  notice.className = 'mail-notification';
  notice.href = 'mail.html';
  notice.innerHTML = '<span class="notification-icon" aria-hidden="true">✉</span><span class="notification-copy"><strong>新着メールがあります</strong><span>捜索ページ管理者からメッセージが届きました。クリックして確認する</span></span>';
  document.body.appendChild(notice);

  let displayTimer = 0;
  function showNotice() {
    if (document.visibilityState !== 'visible' || notice.classList.contains('is-visible')) return;
    notice.classList.add('is-visible');
    document.removeEventListener('visibilitychange', showNotice);
  }
  displayTimer = window.setTimeout(showNotice, 1200);
  document.addEventListener('visibilitychange', showNotice);
  window.addEventListener('pagehide', () => window.clearTimeout(displayTimer), { once: true });
})();
