(() => {
  const readKey = 'hanazono-private-read-v1';
  const readyKey = 'hanazono-private-both-read-v1';
  const mailPromptKey = 'hanazono-mail-private-prompt-v1';
  const notifiedKey = 'hanazono-private-notification-shown-v1';
  const file = location.pathname.split('/').pop();
  const pageNumber = file === 'hana-private-move.html' ? 25 : file === 'hana-private-safety.html' ? 26 : 0;

  document.body.style.display = 'flex';
  document.body.style.minHeight = '100vh';
  document.body.style.flexDirection = 'column';
  const main = document.querySelector('.wrap');
  if (main) main.style.flex = '1 0 auto';

  if (!pageNumber) return;
  let read = [];
  try {
    const saved = JSON.parse(localStorage.getItem(readKey) || '[]');
    if (Array.isArray(saved)) read = saved;
  } catch (error) {
    read = [];
  }
  try {
    const archive = JSON.parse(localStorage.getItem('hanazono-page-archive-v1') || '[]');
    if (Array.isArray(archive)) {
      read = read.filter(number => archive.some(page => page.number === number));
    }
  } catch (error) {
    read = [];
  }
  if (!read.includes(pageNumber)) read.push(pageNumber);
  localStorage.setItem(readKey, JSON.stringify(read));
  if (!read.includes(25) || !read.includes(26)) {
    localStorage.removeItem(readyKey);
    localStorage.removeItem(mailPromptKey);
    localStorage.removeItem(notifiedKey);
    return;
  }

  localStorage.setItem(readyKey, '1');
  localStorage.setItem(mailPromptKey, '1');
  if (localStorage.getItem(notifiedKey) === '1') return;
  localStorage.setItem(notifiedKey, '1');

  const style = document.createElement('style');
  style.textContent = '.mail-arrival{position:fixed;z-index:2500;right:18px;top:18px;width:min(360px,calc(100% - 36px));padding:0;border:1px solid #c7cec9;border-radius:13px;color:#4d4b48;background:#fffdf8;box-shadow:0 16px 42px rgba(42,50,48,.22);text-align:left;cursor:pointer;opacity:0;transform:translateY(-10px);transition:.22s}.mail-arrival.is-visible{opacity:1;transform:translateY(0)}.mail-arrival-head{display:flex;align-items:center;gap:9px;padding:11px 14px;border-bottom:1px solid #e0ddd4;color:#526c73;background:#eef3f1;font-size:.72rem;font-weight:700}.mail-arrival-icon{display:grid;width:27px;height:27px;place-items:center;border-radius:50%;color:#fff;background:#6d7479}.mail-arrival-body{display:block;padding:13px 14px}.mail-arrival-body strong{display:block;margin-bottom:4px;font-size:.83rem}.mail-arrival-body span{display:block;color:#6f6d68;font-size:.75rem;line-height:1.65}';
  document.head.appendChild(style);
  const notice = document.createElement('button');
  notice.type = 'button';
  notice.className = 'mail-arrival';
  notice.innerHTML = '<span class="mail-arrival-head"><span class="mail-arrival-icon">管</span>新着メッセージ</span><span class="mail-arrival-body"><strong>捜索ページ管理者</strong><span>捜索の進捗はどうですか？</span></span>';
  notice.addEventListener('click', () => { location.href = 'mail.html'; });
  document.body.appendChild(notice);
  window.setTimeout(() => notice.classList.add('is-visible'), 1200);
})();
