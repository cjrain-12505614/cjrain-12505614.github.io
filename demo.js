const tabs = [...document.querySelectorAll('.step-button')];
const panels = [...document.querySelectorAll('.step-panel')];

function selectStep(tab, moveFocus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  }
  for (const panel of panels) {
    panel.hidden = panel.id !== `panel-${tab.dataset.step}`;
  }
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(tab));
  tab.addEventListener('keydown', (event) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    selectStep(tabs[(index + direction + tabs.length) % tabs.length], true);
  });
});
