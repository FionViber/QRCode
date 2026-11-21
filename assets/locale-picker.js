(() => {
  const select = document.querySelector('#languageSelect');
  const label = select?.closest('.language-picker');
  if (!select || !label) return;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'locale-button';
  button.setAttribute('aria-haspopup', 'listbox'); button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<img src="assets/world.svg" alt=""><span></span><span aria-hidden="true">⌄</span>';
  const menu = document.createElement('div'); menu.className='locale-menu'; menu.hidden=true; menu.setAttribute('role','listbox');
  const options=[...select.options]; const names=new Map(options.map(o=>[o.value,o.textContent]));
  for(const option of options){const item=document.createElement('button');item.type='button';item.className='locale-option';item.setAttribute('role','option');item.dataset.value=option.value;item.textContent=option.textContent;item.addEventListener('click',()=>choose(option.value));menu.append(item)}
  select.hidden=true;label.append(button,menu);
  function sync(){button.querySelector('span').textContent=names.get(select.value)||'';for(const item of menu.children)item.setAttribute('aria-selected',String(item.dataset.value===select.value))}
  function choose(value){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));menu.hidden=true;button.setAttribute('aria-expanded','false');button.focus();sync()}
  button.addEventListener('click',()=>{menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden))});
  document.addEventListener('click',e=>{if(!label.contains(e.target)){menu.hidden=true;button.setAttribute('aria-expanded','false')}});button.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.hidden=true;button.setAttribute('aria-expanded','false')}if(e.key==='ArrowDown'){e.preventDefault();menu.hidden=false;menu.querySelector('.locale-option')?.focus()}});sync();
})();
