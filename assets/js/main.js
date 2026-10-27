'use strict';
document.documentElement.classList.add('js');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ================= CẤU HÌNH ================= */
const IMG = 'assets/images/';
// Tên file trong assets/images/gallery (chỉ cần số sau "TDT_"). Sắp xếp lại để đổi thứ tự ảnh.
const GALLERY = [
  '0016', '0060', '0062', '0156', '0185', '0205', '0257', '0258', '0289', '0304', '0309', '0326',
  '8989', '9017', '9025', '9135', '9174', '9257', '9279', '9300', '9311', '9324', '9397', '9402',
  '9477', '9505', '9608', '9632', '9636', '9644', '9661', '9686', '9696', '9741', '9987'
].map(n => `${IMG}gallery/TDT_${n}.jpg`);

// Ảnh ở từng vị trí cố định trên trang (đổi GALLERY[i] thành ảnh bạn muốn)
const PHOTOS = {
  cover: IMG + 'cover.jpg', groom: IMG + 'groom.jpg', bride: IMG + 'bride.jpg',
  m1: GALLERY[0], m2: GALLERY[1],
  g1: GALLERY[2], g2: GALLERY[3], g3: GALLERY[4], g4: GALLERY[5], g5: GALLERY[6],
  ty: GALLERY[GALLERY.length - 1]
};

const TRACKS = ['assets/audio/wedding.mp3', 'assets/audio/wedding2.mp3']; // phát lần lượt, lặp lại

// Dán URL Google Apps Script (Web app) vào đây để nhận lời chúc & xác nhận vào Google Sheet. Để trống = chỉ hiển thị trên máy khách.
const RSVP_URL = 'https://script.google.com/macros/s/AKfycbzyfr8jXEjSLu7yWaCN1G6m_8Fh-SK2OXnyfNATDo7gPMhrEaMwaALkIEJh0C11bJZhqw/exec';

// m: link Google Maps ghim vị trí (nên điền, vì địa chỉ nông thôn thường tìm không chính xác). Để trống = tìm theo địa chỉ.
const EVENTS = [
  { t: 'Lễ vu quy', at: '2026-11-24T09:00:00+07:00', s: 'Được tổ chức vào lúc 09:00, Thứ Ba', d: '24', l: '16 tháng 10 năm Bính Ngọ',
    p: 'Tại tư gia nhà gái', a: 'Ấp Trung Điền, Xã Long Điền Đông, Cà Mau', m: '' },
  { t: 'Lễ tân hôn', at: '2026-11-28T09:00:00+07:00', s: 'Được tổ chức vào lúc 09:00, Thứ Bảy', d: '28', l: '20 tháng 10 năm Bính Ngọ',
    p: 'Tại tư gia nhà trai', a: 'Thôn Phú Tân 2, Xã Ô Loan, Đắk Lắk', m: '' }
];
/* ============================================ */

// Ảnh cố định
$$('[data-p]').forEach(e => {
  const u = PHOTOS[e.dataset.p];
  if (u) { e.style.backgroundImage = `url("${u}")`; e.classList.add('has'); }
});

// Lễ
const ring = '<svg class="ring" viewBox="0 0 44 30" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="16" cy="18" r="9"/><circle cx="28" cy="18" r="9"/><path d="M13 5l3-3 3 3-3 4z"/></svg>';
$('#events').innerHTML = EVENTS.map(e => {
  const map = e.m || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.a);
  return `<div class="ev rv">${ring}<h2>${e.t}</h2><div class="s">${e.s}</div>
<div class="dr"><span>THÁNG 11</span><b>${e.d}</b><span>NĂM 2026</span></div><div class="lun">(Tức ngày ${e.l})</div>
<h3>${e.p}</h3><div class="ad">${e.a}</div>
<a class="btn sm" target="_blank" rel="noopener" href="${map}">Xem chỉ đường</a></div>`;
}).join('');

// Album: các ảnh chưa dùng ở vị trí cố định
const used = new Set(Object.values(PHOTOS));
const ALBUM = GALLERY.filter(u => !used.has(u));
$('#album').innerHTML = ALBUM.map((u, i) =>
  `<img src="${u}" alt="Ảnh cưới Tấn Thành và Diễm Thùy" loading="lazy" decoding="async" data-i="${i}">`).join('');

