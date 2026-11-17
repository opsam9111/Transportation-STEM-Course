document.addEventListener('DOMContentLoaded', () => {
  const checks = [...document.querySelectorAll('[data-unit-check]')];
  if (!checks.length) return;
  const key = 'transportation-stem-personal-unit-checklist-v1';
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || '[]'); if (!Array.isArray(saved)) saved = []; } catch (_) { saved = []; }
  checks.forEach(c => { c.checked = saved.includes(Number(c.dataset.unitCheck)); });
  const update = () => {
    const completed = checks.filter(c => c.checked).map(c => Number(c.dataset.unitCheck));
    document.getElementById('personal-progress').textContent = completed.length + ' of 7 units checked on this device (not verified).';
    try { localStorage.setItem(key, JSON.stringify(completed)); } catch (_) {}
  };
  checks.forEach(c => c.addEventListener('change', update)); update();
});
