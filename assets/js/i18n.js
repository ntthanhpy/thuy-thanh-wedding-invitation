'use strict';
// Ngôn ngữ từ URL (?lang=en hoặc ?lang=vi), sau đó là lựa chọn đã lưu.
let currentLanguage = 'vi';
try {
  const requested = new URLSearchParams(location.search).get('lang');
  const stored = localStorage.getItem('wedding-language');
  currentLanguage = ['vi', 'en'].includes(requested) ? requested : (stored === 'en' ? 'en' : 'vi');
} catch (_) { /* Mặc định tiếng Việt khi lưu trữ không khả dụng. */ }
const tr = (vi, en) => currentLanguage === 'en' ? en : vi;

function applyLanguage(language, save) {
  currentLanguage = language === 'en' ? 'en' : 'vi';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-en], [data-en-html], [data-en-aria], [data-en-placeholder], [data-en-alt]').forEach(el => {
    const specs = [
      ['en', 'viText', 'textContent'], ['enHtml', 'viHtml', 'innerHTML'],
      ['enAria', 'viAria', 'aria-label'], ['enPlaceholder', 'viPlaceholder', 'placeholder'], ['enAlt', 'viAlt', 'alt']
    ];
    specs.forEach(([enKey, viKey, property]) => {
      if (!(enKey in el.dataset)) return;
      const isProperty = property === 'textContent' || property === 'innerHTML';
      if (!(viKey in el.dataset)) el.dataset[viKey] = isProperty ? el[property] : el.getAttribute(property);
      const value = currentLanguage === 'en' ? el.dataset[enKey] : el.dataset[viKey];
      if (isProperty) el[property] = value; else el.setAttribute(property, value);
    });
  });
  // Ảnh được tạo bằng JavaScript; chỉ thay nhãn hỗ trợ truy cập, giữ nguyên ảnh.
  const photoLabels = { 'Ảnh bìa': 'Cover photo', 'Chú rể': 'Groom', 'Cô dâu': 'Bride', 'Ảnh cảm ơn': 'Thank-you photo' };
  document.querySelectorAll('[data-p] > img').forEach(image => {
    const vi = image.parentElement.dataset.l || 'Ảnh cưới';
    image.alt = currentLanguage === 'en' ? (photoLabels[vi] || vi.replace('Ảnh', 'Photo')) : vi;
  });
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage)));
  const auto = document.querySelector('#autoScrollBtn');
  if (auto) auto.textContent = auto.getAttribute('aria-pressed') === 'true' ? tr('Ⅱ Dừng tự cuộn', 'Ⅱ Pause auto-scroll') : tr('▶ Tự cuộn', '▶ Auto-scroll');
  if (typeof tick === 'function') tick();
  if (save) {
    try { localStorage.setItem('wedding-language', currentLanguage); } catch (_) {}
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', currentLanguage);
      history.replaceState(null, '', url);
    } catch (_) {}
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language, true)));
  applyLanguage(currentLanguage, false);
});
