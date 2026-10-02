/**
 * src/components/select.js
 * Custom Accessible Select Element Enhancements
 */

export function initCustomSelects() {
  document.querySelectorAll('select.field:not(.custom-select-applied):not(.master-native-select)').forEach((select) => {
    select.classList.add('custom-select-applied');
    select.style.display = 'none';
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-full';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = select.className.replace('custom-select-applied', '').replace('hidden', '') + ' flex items-center justify-between text-left';
    const renderIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    button.innerHTML = `<span class="truncate">${select.options[select.selectedIndex]?.text || ''}</span>${renderIcon()}`;
    if (select.getAttribute('aria-invalid') === 'true') button.setAttribute('aria-invalid', 'true');
    const menu = document.createElement('div');
    menu.className = 'absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1';

    const update = () => {
      button.innerHTML = `<span class="truncate">${select.options[select.selectedIndex]?.text || ''}</span>${renderIcon()}`;
    };

    const validOptions = Array.from(select.options).filter((opt) => !opt.disabled);

    validOptions.forEach((opt) => {
      const div = document.createElement('div');
      div.className = `cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${opt.selected ? 'bg-[#f0f8f2] font-bold text-primary' : ''}`;
      div.textContent = opt.text;
      div.onclick = () => {
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        select.dispatchEvent(new Event('input', { bubbles: true }));
        menu.classList.add('hidden');
        update();
        Array.from(menu.children).forEach((c, j) => {
          c.className = `cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${validOptions[j].selected ? 'bg-[#f0f8f2] font-bold text-primary' : ''}`;
        });
      };
      menu.appendChild(div);
    });

    button.onclick = (e) => {
      e.preventDefault();
      const isOpen = !menu.classList.contains('hidden');
      document.querySelectorAll('.custom-select-menu').forEach((m) => m.classList.add('hidden'));
      if (!isOpen) menu.classList.remove('hidden');
    };

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
    wrapper.appendChild(select);
  });
}
