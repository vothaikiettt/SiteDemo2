(function () {
  'use strict';
  const STATE_KEY = 'mach-viec.recruitment.v1';
  const PREF_KEY = 'mach-viec.preferences.v1';
  let memoryState = null;
  let memoryPrefs = { theme: 'light', language: 'vi' };
  const seedJobs = [
    { id: 101, title: 'Frontend Engineer', department: 'Kỹ thuật', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Nhân viên', salaryMin: 30, salaryMax: 45, deadline: '2026-12-15', headcount: 2, status: 'open', createdAt: '2026-11-08', description: 'Xây dựng sản phẩm web có trải nghiệm nhanh, dễ tiếp cận và ổn định.', requirements: 'Từ 3 năm kinh nghiệm với React. Hiểu REST API, kiểm thử và làm việc theo nhóm.', benefits: 'Bảo hiểm đầy đủ, thưởng hiệu suất, ngân sách học tập.', skills: ['React', 'TypeScript', 'REST API'], applications: 0 },
    { id: 102, title: 'Chuyên viên phân tích dữ liệu', department: 'Dữ liệu', location: 'TP. Hồ Chí Minh', type: 'Toàn thời gian', level: 'Nhân viên', salaryMin: 22, salaryMax: 32, deadline: '2026-12-10', headcount: 1, status: 'open', createdAt: '2026-11-09', description: 'Phân tích hành vi khách hàng và chuyển dữ liệu thành khuyến nghị kinh doanh.', requirements: 'Có kinh nghiệm SQL, dashboard và trình bày kết quả với các nhóm liên quan.', benefits: 'Lương tháng 13, bảo hiểm sức khỏe, giờ làm linh hoạt.', skills: ['SQL', 'Power BI', 'Python'], applications: 0 },
    { id: 103, title: 'Product Designer', department: 'Sản phẩm', location: 'Làm việc từ xa', type: 'Toàn thời gian', level: 'Trưởng nhóm', salaryMin: 28, salaryMax: 40, deadline: '2026-12-20', headcount: 1, status: 'open', createdAt: '2026-11-10', description: 'Thiết kế luồng sản phẩm từ nghiên cứu người dùng đến bàn giao cho kỹ thuật.', requirements: 'Có portfolio sản phẩm số, thành thạo Figma và tư duy thiết kế hệ thống.', benefits: 'Làm việc linh hoạt, ngân sách thiết bị và phát triển chuyên môn.', skills: ['Figma', 'UX research', 'Design system'], applications: 0 },
    { id: 104, title: 'Chuyên viên tuyển dụng', department: 'Nhân sự', location: 'Đà Nẵng', type: 'Toàn thời gian', level: 'Nhân viên', salaryMin: 16, salaryMax: 23, deadline: '2026-11-30', headcount: 1, status: 'paused', createdAt: '2026-10-28', description: 'Phối hợp với các phòng ban để triển khai quy trình tuyển dụng đầu cuối.', requirements: 'Từ 2 năm kinh nghiệm tuyển dụng, giao tiếp tốt và làm việc có tổ chức.', benefits: 'Thưởng tuyển dụng, bảo hiểm đầy đủ, đội ngũ hỗ trợ cởi mở.', skills: ['Sourcing', 'Phỏng vấn', 'ATS'], applications: 0 }
  ];
  const seedCandidates = [
    { id: 'cv-01', name: 'Nguyễn Minh Anh', role: 'Frontend Engineer', location: 'Hà Nội', experience: 5, education: 'Đại học Bách khoa Hà Nội', skills: ['React', 'TypeScript', 'REST API', 'Jest', 'CSS'], summary: 'Kỹ sư giao diện tập trung vào hiệu năng và khả năng tiếp cận. Đã dẫn dắt cải tiến design system cho sản phẩm B2B.', updated: '2 giờ trước' },
    { id: 'cv-02', name: 'Trần Quốc Bảo', role: 'Data Analyst', location: 'TP. Hồ Chí Minh', experience: 4, education: 'Đại học Kinh tế TP.HCM', skills: ['SQL', 'Power BI', 'Python', 'A/B testing'], summary: 'Phân tích dữ liệu sản phẩm và vận hành. Từng xây dashboard giúp giảm 18% thời gian lập báo cáo.', updated: 'Hôm nay' },
    { id: 'cv-03', name: 'Lê Thu Hà', role: 'Product Designer', location: 'Làm việc từ xa', experience: 6, education: 'Đại học Kiến trúc Hà Nội', skills: ['Figma', 'UX research', 'Design system', 'Prototyping'], summary: 'Thiết kế sản phẩm tài chính và thương mại điện tử, phối hợp chặt với kỹ thuật và nghiên cứu người dùng.', updated: 'Hôm qua' },
    { id: 'cv-04', name: 'Phạm Hoàng Long', role: 'Frontend Engineer', location: 'Đà Nẵng', experience: 3, education: 'Đại học CNTT & Truyền thông Việt-Hàn', skills: ['Vue', 'JavaScript', 'REST API', 'Cypress'], summary: 'Phát triển giao diện web cho nền tảng SaaS, chú trọng chất lượng mã và phối hợp nhóm.', updated: '1 ngày trước' },
    { id: 'cv-05', name: 'Vũ Ngọc Linh', role: 'Recruiter', location: 'Hà Nội', experience: 7, education: 'Đại học Lao động - Xã hội', skills: ['Sourcing', 'Phỏng vấn', 'ATS', 'Employer branding'], summary: 'Tuyển dụng nhân sự công nghệ và xây dựng quy trình đánh giá theo năng lực.', updated: '3 ngày trước' },
    { id: 'cv-06', name: 'Đặng Gia Huy', role: 'Data Analyst', location: 'Hà Nội', experience: 2, education: 'Đại học FPT', skills: ['SQL', 'Python', 'Tableau', 'Excel'], summary: 'Chuyên viên phân tích dữ liệu mới, có kinh nghiệm xây báo cáo và tự động hóa tác vụ định kỳ.', updated: '4 ngày trước' },
    { id: 'cv-07', name: 'Bùi Mai Phương', role: 'Product Designer', location: 'TP. Hồ Chí Minh', experience: 4, education: 'Đại học Văn Lang', skills: ['Figma', 'Prototyping', 'UX research', 'Usability testing'], summary: 'Thiết kế trải nghiệm đa nền tảng, thực hiện phỏng vấn và kiểm thử khả năng sử dụng.', updated: 'Tuần này' },
    { id: 'cv-08', name: 'Hoàng Đức Thành', role: 'Frontend Engineer', location: 'TP. Hồ Chí Minh', experience: 8, education: 'Đại học Bách khoa TP.HCM', skills: ['React', 'TypeScript', 'Node.js', 'Design system'], summary: 'Kỹ sư cấp cao, từng xây thư viện component dùng chung và hướng dẫn nhóm 5 người.', updated: 'Tuần này' }
  ];
  const clone = value => JSON.parse(JSON.stringify(value));
  const defaultState = () => ({ jobs: clone(seedJobs), applications: [], savedCandidates: [], nextJobId: 105 });
  function readState() {
    try {
      const value = JSON.parse(localStorage.getItem(STATE_KEY) || 'null');
      if (value && Array.isArray(value.jobs) && Array.isArray(value.applications)) return value;
    } catch (_) {}
    if (memoryState) return memoryState;
    const value = defaultState();
    writeState(value);
    return value;
  }
  function writeState(state) { memoryState = state; try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {} }
  function getPrefs() {
    try { memoryPrefs = Object.assign({ theme: 'light', language: 'vi' }, JSON.parse(localStorage.getItem(PREF_KEY) || '{}')); }
    catch (_) {}
    return Object.assign({}, memoryPrefs);
  }
  function setPrefs(patch) {
    const prefs = Object.assign(getPrefs(), patch);
    memoryPrefs = prefs;
    try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (_) {}
    return prefs;
  }
  function getJobs() { return clone(readState().jobs); }
  function saveJob(input) {
    const state = readState();
    const job = Object.assign({}, input);
    if (job.id) {
      const index = state.jobs.findIndex(item => String(item.id) === String(job.id));
      if (index < 0) throw new Error('Không tìm thấy tin tuyển dụng cần cập nhật.');
      job.id = state.jobs[index].id;
      job.applications = state.jobs[index].applications || 0;
      state.jobs[index] = Object.assign({}, state.jobs[index], job, { updatedAt: new Date().toISOString() });
    } else {
      job.id = state.nextJobId++;
      job.applications = 0;
      job.createdAt = new Date().toISOString().slice(0, 10);
      state.jobs.unshift(job);
    }
    writeState(state);
    return clone(job);
  }
  function updateJob(id, patch) {
    const state = readState();
    const job = state.jobs.find(item => String(item.id) === String(id));
    if (!job) return null;
    Object.assign(job, patch, { updatedAt: new Date().toISOString() });
    writeState(state);
    return clone(job);
  }
  function getApplications() { return clone(readState().applications); }
  function addApplication(input) {
    const state = readState();
    const job = state.jobs.find(item => String(item.id) === String(input.jobId));
    if (!job) return null;
    const email = String(input.email || '').trim().toLowerCase();
    if (state.applications.some(item => String(item.jobId) === String(job.id) && item.email.toLowerCase() === email)) {
      return { duplicate: true };
    }
    const application = Object.assign({ id: 'app-' + Date.now(), status: 'new', appliedAt: new Date().toISOString() }, input, { jobId: job.id });
    state.applications.unshift(application);
    job.applications = state.applications.filter(item => String(item.jobId) === String(job.id)).length;
    writeState(state);
    return clone(application);
  }
  function updateApplication(id, patch) {
    const state = readState();
    const item = state.applications.find(application => application.id === id);
    if (!item) return null;
    Object.assign(item, patch, { updatedAt: new Date().toISOString() });
    writeState(state);
    return clone(item);
  }
  function getCandidates() { return clone(seedCandidates); }
  function toggleCandidate(id) {
    const state = readState();
    const index = state.savedCandidates.indexOf(id);
    if (index < 0) state.savedCandidates.push(id); else state.savedCandidates.splice(index, 1);
    writeState(state);
    return state.savedCandidates.slice();
  }
  function getSavedCandidates() { return clone(readState().savedCandidates); }
  window.MachViec = { getJobs, saveJob, updateJob, getApplications, addApplication, updateApplication, getCandidates, toggleCandidate, getSavedCandidates, getPrefs, setPrefs };
})();