// Xem ảnh lớn
const lb = $('#lb'), lbImg = $('#lb img');
let cur = 0;
const show = i => { cur = (i + ALBUM.length) % ALBUM.length; lbImg.src = ALBUM[cur]; };
const openLb = i => { show(i); lb.hidden = false; document.body.classList.add('lock'); };
const closeLb = () => { lb.hidden = true; lbImg.removeAttribute('src'); document.body.classList.remove('lock'); };
$('#album').addEventListener('click', e => { const im = e.target.closest('img'); if (im) openLb(+im.dataset.i); });
$('#lb .x').onclick = closeLb;
$('#lb .pv').onclick = () => show(cur - 1);
$('#lb .nx').onclick = () => show(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') show(cur - 1);
  else if (e.key === 'ArrowRight') show(cur + 1);
});
let sx = 0;
lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
}, { passive: true });

// Nhạc nền: phát lần lượt các bài, bắt đầu khi khách chạm mở thiệp
const bgm = new Audio(TRACKS[0]);
bgm.preload = 'metadata';
let ti = 0;
const mb = $('#musicBtn');
const setM = on => { mb.textContent = on ? '🔊' : '🔇'; mb.classList.toggle('on', on); };
bgm.addEventListener('error', () => console.error('Không tải được nhạc:', bgm.src));
const playM = () => bgm.play().then(() => setM(true)).catch(err => { console.error('Audio error:', err); setM(false); });
bgm.addEventListener('ended', () => { ti = (ti + 1) % TRACKS.length; bgm.src = TRACKS[ti]; playM(); });
mb.onclick = () => (bgm.paused ? playM() : (bgm.pause(), setM(false)));

// Màn mở thiệp
const curtain = $('#curtain');
curtain.addEventListener('click', () => {
  curtain.classList.add('open');
  document.body.classList.remove('lock');
  playM();
  setTimeout(() => curtain.remove(), 1400);
});

// Tên khách: ...#anh-tuan hoặc ...?khach=Anh+Tuan
try {
  const raw = new URLSearchParams(location.search).get('khach') || decodeURIComponent(location.hash.slice(1));
  const name = raw.replace(/[-_.~]+/g, ' ').trim();
  if (name) {
    $('#guest').textContent = name.replace(/(^|\s)\p{L}/gu, m => m.toUpperCase());
    $('#gw').hidden = false;
  }
} catch (e) { /* bỏ qua */ }

// Đếm ngược đến lễ kế tiếp
const times = EVENTS.map(e => new Date(e.at).getTime());
const nums = $$('#cd b');
function tick() {
  const now = Date.now();
  const k = times.findIndex(t => t > now);
  const t = k === -1 ? times[times.length - 1] : times[k];
  $('#cdl').textContent = k === -1 ? '' : 'Đến ' + EVENTS[k].t.toLowerCase();
  const s = Math.max(0, t - now) / 1000 | 0;
  [s / 86400 | 0, s % 86400 / 3600 | 0, s % 3600 / 60 | 0, s % 60].forEach((v, i) => { nums[i].textContent = String(v).padStart(2, '0'); });
}
tick(); setInterval(tick, 1000);

// Hiệu ứng xuất hiện khi cuộn
const io = new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
}), { threshold: .12 });
$$('.rv').forEach(e => io.observe(e));

// Thông báo nhỏ
const toast = m => {
  const t = $('#toast'); t.textContent = m; t.classList.add('on');
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove('on'), 2800);
};

// Gửi lời chúc
$('#send').onclick = function () {
  const n = $('#nm'), w = $('#ws'), a = $('#at');
  if (!n.value.trim()) { n.focus(); toast('Bạn vui lòng nhập tên nhé'); return; }
  const data = { name: n.value.trim(), wish: w.value.trim(), attend: a.value, time: new Date().toISOString() };
  const d = document.createElement('div'), b = document.createElement('b');
  b.textContent = data.name;
  d.append(b, data.wish || data.attend || 'Chúc hai bạn trăm năm hạnh phúc!');
  $('#wl').prepend(d);
  if (RSVP_URL) {
    fetch(RSVP_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
      .catch(() => toast('Chưa gửi được, bạn thử lại sau nhé'));
  }
  n.value = w.value = ''; a.value = '';
  this.disabled = true; setTimeout(() => { this.disabled = false; }, 3000);
  toast('Cảm ơn bạn đã gửi lời chúc ♡');
};

// Hộp mừng cưới
const gift = $('#gift');
$('#gift-open').onclick = () => gift.showModal();
$('#gift-close').onclick = () => gift.close();
gift.addEventListener('click', e => { if (e.target === gift) gift.close(); });
$$('.cp').forEach(b => b.onclick = async () => {
  try { await navigator.clipboard.writeText(b.dataset.c); toast('Đã sao chép số tài khoản'); }
  catch (e) { toast('Hãy nhấn giữ để sao chép: ' + b.dataset.c); }
});
