(function () {
  'use strict';
  const D = window.MachViec;
  if (!D) return;
  const root = document.body.hasAttribute('data-root') ? document.body.dataset.root : '../';
  const page = document.body.dataset.page || '';
  const icon = {
    overview: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    jobs: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 5a3.5 3.5 0 0 1 0 6m2 3.4c2.2.7 3.5 2.6 3.5 5.6"/>',
    report: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1m0-14.2L17 7M7 17l-2.1 2.1"/>'
  };
  const t = (vi, en) => D.getPrefs().language === 'en' ? en : vi;
  function renderShell() {
    const host = document.getElementById('sidebar-root');
    if (host) {
      host.innerHTML = '<aside class="side"><a class="brand" href="' + root + 'recruitment-dashboard.html"><span class="brand-mark">M</span>Mạch Việc</a>' +
        '<div class="nav-caption">' + t('Không gian nhà tuyển dụng', 'Recruiter workspace') + '</div><nav class="nav" aria-label="' + t('Điều hướng chính', 'Main navigation') + '">' +
        navLink('overview', root + 'recruitment-dashboard.html', t('Tổng quan', 'Overview')) +
        navLink('jobs', root + 'employer/jobs.html', t('Tin tuyển dụng', 'Job posts')) +
        navLink('people', root + 'employer/candidates.html', t('Tìm hồ sơ CV', 'Find candidates')) +
        navLink('report', root + 'reports/index.html', t('Báo cáo', 'Reports')) +
        navLink('settings', root + 'settings/index.html', t('Cài đặt', 'Settings')) + '</nav>' +
        '<a class="role-switch" href="' + root + 'ViệcNhà - Tìm việc và ứng tuyển.html"><strong>' + t('Đang ở vai trò nhà tuyển dụng', 'Recruiter view') + '</strong><span>' + t('Chuyển sang khu vực ứng viên →', 'Switch to candidate view →') + '</span></a>' +
        '<div class="me"><div class="avatar">L</div><div><b>Linh Nguyễn</b><span>' + t('Quản trị viên tuyển dụng', 'Recruiting administrator') + '</span></div></div></aside>';
      const active = host.querySelector('[data-nav="' + page + '"]');
      if (active) active.setAttribute('aria-current', 'page');
    }
    const existing = document.getElementById('sidebar-root') ? null : document.querySelector('.side');
    if (existing) {
      const links = existing.querySelectorAll('.nav a');
      const urls = [root + 'recruitment-dashboard.html', root + 'employer/jobs.html', root + 'employer/candidates.html', root + 'recruitment-dashboard.html#lich', root + 'reports/index.html', root + 'settings/index.html'];
      const labels = D.getPrefs().language === 'en' ? ['Overview', 'Job posts', 'Candidates', 'Interviews', 'Reports', 'Settings'] : ['Tổng quan', 'Việc làm', 'Ứng viên', 'Lịch phỏng vấn', 'Báo cáo', 'Cài đặt'];
      links.forEach((link, i) => { if (urls[i]) link.href = urls[i]; if (labels[i]) { const svg = link.querySelector('svg'); link.textContent = labels[i]; if (svg) link.prepend(svg); } });
      if (!existing.querySelector('.role-switch')) {
        const role = document.createElement('a'); role.className = 'role-switch'; role.href = root + 'ViệcNhà - Tìm việc và ứng tuyển.html';
        role.innerHTML = '<strong>' + t('Đang ở vai trò nhà tuyển dụng', 'Recruiter view') + '</strong><span>' + t('Chuyển sang khu vực ứng viên →', 'Switch to candidate view →') + '</span>';
        existing.insertBefore(role, existing.querySelector('.me'));
      }
    }
    translate();
    translateLegacyDashboard();
  }
  function translateLegacyDashboard() {
    if (document.getElementById('sidebar-root')) return;
    const en = D.getPrefs().language === 'en';
    const h1 = document.querySelector('.top h1');
    if (h1) h1.textContent = en ? 'Good morning, Linh' : 'Chào buổi sáng, Linh';
    const intro = document.querySelector('.top p');
    if (intro) intro.textContent = en ? 'Friday, November 6, 2026. You have 4 interviews today and 3 offers expiring in the next 48 hours.' : 'Thứ Sáu, 6 tháng 11, 2026. Hôm nay bạn có 4 lịch hẹn và 3 offer sắp hết hạn trong 48 giờ tới.';
    const range = document.querySelector('.tools .select'); if (range) range.textContent = en ? 'Last 30 days' : '30 ngày gần nhất';
    const action = document.querySelector('.tools .btn'); if (action) { action.textContent = en ? 'Post a job' : 'Đăng tin tuyển dụng'; action.href = root + 'employer/post-job.html'; action.style.textDecoration = 'none'; }
    const titles = en ? ['658 applications, 14 hires', 'Applications received per day', 'Where candidates come from', 'Interview schedule · November 2–7', 'Open positions', 'Time to hire by department'] : ['658 hồ sơ vào, 14 người nhận việc', 'Hồ sơ nhận được mỗi ngày', 'Ứng viên đến từ đâu', 'Lịch phỏng vấn tuần 2 đến 7 tháng 11', 'Vị trí đang tuyển', 'Thời gian tuyển theo phòng ban'];
    document.querySelectorAll('main h2').forEach((el, i) => { if (titles[i]) el.textContent = titles[i]; });
    const kpis = en ? ['New applications in 7 days', 'Interviews this week', 'Offers awaiting response', 'Average time to hire', 'Offer acceptance rate'] : ['Hồ sơ mới trong 7 ngày', 'Lịch phỏng vấn tuần này', 'Offer đang chờ phản hồi', 'Thời gian tuyển trung bình', 'Tỷ lệ nhận offer'];
    document.querySelectorAll('.kpi dt').forEach((el, i) => { if (kpis[i]) el.textContent = kpis[i]; });
  }
  function navLink(key, href, label) { return '<a href="' + href + '" data-nav="' + key + '"' + (page === key ? ' aria-current="page"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' + icon[key] + '</svg>' + label + '</a>'; }
  function translate() {
    const prefs = D.getPrefs();
    document.documentElement.lang = prefs.language === 'en' ? 'en' : 'vi';
    document.querySelectorAll('[data-vi][data-en]').forEach(el => { el.textContent = el.dataset[prefs.language === 'en' ? 'en' : 'vi']; });
    document.querySelectorAll('[data-placeholder-vi][data-placeholder-en]').forEach(el => { el.placeholder = el.dataset[prefs.language === 'en' ? 'placeholderEn' : 'placeholderVi']; });
  }
  function applyTheme() {
    const theme = D.getPrefs().theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    const body = document.body;
    body.dataset.theme = theme;
    if (!document.getElementById('sidebar-root') && document.querySelector('.app')) {
      const dark = { paper: '#101722', surface: '#182231', ink: '#e8eef7', muted: '#9baac0', line: '#2b394b', soft: '#243247', cobalt: '#8296ff', teal: '#4cc9b5', amber: '#ffd06c', rose: '#ff858d' };
      const values = theme === 'dark' ? dark : { paper: '#F3F5F8', surface: '#FFFFFF', ink: '#0F1B2D', muted: '#5B6B80', line: '#DCE2EA', soft: '#E9EDF3', cobalt: '#3355FF', teal: '#14A89A', amber: '#F2A20C', rose: '#E04B55' };
      Object.keys(values).forEach(key => document.documentElement.style.setProperty('--' + key, values[key]));
    }
  }
  function notify(message) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(notify.timer); notify.timer = setTimeout(() => toast.classList.remove('show'), 2600); }
  window.MachViecUI = { t, translate, applyTheme, refreshShell: renderShell, notify, escape: value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]), salary: job => job.salaryMin + '–' + job.salaryMax + ' triệu', date: value => { if (!value) return '—'; const d = new Date(value + 'T00:00:00'); return d.toLocaleDateString(D.getPrefs().language === 'en' ? 'en-GB' : 'vi-VN'); } };
  applyTheme();
  renderShell();
  window.addEventListener('storage', event => { if (event.key === 'mach-viec.preferences.v1') { applyTheme(); renderShell(); } });
})();
