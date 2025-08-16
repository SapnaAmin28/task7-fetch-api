
const API_URL = 'https://jsonplaceholder.typicode.com/users';
let controller; // for aborting any in-flight request

const $ = (sel) => document.querySelector(sel);
const usersEl  = $('#users');
const loadingEl= $('#loading');
const errorEl  = $('#error');
const statusEl = $('#status');

function show(el){ el.classList.remove('hidden'); }
function hide(el){ el.classList.add('hidden'); }
function setStatus(msg=''){ statusEl.textContent = msg; }

function escapeHtml(str=''){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
function escapeAttr(str=''){ return String(str).replace(/"/g,'&quot;'); }

async function fetchUsers(url = API_URL){
  // Abort any previous fetch
  if (controller) controller.abort();
  controller = new AbortController();

  hide(errorEl);
  show(loadingEl);
  setStatus('Fetching…');

  try{
    const res = await fetch(url, { signal: controller.signal });
    if(!res.ok){
      // Non-2xx HTTP status -> throw to catch
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const users = await res.json();
    renderUsers(users);
    setStatus(`Loaded ${users.length} users.`);
  }catch(err){
    usersEl.innerHTML = '';
    errorEl.textContent = `Failed to fetch: ${err.message}`;
    show(errorEl);
    setStatus('Error');
  }finally{
    hide(loadingEl);
  }
}

function renderUsers(users){
  usersEl.innerHTML = '';
  const frag = document.createDocumentFragment();
  users.forEach(u => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(u.name)}</h3>
      <p><strong>Email:</strong> <a href="mailto:${escapeAttr(u.email)}">${escapeHtml(u.email)}</a></p>
      <p><strong>Address:</strong> ${escapeHtml(u.address.street)}, ${escapeHtml(u.address.suite)}, ${escapeHtml(u.address.city)} - ${escapeHtml(u.address.zipcode)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(u.phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(u.company?.name)}</p>
      <p><strong>Website:</strong> <a href="http://${escapeAttr(u.website)}" target="_blank" rel="noreferrer noopener">${escapeHtml(u.website)}</a></p>
    `;
    frag.appendChild(card);
  });
  usersEl.appendChild(frag);
}

// Wire up controls
$('#loadBtn').addEventListener('click', () => fetchUsers());
$('#reloadBtn').addEventListener('click', () => fetchUsers());
$('#clearBtn').addEventListener('click', () => { usersEl.innerHTML=''; setStatus('Cleared.'); });
$('#simulateErrorBtn').addEventListener('click', () => {
  // broken domain to simulate a network failure:
  fetchUsers('https://jsonplaceholder.typicodee.com/users');
});

// Auto-load on startup
document.addEventListener('DOMContentLoaded', () => fetchUsers());
