document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.COURSE_FORMS || {};
  const labels = {registration:'Open teacher registration form',progress:'Record unit completion',submission:'Submit final artifact'};
  document.querySelectorAll('[data-form]').forEach(el => {
    const kind = el.getAttribute('data-form');
    const url = cfg[kind];
    if (typeof url === 'string' && /^https:\/\//i.test(url)) {
      el.href = url;
      el.textContent = labels[kind] || 'Open form';
      el.target = '_blank'; el.rel = 'noopener noreferrer';
      el.removeAttribute('aria-disabled'); el.removeAttribute('title');
    } else {
      el.removeAttribute('href'); el.setAttribute('aria-disabled','true');
      el.textContent = (labels[kind] || 'Open form') + ' (not available)';
    }
  });
});
