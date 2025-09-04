// Simple scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:0.12});
revealEls.forEach(el=>io.observe(el));

const gridBySection = {
  Paid: document.querySelector('[data-section="Paid"]'),
  Free: document.querySelector('[data-section="Free"]'),
  Keyless: document.querySelector('[data-section="Keyless"]'),
  MobilePC: document.querySelector('[data-section="MobilePC"]')
};

function badge(label, cls=''){ return `<span class="badge ${cls}">${label}</span>`; }

function card(item){
  const warnBadges = (item.warnings||[]).map(w=>badge(w,'warn')).join('');
  const tags = (item.tags||[]).map(t=>badge(t.toUpperCase(),'platform')).join('');
  const tier = item.tier==='Paid' ? badge('PAID','paid') : badge('FREE','free');
  const keyless = item.keyless ? badge('KEYLESS','keyless') : '';
  const safety = item.safe ? '' : badge('WARNUNG','warn');
  const desc = item.description || '';
  const link = item.url ? `<a class="button" href="${item.url}" target="_blank" rel="noopener">Zur Website</a>` : '';
  return `
    <article class="card reveal">
      <h3>${item.name}</h3>
      <p>${desc}</p>
      <div class="badges">${tier}${keyless}${safety}${tags}${warnBadges}</div>
      ${link}
    </article>
  `;
}

function render(items){
  Object.values(gridBySection).forEach(el=>el.innerHTML='');
  const search = (document.getElementById('search').value || '').toLowerCase();
  const active = Array.from(document.querySelectorAll('.chip.active')).map(b=>b.dataset.filter);
  items.forEach(item=>{
    // section placement
    const sec = item.tier==='Paid' ? 'Paid' : item.tier==='Free' ? 'Free' : null;
    const mobilepc = (item.platforms||[]).some(p=>['Mobile','PC','Mac'].includes(p));
    // filters
    const text = (item.name + ' ' + (item.tags||[]).join(' ') + ' ' + (item.platforms||[]).join(' ')).toLowerCase();
    const matchesSearch = text.includes(search);
    const matchesChips = active.length===0 || active.every(tag => 
      (item.tags||[]).includes(tag) || (item.platforms||[]).includes(tag) || (item.tier===tag) || (tag==='Warnung' && (!item.safe || (item.warnings||[]).length))
    );
    if(matchesSearch && matchesChips){
      if(sec && gridBySection[sec]) gridBySection[sec].insertAdjacentHTML('beforeend', card(item));
      if(mobilepc) gridBySection['MobilePC'].insertAdjacentHTML('beforeend', card(item));
    }
  });
  // reattach reveal to newly inserted
  document.querySelectorAll('.card.reveal').forEach(el=>io.observe(el));
}

fetch('data/items.json')
  .then(r=>r.json())
  .then(data=>{
    window.__items = data.items || [];
    render(window.__items);
  });

// filters
document.querySelectorAll('.chip').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.id==='clear'){
      document.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));
    }else{
      btn.classList.toggle('active');
    }
    render(window.__items||[]);
  });
});
document.getElementById('search').addEventListener('input',()=>render(window.__items||[]));
