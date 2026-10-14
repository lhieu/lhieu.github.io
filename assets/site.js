(function () {
  'use strict';

  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('primary-menu');
  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu điều hướng');
    document.body.classList.remove('menu-open');
  }
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open && window.innerWidth <= 900);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Đóng menu điều hướng' : 'Mở menu điều hướng');
    });
    nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeMenu(); });
  }

  // Optional project videos: putting the exact MP4 into data/ makes the video appear.
  // If the file is not present, the entire player stays hidden (no broken UI).
  document.querySelectorAll('video[data-optional-video]').forEach(function (video) {
    const container = video.closest('[data-video-container]');
    if (!container) return;
    video.addEventListener('loadedmetadata', function () { container.hidden = false; });
    video.addEventListener('error', function () { container.hidden = true; });
    video.load();
  });

  const data = window.UAV_PROGRESS;
  if (!data) return;
  const labels = {
    complete: 'Đã kiểm chứng',
    progress: 'Đã chạy · cần tối ưu',
    shadow: 'Chế độ shadow',
    baseline: 'Baseline AI · nội bộ',
    simulated: 'Web mô phỏng',
    planned: 'Đặc tả / kế hoạch'
  };

  function displayDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return iso || '';
    const parts = iso.split('-');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }
  function el(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function pill(status) {
    const valid = Object.prototype.hasOwnProperty.call(labels, status) ? status : 'planned';
    return el('span', 'status-pill ' + valid, labels[valid]);
  }

  const ordered = Array.isArray(data.updates)
    ? data.updates.slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); })
    : [];
  const mostRecent = ordered.length ? displayDate(ordered[0].date) : 'Chưa có cập nhật';
  document.querySelectorAll('[data-last-updated]').forEach(function (node) { node.textContent = mostRecent; });

  const homeContainer = document.getElementById('home-stages');
  if (homeContainer && Array.isArray(data.stages)) {
    homeContainer.replaceChildren();
    const homeStages = Array.isArray(data.homeStages) ? data.homeStages : data.stages.slice(0, 4);
    homeStages.forEach(function (entry) {
      const step = el('div', 'track-step');
      step.appendChild(el('div', 'track-number ' + entry.status, entry.number || ''));
      const text = el('div');
      text.append(el('b', '', entry.title || ''), el('small', '', labels[entry.status] + ' · ' + (entry.description || '')));
      step.appendChild(text);
      homeContainer.appendChild(step);
    });
  }

  const stageContainer = document.getElementById('uav-stages');
  if (stageContainer && Array.isArray(data.stages)) {
    stageContainer.replaceChildren();
    data.stages.forEach(function (entry) {
      const article = el('article', 'phase-card ' + (labels[entry.status] ? entry.status : 'planned'));
      const head = el('div', 'phase-head');
      head.append(el('span', 'phase-id', 'HẠNG MỤC ' + (entry.number || '')));
      head.append(pill(entry.status));
      article.append(head, el('h3', '', entry.title || ''), el('p', '', entry.description || ''));
      if (Array.isArray(entry.items) && entry.items.length) {
        const list = el('ul');
        entry.items.forEach(function (item) { list.appendChild(el('li', '', item)); });
        article.appendChild(list);
      }
      stageContainer.appendChild(article);
    });
  }

  const updateContainer = document.getElementById('uav-updates');
  if (updateContainer) {
    updateContainer.replaceChildren();
    if (!ordered.length) updateContainer.appendChild(el('p', 'muted', 'Chưa có nhật ký tiến độ.'));
    ordered.forEach(function (entry) {
      const article = el('article', 'log-item');
      const time = el('time', '', displayDate(entry.date));
      time.dateTime = entry.date || '';
      article.append(time, el('h3', '', entry.title || ''), el('p', '', entry.description || ''), pill(entry.status));
      updateContainer.appendChild(article);
    });
  }

  const mediaGallery = document.getElementById('evidence-gallery');
  const mediaEmpty = document.getElementById('media-empty');
  if (mediaGallery && Array.isArray(data.media)) {
    mediaGallery.replaceChildren();
    data.media.forEach(function (entry) {
      if (!entry || !entry.src || !entry.type) return;
      const item = el('article', 'media-item');
      // Optional file slots only show after a successful media load.
      // Local file:// opening works too: no fetch() or server required.
      const optional = entry.optional === true;
      if (optional) item.hidden = true;
      function reveal() {
        item.hidden = false;
        if (mediaEmpty) {
          mediaEmpty.hidden = true;
          const evidenceBox = mediaEmpty.closest('.evidence-box');
          if (evidenceBox) evidenceBox.classList.add('has-media');
        }
      }
      function hideMissing() { item.remove(); }
      if (entry.type === 'image') {
        const img = el('img');
        img.src = entry.src;
        img.alt = entry.title || 'Tư liệu UAV';
        img.loading = optional ? 'eager' : 'lazy';
        if (optional) {
          img.addEventListener('load', reveal);
          img.addEventListener('error', hideMissing);
        }
        item.appendChild(img);
      } else if (entry.type === 'video') {
        const vid = el('video');
        vid.controls = true;
        vid.preload = 'metadata';
        vid.src = entry.src;
        vid.setAttribute('aria-label', entry.title || 'Video UAV');
        vid.playsInline = true;
        if (optional) {
          vid.addEventListener('loadedmetadata', reveal);
          vid.addEventListener('error', hideMissing);
        }
        item.appendChild(vid);
      } else if (entry.type === 'link') {
        const a = el('a', 'btn btn-light', '▶ Xem tư liệu gốc ↗');
        a.href = entry.src;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.margin = '20px';
        item.appendChild(a);
      } else {
        return;
      }
      const desc = el('div', 'media-desc');
      desc.append(el('b', '', entry.title || 'Tư liệu dự án'), el('small', '', entry.note || ''));
      item.append(desc);
      mediaGallery.appendChild(item);
      if (optional && entry.type === 'video') {
        item.querySelector('video').load();
      }
    });
    if (Array.from(mediaGallery.children).some(function (child) { return !child.hidden; }) && mediaEmpty) {
      mediaEmpty.hidden = true;
      const evidenceBox = mediaEmpty.closest('.evidence-box');
      if (evidenceBox) evidenceBox.classList.add('has-media');
    }
  }
})();
