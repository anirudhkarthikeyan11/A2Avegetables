(function () {
  'use strict';

  var IMG = 'assets/img/';
  var VEGGIES = [
    { name: 'Tomato', local: 'തക്കാളി', price: 30, unit: 'kg', cat: 'staples', img: IMG + 'tomato.jpg', desc: "Firm, ripe tomatoes from this morning's lot. Good for gravies, chutneys and the lunchbox salad." },
    { name: 'Onion', local: 'സവാള', price: 40, unit: 'kg', cat: 'staples', img: IMG + 'onion-plate.jpg', desc: 'Dry, clean bulbs with the tops trimmed short. Keeps well for weeks in a cool, dark pantry.' },
    { name: 'Potato', local: 'ഉരുളക്കിഴങ്ങ്', price: 35, unit: 'kg', cat: 'staples', img: IMG + 'potato.jpg', desc: 'Firm potatoes brushed clean, no green patches. Boils dry for fries, holds shape in sambar.' },
    { name: 'Green Chilli', local: 'പച്ചമുളക്', price: 80, unit: 'kg', cat: 'staples', img: IMG + 'green-chilli.jpg', desc: 'Thin, sharp chillies picked this morning. A little goes a long way in the tempering.' },
    { name: 'Brinjal', local: 'വഴുതനങ്ങ', price: 55, unit: 'kg', cat: 'staples', img: IMG + 'brinjal-plant.png', desc: 'Glossy, tight-skinned brinjals — best when the skin springs back at a press.' },
    { name: 'Cucumber', local: 'വെള്ളരിക്ക', price: 30, unit: 'kg', cat: 'staples', img: IMG + 'cucumber-pile.png', desc: 'Cool, watery cucumbers for pachadi, raita and the salad box. Sold by weight.' },
    { name: 'Capsicum', local: 'ക്യാപ്സിക്കം', price: 60, unit: 'kg', cat: 'staples', img: IMG + 'capsicum-plant.jpg', desc: 'Crunchy green capsicum with thick walls. Slices clean for stir-fries and biryani.' },
    { name: 'Spinach', local: 'പാലക്ക് ചീര', price: 20, unit: 'bunch', cat: 'greens', img: IMG + 'spinach-bunch.jpg', desc: 'A fresh bunch of palak with the roots trimmed. Goes soft quickly in a hot pan.' },
    { name: 'Cabbage', local: 'മുട്ടക്കോസ്', price: 35, unit: 'piece', cat: 'greens', img: IMG + 'cabbage-field.jpg', desc: 'Tight, heavy heads that feel solid in the hand. Crisp for poriyal, soft for a slow curry.' },
    { name: 'Coriander', local: 'മല്ലിയില', price: 15, unit: 'bunch', cat: 'greens', img: IMG + 'coriander.jpg', desc: 'Fragrant coriander bunches, stems on. Wash, dry and chill to keep the leaves perky.' },
    { name: 'Green Mango', local: 'പച്ചമാങ്ങ', price: 90, unit: 'kg', cat: 'exotic', img: IMG + 'green-mango.jpg', desc: 'Hard green mangoes for pachadi, pickle and the salt-and-chilli snack.' },
    { name: 'Carrot', local: 'കാരറ്റ്', price: 45, unit: 'kg', cat: 'roots', img: IMG + 'carrot.jpg', desc: 'Snappy carrots with a bright core. Sweet enough to eat raw, firm enough to grate.' },
    { name: 'Beetroot', local: 'ബീറ്റ്റൂട്ട്', price: 40, unit: 'kg', cat: 'roots', img: IMG + 'beetroot-cut.jpg', desc: 'Deep-red beetroots with clean rings. Roast or boil — the skin slips right off.' },
    { name: 'Garlic', local: 'വെളുത്തുള്ളി', price: 120, unit: 'kg', cat: 'roots', img: IMG + 'garlic-bulbs.png', desc: 'Plump, dry bulbs sold by weight so you get exactly the pods you need.' },
    { name: 'Ginger', local: 'ഇഞ്ചി', price: 90, unit: 'kg', cat: 'roots', img: IMG + 'ginger-root.jpg', desc: 'Fresh ginger with a juicy snap. Grate it for chai, slice it for the tempering.' },
    { name: 'Broccoli', local: 'ബ്രോക്കോളി', price: 120, unit: 'kg', cat: 'exotic', img: IMG + 'broccoli-florets.jpg', desc: 'Tight green florets, cut to order at the counter. Steam three minutes, no more.' },
    { name: 'Drumstick', local: 'മുരിങ്ങക്കായ', price: 60, unit: 'kg', cat: 'roots', img: IMG + 'drumstick-bunch.jpg', desc: 'Long drumsticks with fat seeds inside — the classic sambar stick.' },
    { name: 'Mushroom', local: 'കൂൺ', price: 90, unit: '250 g', cat: 'exotic', img: IMG + 'mushroom-board.jpg', desc: 'Button mushrooms in clean, dry trays. Ready for the masala, no washing needed.' }
  ];

  var CATS = [
    { id: 'all', label: 'All veggies', icon: '🧺' },
    { id: 'staples', label: 'Everyday staples', icon: '🍅' },
    { id: 'greens', label: 'Leafy greens', icon: '🥬' },
    { id: 'roots', label: 'Roots & spices', icon: '🥕' },
    { id: 'exotic', label: 'Exotic picks', icon: '🥦' }
  ];

  // ---------- helpers (same rules as the original) ----------
  function qtyOptions(v) {
    if (v.unit === 'kg') return [{ label: '250 g', qty: .25 }, { label: '500 g', qty: .5 }, { label: '1 kg', qty: 1 }, { label: '2 kg', qty: 2 }];
    if (v.unit === '250 g') return [{ label: '250 g', qty: 1 }, { label: '500 g', qty: 2 }, { label: '750 g', qty: 3 }];
    if (v.unit === 'bunch') return [{ label: '1 bunch', qty: 1 }, { label: '2 bunches', qty: 2 }, { label: '3 bunches', qty: 3 }];
    return [{ label: '1 piece', qty: 1 }, { label: '2 pieces', qty: 2 }, { label: '3 pieces', qty: 3 }];
  }
  function step(v) { return v.unit === 'kg' ? .25 : 1; }
  // How many times an item was added (each + press = 1), shown instead of kg / g
  function addedCount(v, q) { var p = packs[v.name]; return p ? p.length : (q > 0 ? 1 : 0); }
  function fmtQty(v, q) {
    var n = Math.round(q * 1e3) / 1e3;
    if (v.unit === 'kg') return n < 1 ? Math.round(n * 1e3) + ' g' : n + ' kg';
    if (v.unit === '250 g') return Math.round(n * 250) + ' g';
    if (n === 1) return '1 ' + v.unit;
    return n + ' ' + (v.unit === 'bunch' ? 'bunches' : v.unit === 'piece' ? 'pieces' : v.unit + 's');
  }
  function money(n) { return '₹' + (Number.isInteger(n) ? n : n.toFixed(2)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function byName(n) { for (var i = 0; i < VEGGIES.length; i++) if (VEGGIES[i].name === n) return VEGGIES[i]; }
  function $(id) { return document.getElementById(id); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  // ---------- state ----------
  var cat = 'all', query = '', basket = {}, order = [], popKey = 0;
  var sheetVeg = null, sheetQty = 1, sheetAdded = false, sheetTimer = 0, sheetPrevFocus = null;

  // ---------- typewriter text ----------
  document.querySelectorAll('[data-type]').forEach(function (host) {
    var text = host.getAttribute('data-type'), base = +host.dataset.base, speed = +host.dataset.speed;
    var words = text.split(' '), idx = 0, html = '';
    words.forEach(function (w, wi) {
      html += '<span class="type-word">';
      w.split('').forEach(function (ch) { html += '<span class="type-char" style="animation-delay:' + (base + idx * speed) + 'ms">' + esc(ch) + '</span>'; idx++; });
      html += '</span>' + (wi < words.length - 1 ? ' ' : '');
    });
    html += '<span class="type-caret" style="animation-delay:' + (base + idx * speed + 140) + 'ms"></span>';
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = html;
  });

  // ---------- reveal on scroll ----------
  function observeReveal(root) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    (root || document).querySelectorAll('.reveal:not(.in)').forEach(function (n) { io.observe(n); });
  }
  observeReveal();

  // ---------- pause floating animations in sections that are off screen ----------
  if ('IntersectionObserver' in window) {
    var animIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('anim-off', !e.isIntersecting); });
    }, { rootMargin: '200px 0px' });
    ['top', 'shop', 'why', 'visit'].forEach(function (id) { var s = $(id); if (s) animIO.observe(s); });
  }

  // ---------- scroll: header compaction + hero parallax ----------
  var nav = $('nav'), hero = $('heroParallax'), raf = 0, scrolled = false;

  // ---------- cart button: appears bottom-right once you scroll down (the header Basket stays put) ----------
  var body = document.body, docked = false;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setDocked(on) {
    if (on === docked) return;
    docked = on;
    body.classList.toggle('show-cart', on);
  }

  function onScroll() {
    raf = 0;
    var y = window.scrollY, s = y > 20;
    if (s !== scrolled) { scrolled = s; nav.classList.toggle('py-2', s); }
    setDocked(y > 120);
    if (hero && y < window.innerHeight * 1.5) hero.style.transform = 'translate3d(0, ' + (y * .15).toFixed(1) + 'px, 0)';
  }
  onScroll();
  window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });

  // ---------- hamburger menu ----------
  var menuWrap = $('menuWrap'), menuBtn = $('menuBtn'), menu = $('menu'), bars = menuWrap.querySelectorAll('.mbar');
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open);
    bars[0].classList.toggle('translate-y-1.5', open); bars[0].classList.toggle('rotate-45', open);
    bars[1].classList.toggle('opacity-0', open);
    bars[2].classList.toggle('-translate-y-1.5', open); bars[2].classList.toggle('-rotate-45', open);
  }
  // ☰ opens the shop owner login (or the dashboard when already logged in as owner)
  menuBtn.addEventListener('click', function () { openOwnerArea(); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('mousedown', function (e) { if (!menu.hidden && !menuWrap.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  // ---------- backend (Supabase) ----------
  var cfg = window.A2A_CONFIG || {};
  var sb = (cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase)
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
  var BASE_VEG = VEGGIES.slice(), allVeg = VEGGIES.slice(), currentUser = null, isOwner = false;

  // ---------- popup helper: scroll lock, Esc closes the top popup, smooth close animation ----------
  var lockCount = 0, lockSaved = '', modalStack = [];
  function lockScroll() { if (lockCount++ === 0) { lockSaved = document.body.style.overflow; document.body.style.overflow = 'hidden'; } }
  function unlockScroll() { if (lockCount > 0 && --lockCount === 0) document.body.style.overflow = lockSaved; }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalStack.length) modalStack[modalStack.length - 1](false);
  });
  function modal(node) {
    var timer = 0;
    function isOpen() { return !node.hidden && !node.classList.contains('is-closing'); }
    function set(open) {
      if (open === isOpen()) return;
      clearTimeout(timer);
      if (open) {
        var wasHidden = node.hidden;
        node.classList.remove('is-closing');
        node.hidden = false;
        if (wasHidden) lockScroll();
        modalStack.push(set);
      } else {
        modalStack = modalStack.filter(function (f) { return f !== set; });
        node.classList.add('is-closing');
        timer = setTimeout(function () {
          node.hidden = true;
          node.classList.remove('is-closing');
          unlockScroll();
        }, reduceMotion ? 0 : 300);
      }
    }
    return set;
  }

  // ---------- shop owner account ----------
  // Only this email gets the dashboard.
  var OWNER_EMAIL = 'anirudhkarthikeyan25@gmail.com';
  // SHA-256 fingerprint of the owner password (the password itself is not stored in the site).
  var OWNER_PASS_SHA256 = '2c679a7e56076005a59081a37b0e4a7be7139fa098d3f181debd1eb228a9f319';
  var LOCAL_SESSION_KEY = 'a2a-owner', LOCAL_PRICES_KEY = 'a2a-local-prices';

  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  function readJSON(kind, key) { try { return JSON.parse(store(kind).getItem(key)) || null; } catch (e) { return null; } }
  function writeJSON(kind, key, val) { try { store(kind).setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; } }
  function removeKey(kind, key) { try { store(kind).removeItem(key); } catch (e) {} }
  async function sha256(text) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  function isOwnerEmail(email) { return String(email || '').trim().toLowerCase() === OWNER_EMAIL; }

  function openOwnerArea() { if (isOwner) openDash(); else setOwnerLogin(true); }
  function renderMenuAuth() { menuBtn.setAttribute('aria-label', isOwner ? 'Open owner dashboard' : 'Log in as shop owner'); }

  // ---------- shop owner login popup ----------
  var ownerLogin = $('ownerLogin'), setOwnerLoginRaw = modal(ownerLogin);
  function setOwnerLogin(open) {
    setOwnerLoginRaw(open);
    if (open) { $('ownerMsg').textContent = ''; $('ownerMsg').classList.remove('is-error'); $('ownerEmail').focus(); }
  }
  ownerLogin.addEventListener('click', function (e) { if (e.target.closest('[data-ol="close"]')) setOwnerLogin(false); });
  $('ownerPassToggle').addEventListener('click', function () {
    var p = $('ownerPass'), show = p.type === 'password';
    p.type = show ? 'text' : 'password';
    this.textContent = show ? '🙈' : '👁️';
    this.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
  $('ownerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    var msg = $('ownerMsg'), btn = $('ownerSubmit');
    var email = $('ownerEmail').value.trim(), pass = $('ownerPass').value;
    function fail(t) { msg.textContent = t; msg.classList.add('is-error'); ownerLogin.querySelector('form').classList.remove('shake'); void ownerLogin.offsetWidth; ownerLogin.querySelector('form').classList.add('shake'); }
    msg.classList.remove('is-error');
    if (!isOwnerEmail(email)) { fail('This email does not have owner access.'); return; }
    btn.disabled = true; msg.textContent = 'Logging in…';
    try {
      if (sb) {
        var res = await sb.auth.signInWithPassword({ email: email, password: pass });
        if (res.error) { fail(res.error.message === 'Invalid login credentials' ? 'Wrong email or password.' : res.error.message); return; }
        await refreshOwner(res.data.user);
        if (!isOwner) { fail('This account is not set up as a shop owner yet (see SETUP.md).'); return; }
      } else {
        if (!window.crypto || !crypto.subtle) { fail('Open the site through serve.ps1 (http://localhost) to log in.'); return; }
        if ((await sha256(pass)) !== OWNER_PASS_SHA256) { fail('Wrong email or password.'); return; }
        writeJSON('sessionStorage', LOCAL_SESSION_KEY, { email: OWNER_EMAIL });
        await refreshOwner({ email: OWNER_EMAIL });
      }
      $('ownerPass').value = '';
      msg.textContent = '';
      setOwnerLogin(false);
      openDash();
    } catch (err) {
      fail('Could not reach the server. Check your internet connection.');
    } finally { btn.disabled = false; }
  });

  async function refreshOwner(user) {
    currentUser = user || null; isOwner = false;
    if (currentUser && isOwnerEmail(currentUser.email)) {
      if (sb) { var r = await sb.rpc('is_shop_owner'); isOwner = !r.error && r.data === true; }
      else isOwner = true;
    }
    renderMenuAuth();
  }
  async function signOut() {
    setDash(false);
    removeKey('sessionStorage', LOCAL_SESSION_KEY);
    if (sb) await sb.auth.signOut();
    await refreshOwner(null);
  }

  // Without a database, the owner's changes are kept in this browser only.
  var LOCAL_ADDED_KEY = 'a2a-local-added';
  function applyLocalOverrides() {
    var o = readJSON('localStorage', LOCAL_PRICES_KEY) || {};
    var added = readJSON('localStorage', LOCAL_ADDED_KEY) || [];
    allVeg = BASE_VEG.concat(added).map(function (v) {
      var c = o[v.name]; if (!c) return v;
      return Object.assign({}, v, { price: c.price, available: c.available, updated: c.updated });
    });
    applyVeggies();
  }

  // ---------- prices from the database ----------
  function fromRow(r) {
    return { id: r.id, name: r.name, local: r.local, price: +r.price, unit: r.unit, cat: r.cat, img: r.img, desc: r.description, available: r.available, updated: r.updated_at, sort: r.sort };
  }
  function applyVeggies() {
    VEGGIES = allVeg.filter(function (v) { return v.available !== false; });
    // drop basket items that are no longer sold
    order = order.filter(function (n) { if (byName(n)) return true; delete basket[n]; delete packs[n]; return false; });
    // rebuild only the cards whose details changed; the rest (and their pictures) stay as they are
    Object.keys(cardNodes).forEach(function (k) {
      var v = byName(k);
      if (!v || cardNodes[k].dataset.sig !== cardSig(v)) { cardNodes[k].remove(); delete cardNodes[k]; }
    });
    renderGrid();
    updateBasket(false);
    var latest = allVeg.reduce(function (m, v) { return v.updated && v.updated > m ? v.updated : m; }, '');
    if (latest) {
      var d = new Date(latest), today = new Date();
      var time = d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
      var day = d.toDateString() === today.toDateString() ? 'today' : 'on ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      $('lastUpdated').textContent = 'Prices last updated ' + day + ' at ' + time;
    }
  }
  async function loadVeggies() {
    if (!sb) return;
    var r = await sb.from('veggies').select('*').order('sort').order('name');
    if (r.error || !r.data || !r.data.length) { if (r.error) console.warn('Could not load prices:', r.error.message); return; }
    allVeg = r.data.map(fromRow);
    applyVeggies();
  }

  // ---------- owner dashboard ----------
  var dash = $('dash'), setDash = modal(dash), CAT_LABEL = {};
  CATS.forEach(function (c) { CAT_LABEL[c.id] = c.label; });
  dash.addEventListener('click', function (e) { if (e.target.closest('[data-dash="close"]')) setDash(false); });
  function openDash(newName) {
    if (!isOwner) return;
    $('dashWho').textContent = 'Logged in as ' + (currentUser.email || 'owner') + '. Change a price or tick/untick “In stock”, then press Save.' +
      (sb ? '' : ' Not connected to a database yet, so changes are saved in this browser only.');
    $('dashMsg').textContent = '';
    $('dashMsg').classList.remove('is-error');
    $('dashRows').innerHTML = allVeg.map(function (v) {
      return '<div class="dash-row' + (v.name === newName ? ' is-new' : '') + '" data-id="' + esc(sb ? v.id : v.name) + '">' +
        '<div class="dash-veg">' + (v.img ? '<img class="dash-thumb" src="' + esc(v.img) + '" alt="" loading="lazy">' : '<span class="dash-thumb" style="display:grid;place-items:center">🥬</span>') +
          '<div style="min-width:0"><div class="dash-name">' + esc(v.name) + '</div><div class="dash-sub">' + (v.local ? esc(v.local) + ' · ' : '') + esc(CAT_LABEL[v.cat] || v.cat) + '</div></div></div>' +
        '<label class="dash-price">₹<input type="number" min="0" step="0.5" inputmode="decimal" value="' + v.price + '" data-orig="' + v.price + '" aria-label="' + esc(v.name) + ' price"> / ' + esc(v.unit) + '</label>' +
        '<input type="checkbox" ' + (v.available !== false ? 'checked' : '') + ' data-orig="' + (v.available !== false) + '" aria-label="' + esc(v.name) + ' in stock">' +
      '</div>';
    }).join('');
    setDash(true);
    if (newName) {
      var nr = $('dashRows').querySelector('.is-new');
      if (nr) { nr.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); $('dashMsg').textContent = '✓ ' + newName + ' added to the price list.'; }
    }
  }

  // ---------- add a new vegetable ----------
  var addVeg = $('addVeg'), setAddVeg = modal(addVeg), avPhotoBlob = null, avPhotoData = '';
  addVeg.addEventListener('click', function (e) { if (e.target.closest('[data-av="close"]')) setAddVeg(false); });
  $('dashAdd').addEventListener('click', function () {
    $('avForm').reset();
    avPhotoBlob = null; avPhotoData = '';
    $('avPreview').hidden = true; $('avPreview').removeAttribute('src');
    $('avPhotoEmpty').hidden = false; $('avPhotoChange').hidden = true;
    $('avMsg').textContent = ''; $('avMsg').classList.remove('is-error');
    addVeg.querySelectorAll('.invalid').forEach(function (n) { n.classList.remove('invalid'); });
    setAddVeg(true);
    setTimeout(function () { $('avName').focus(); }, 50);
  });

  // Shrink the picture in the browser (max 720px, JPEG) so it loads fast and fits in storage.
  function shrinkImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var s = Math.min(1, 720 / Math.max(img.naturalWidth, img.naturalHeight));
        var w = Math.round(img.naturalWidth * s), h = Math.round(img.naturalHeight * s);
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        var data = c.toDataURL('image/jpeg', 0.8);
        c.toBlob(function (blob) { resolve({ blob: blob, data: data }); }, 'image/jpeg', 0.8);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('bad image')); };
      img.src = url;
    });
  }
  async function takePhoto(file) {
    var msg = $('avMsg');
    if (!file) return;
    if (!/^image\//.test(file.type)) { msg.textContent = 'Please choose a picture file.'; msg.classList.add('is-error'); return; }
    msg.textContent = 'Preparing picture…'; msg.classList.remove('is-error');
    try {
      var r = await shrinkImage(file);
      avPhotoBlob = r.blob; avPhotoData = r.data;
      $('avPreview').src = r.data; $('avPreview').hidden = false;
      $('avPhotoEmpty').hidden = true; $('avPhotoChange').hidden = false;
      $('avPhotoChange').parentElement.classList.remove('invalid');
      msg.textContent = '';
    } catch (e) { msg.textContent = 'That picture could not be opened. Try another one.'; msg.classList.add('is-error'); }
  }
  $('avPhoto').addEventListener('change', function () { takePhoto(this.files && this.files[0]); });
  var avDrop = addVeg.querySelector('.av-photo');
  ['dragenter', 'dragover'].forEach(function (t) { avDrop.addEventListener(t, function (e) { e.preventDefault(); avDrop.classList.add('drag'); }); });
  ['dragleave', 'drop'].forEach(function (t) { avDrop.addEventListener(t, function (e) { e.preventDefault(); avDrop.classList.remove('drag'); }); });
  avDrop.addEventListener('drop', function (e) { takePhoto(e.dataTransfer.files && e.dataTransfer.files[0]); });

  $('avForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    var msg = $('avMsg'), btn = $('avSubmit');
    var name = $('avName').value.trim().replace(/\s+/g, ' ');
    var price = $('avPrice').value;
    var bad = null;
    addVeg.querySelectorAll('.invalid').forEach(function (n) { n.classList.remove('invalid'); });
    function err(el, t) { if (!bad) { bad = t; el.classList.add('invalid'); if (el.focus) el.focus(); } }
    if (!avPhotoBlob) err(avDrop, 'Please add a picture.');
    if (!name) err($('avName'), 'Please enter the vegetable name.');
    else if (allVeg.some(function (v) { return v.name.toLowerCase() === name.toLowerCase(); })) err($('avName'), name + ' is already on the price list.');
    if (price === '' || isNaN(+price) || +price < 0) err($('avPrice'), 'Please enter a valid price.');
    if (bad) { msg.textContent = bad; msg.classList.add('is-error'); return; }

    var veg = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      local: $('avLocal').value.trim(),
      price: Math.round(+price * 100) / 100,
      unit: $('avUnit').value,
      cat: $('avCat').value,
      desc: $('avDesc').value.trim(),
      available: true,
      updated: new Date().toISOString()
    };
    btn.disabled = true; msg.classList.remove('is-error'); msg.textContent = 'Adding…';
    try {
      if (sb) {
        var path = 'veg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
        var up = await sb.storage.from('veggie-photos').upload(path, avPhotoBlob, { contentType: 'image/jpeg', upsert: false });
        if (up.error) throw new Error('Picture upload failed: ' + up.error.message);
        var imgUrl = sb.storage.from('veggie-photos').getPublicUrl(path).data.publicUrl;
        var maxSort = allVeg.reduce(function (m, v) { return Math.max(m, v.sort || 0); }, 0);
        var ins = await sb.from('veggies').insert({
          name: veg.name, local: veg.local, price: veg.price, unit: veg.unit, cat: veg.cat,
          img: imgUrl, description: veg.desc, available: true, sort: Math.max(maxSort, allVeg.length) + 1
        }).select();
        if (ins.error) throw new Error(ins.error.message);
        await loadVeggies();
      } else {
        veg.img = avPhotoData;
        var added = readJSON('localStorage', LOCAL_ADDED_KEY) || [];
        added.push(veg);
        if (!writeJSON('localStorage', LOCAL_ADDED_KEY, added)) throw new Error('This browser is out of space to save more pictures.');
        applyLocalOverrides();
      }
      setAddVeg(false);
      openDash(veg.name);
    } catch (ex) {
      msg.textContent = ex.message || 'Could not add the vegetable.'; msg.classList.add('is-error');
    } finally { btn.disabled = false; }
  });
  $('dashRows').addEventListener('input', function (e) {
    var row = e.target.closest('.dash-row'); if (!row) return;
    var p = row.querySelector('input[type=number]'), c = row.querySelector('input[type=checkbox]');
    row.classList.toggle('changed', +p.value !== +p.dataset.orig || String(c.checked) !== c.dataset.orig);
  });
  $('dashSave').addEventListener('click', async function () {
    var msg = $('dashMsg'), btn = $('dashSave');
    var rows = Array.prototype.slice.call(document.querySelectorAll('#dashRows .dash-row.changed'));
    if (!rows.length) { msg.textContent = 'Nothing changed.'; return; }
    for (var i = 0; i < rows.length; i++) {
      var v = rows[i].querySelector('input[type=number]').value;
      if (v === '' || isNaN(+v) || +v < 0) { msg.textContent = 'Please enter a valid price.'; rows[i].querySelector('input[type=number]').focus(); return; }
    }
    btn.disabled = true; msg.textContent = 'Saving…';
    function markSaved() {
      msg.textContent = '✓ Saved ' + rows.length + ' change' + (rows.length > 1 ? 's' : '') + '. The price list is updated.';
      rows.forEach(function (row) {
        var p = row.querySelector('input[type=number]'), c = row.querySelector('input[type=checkbox]');
        p.dataset.orig = p.value; c.dataset.orig = String(c.checked); row.classList.remove('changed');
      });
    }
    if (!sb) {
      var o = readJSON('localStorage', LOCAL_PRICES_KEY) || {}, now = new Date().toISOString();
      rows.forEach(function (row) {
        o[row.dataset.id] = { price: +row.querySelector('input[type=number]').value, available: row.querySelector('input[type=checkbox]').checked, updated: now };
      });
      if (!writeJSON('localStorage', LOCAL_PRICES_KEY, o)) { msg.textContent = 'This browser blocked saving.'; btn.disabled = false; return; }
      markSaved();
      applyLocalOverrides();
      btn.disabled = false;
      return;
    }
    try {
      var results = await Promise.all(rows.map(function (row) {
        return sb.from('veggies').update({
          price: +row.querySelector('input[type=number]').value,
          available: row.querySelector('input[type=checkbox]').checked
        }).eq('id', +row.dataset.id).select('id');
      }));
      var failed = results.filter(function (r) { return r.error || !r.data || !r.data.length; });
      if (failed.length) { msg.textContent = 'Some prices were not saved' + (failed[0].error ? ': ' + failed[0].error.message : ' (no permission).'); }
      else markSaved();
      await loadVeggies();
    } catch (err) {
      msg.textContent = 'Could not reach the server. Check your internet connection.';
    } finally { btn.disabled = false; }
  });

  $('dashSignOut').addEventListener('click', signOut);

  function initBackend() {
    renderMenuAuth();
    if (!sb) {
      applyLocalOverrides();
      var s = readJSON('sessionStorage', LOCAL_SESSION_KEY);
      if (s && isOwnerEmail(s.email)) refreshOwner({ email: OWNER_EMAIL });
      return;
    }
    loadVeggies();
    sb.auth.getSession().then(function (r) { refreshOwner(r.data.session && r.data.session.user); });
    sb.auth.onAuthStateChange(function (event, session) {
      if (event === 'SIGNED_OUT') { setDash(false); }
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        // run outside the auth callback to avoid Supabase client deadlocks
        setTimeout(function () { refreshOwner(session && session.user); }, 0);
      }
    });
  }

  // ---------- categories ----------
  var catsEl = $('cats');
  function renderCats() {
    catsEl.innerHTML = '';
    CATS.forEach(function (c) {
      var b = el('<button class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ' +
        (cat === c.id ? 'bg-primary text-primary-foreground shadow-lg scale-105' : 'glass hover:-translate-y-0.5') + '">' + c.icon + ' ' + esc(c.label) + '</button>');
      b.addEventListener('click', function () { cat = c.id; renderCats(); renderGrid(); });
      catsEl.appendChild(b);
    });
  }

  // ---------- cards (keyed by name, like React) ----------
  var grid = $('grid'), cardNodes = {};
  function controlsHTML(v) {
    var n = basket[v.name] || 0;
    if (n === 0) return '<button data-act="add" class="w-full rounded-full bg-primary/10 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95">+ Add</button>';
    return '<div class="flex items-center justify-between rounded-full bg-primary p-1 text-primary-foreground">' +
      '<button data-act="dec" aria-label="Remove ' + esc(v.name) + '" class="h-7 w-7 rounded-full transition hover:bg-primary-foreground/20">−</button>' +
      '<span class="text-sm font-semibold">' + fmtQty(v, n) + '</span>' +
      '<button data-act="inc" aria-label="Add ' + esc(v.name) + '" class="h-7 w-7 rounded-full transition hover:bg-primary-foreground/20">+</button></div>';
  }
  function makeCard(v) {
    var node = el(
      '<div class="card-float"><div class="liquid glass group animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 cursor-pointer rounded-3xl p-3 transition hover:-translate-y-1.5 hover:shadow-2xl">' +
        '<button type="button" data-act="open" aria-label="See ' + esc(v.name) + ' details and prices" class="block w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring">' +
          '<div class="relative aspect-square overflow-hidden rounded-2xl bg-secondary"><div class="absolute inset-0">' +
            (v.img ? '<img src="' + esc(v.img) + '" alt="' + esc(v.name) + '" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-2">'
                   : '<div class="grid h-full place-items-center text-7xl transition group-hover:scale-110">🥬</div>') +
          '</div><span class="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 rounded-full glass px-3 py-1.5 text-center text-xs font-semibold text-primary opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">See details &amp; quantity →</span></div>' +
        '</button>' +
        '<div class="mt-3 flex items-start justify-between gap-2 px-1"><div><h3 class="text-lg font-semibold leading-tight">' + esc(v.name) + '</h3><p class="text-xs text-muted-foreground">' + esc(v.local) + '</p></div>' +
          '<div class="text-right"><div class="font-display text-lg font-semibold text-primary">₹' + v.price + '</div><div class="text-[11px] text-muted-foreground">/ ' + esc(v.unit) + '</div></div></div>' +
        '<div class="ctl mt-3 px-1 pb-1">' + controlsHTML(v) + '</div>' +
      '</div></div>');
    node.dataset.sig = cardSig(v);
    var inner = node.firstChild;
    inner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'), act = b && b.dataset.act;
      if (act === 'add' || act === 'inc') { e.stopPropagation(); change(v.name, step(v)); }
      else if (act === 'dec') { e.stopPropagation(); change(v.name, -step(v)); }
      else openSheet(v);
    });
    return node;
  }
  function renderGrid() {
    var q = query.trim().toLowerCase();
    var list = VEGGIES.filter(function (v) { return (cat === 'all' || v.cat === cat) && (v.name + v.local).toLowerCase().indexOf(q) !== -1; });
    var keep = {}, first = {}, animate = !reduceMotion && grid.children.length > 0;
    list.forEach(function (v) { keep[v.name] = 1; });
    // remember where cards that stay on screen are now (for the glide)
    if (animate) Object.keys(cardNodes).forEach(function (k) {
      if (keep[k] && cardNodes[k].parentNode === grid) first[k] = cardNodes[k].getBoundingClientRect();
    });
    // Hidden cards are only taken off the page and kept ready, so their pictures never reload when you switch filters.
    Object.keys(cardNodes).forEach(function (k) { if (!keep[k] && cardNodes[k].parentNode) cardNodes[k].remove(); });
    var entering = 0;
    list.forEach(function (v, i) {
      var isNew = !cardNodes[v.name] || cardNodes[v.name].parentNode !== grid;
      var node = cardNodes[v.name] || (cardNodes[v.name] = makeCard(v));
      // float timing stays tied to the vegetable, so cards never jump when the list changes
      node.style.animationDelay = (VEGGIES.indexOf(v) % 4 * -1.7) + 's';
      if (isNew) node.firstChild.style.animationDelay = (entering++ * 40) + 'ms';
      // only move a card in the page if it is out of place (moving restarts its animations)
      if (grid.children[i] !== node) grid.insertBefore(node, grid.children[i] || null);
    });
    // glide cards that stayed from their old spot to their new spot
    if (animate) list.forEach(function (v) {
      var f = first[v.name]; if (!f) return;
      var inner = cardNodes[v.name].firstChild, l = cardNodes[v.name].getBoundingClientRect();
      var dx = f.left - l.left, dy = f.top - l.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      inner.animate([{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'translate(0, 0)' }],
        { duration: 550, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    });
    var empty = $('empty');
    empty.hidden = list.length !== 0;
    empty.textContent = 'No vegetables match "' + query + '".';
  }
  function refreshCardControls() {
    Object.keys(cardNodes).forEach(function (k) {
      var ctl = cardNodes[k].querySelector('.ctl'), html = controlsHTML(byName(k));
      if (ctl.innerHTML !== html) ctl.innerHTML = html;
    });
  }
  $('search').addEventListener('input', function (e) { query = e.target.value; renderGrid(); });

  // ---------- basket ----------
  // packs[name] = list of amounts added, one entry per "add" (so the shown number = how many times it was added)
  var packs = {};
  function change(name, delta) {
    var cur = basket[name] || 0, p = packs[name] || (packs[name] = []);
    if (delta > 0) p.push(delta);
    else if (delta < 0) {
      if (-delta >= cur - 1e-9) p.length = 0;          // remove all of it
      else delta = -(p.pop() || 0);                     // − takes away the last thing added
    }
    var next = p.length ? Math.round(Math.max(0, cur + delta) * 1e3) / 1e3 : 0;
    if (next === 0) { delete basket[name]; delete packs[name]; order = order.filter(function (n) { return n !== name; }); }
    else { if (!(name in basket)) order.push(name); basket[name] = next; }
    if (delta > 0) popKey++;
    updateBasket(delta > 0);
  }
  function updateBasket(pop) {
    var count = 0, total = 0;
    order.forEach(function (n) { var v = byName(n); count += addedCount(v, basket[n]); total += v.price * basket[n]; });
    // count badge (re-mounted so the pop animation replays, like React's key change)
    ['basketCount', 'basketFabCount'].forEach(function (id) {
      var old = $(id), badge = old.cloneNode(false);
      badge.className = 'grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1.5 text-xs text-accent-foreground ' + (popKey ? 'pop' : '');
      badge.textContent = count;
      if (pop || old.textContent !== badge.textContent) old.replaceWith(badge);
      $(id).hidden = count === 0; // no "0" when the basket is empty
    });

    var items = $('basketItems');
    if (!order.length) items.innerHTML = '<p class="text-muted-foreground">Your basket is empty. Add some fresh picks! 🥬</p>';
    else {
      items.innerHTML = order.map(function (n, r) {
        var v = byName(n), q = basket[n];
        return '<div class="basket-float flex items-center justify-between rounded-xl bg-card/60 p-2.5" style="animation-delay:' + (-(r * .9)) + 's" data-name="' + esc(n) + '">' +
          '<div><div class="font-semibold">' + esc(n) + '</div><div class="text-xs text-muted-foreground">' + fmtQty(v, q) + ' · ₹' + v.price + '/' + esc(v.unit) + '</div></div>' +
          '<div class="flex items-center gap-2">' +
            '<button data-b="dec" aria-label="Remove ' + esc(n) + '" class="h-7 w-7 rounded-full bg-primary/10">−</button>' +
            '<button data-b="inc" aria-label="Add more ' + esc(n) + '" class="h-7 w-7 rounded-full bg-leaf-gradient font-bold text-primary-foreground shadow-sm transition hover:shadow-md">+</button>' +
            '<span class="w-16 text-right font-semibold text-primary">' + money(v.price * q) + '</span>' +
            '<button data-b="del" aria-label="Remove ' + esc(n) + ' from basket" class="h-7 w-7 rounded-full bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-destructive-foreground">✕</button>' +
          '</div></div>';
      }).join('');
    }
    $('basketTotal').textContent = money(total);
    $('basketNote').textContent = total >= 300 ? '🎉 Free home delivery unlocked (within 3 km)' : 'Add ₹' + Math.ceil(300 - total) + ' more for free delivery';
    $('basketClear').disabled = !order.length;
    $('basketWhatsApp').disabled = !order.length;
    // basket changed: hide the number buttons so the next send uses the updated order
    if (!$('waChoices').hidden) $('waChoices').hidden = true;
    refreshCardControls();
  }
  $('basketItems').addEventListener('click', function (e) {
    var b = e.target.closest('[data-b]'); if (!b) return;
    var n = b.closest('[data-name]').dataset.name, v = byName(n);
    if (b.dataset.b === 'dec') change(n, -step(v));
    else if (b.dataset.b === 'inc') change(n, step(v));
    else change(n, -basket[n]);
  });
  $('basketClear').addEventListener('click', function () { basket = {}; packs = {}; order = []; updateBasket(false); });

  // ---------- send the basket as an order on WhatsApp ----------
  function whatsappOrderText() {
    var lines = ['Hello A2A Vegetables 👋', 'I would like to order:', ''], total = 0;
    order.forEach(function (n, i) {
      var v = byName(n), q = basket[n], cost = v.price * q;
      total += cost;
      lines.push((i + 1) + '. ' + n + ' — ' + fmtQty(v, q) + ' — ' + money(Math.round(cost * 100) / 100));
    });
    total = Math.round(total * 100) / 100;
    lines.push('', '*Total: ' + money(total) + '*');
    lines.push(total >= 300 ? '🛵 Free home delivery (within 3 km)' : '(Add ₹' + Math.ceil(300 - total) + ' more for free delivery)');
    lines.push('', '👤 Name: ' + customer.name, '📍 Place: ' + customer.place);
    return lines.join('\n');
  }
  // Customer's name and place (remembered on this device for next time)
  var CUSTOMER_KEY = 'a2a-customer';
  var customer = readJSON('localStorage', CUSTOMER_KEY) || { name: '', place: '' };
  function shopNumbers() {
    var c = window.A2A_CONFIG || {};
    var list = Array.isArray(c.whatsappNumbers) ? c.whatsappNumbers : (c.whatsappNumber ? [c.whatsappNumber] : []);
    return list.map(function (n) { return String(n).replace(/\D/g, ''); }).filter(Boolean);
  }
  function prettyNumber(n) { // 918943330616 -> +91 89433 30616
    return n.length === 12 && n.indexOf('91') === 0 ? '+91 ' + n.slice(2, 7) + ' ' + n.slice(7) : '+' + n;
  }
  function openWhatsApp(num) {
    var url = 'https://wa.me/' + num + '?text=' + encodeURIComponent(whatsappOrderText());
    var w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url; // popup blocked: open in the same tab
  }
  // Send to WhatsApp: first ask for name + place, then show the shop number button(s)
  $('basketWhatsApp').addEventListener('click', function () {
    if (!order.length) return;
    var nums = shopNumbers(), box = $('waChoices');
    if (!box.hidden) { box.hidden = true; return; }
    if (!nums.length) nums = ['']; // no number set: WhatsApp lets the customer pick the chat
    box.innerHTML =
      '<p class="wa-choices-title">Your details</p>' +
      '<input id="waName" class="wa-input" maxlength="40" autocomplete="name" placeholder="Your name" value="' + esc(customer.name) + '" aria-label="Your name">' +
      '<input id="waPlace" class="wa-input" maxlength="80" autocomplete="street-address" placeholder="Your place / address" value="' + esc(customer.place) + '" aria-label="Your place or address">' +
      '<p id="waErr" class="wa-err" aria-live="polite"></p>' +
      '<p class="wa-choices-title">Send your order to:</p>' + nums.map(function (n) {
        return '<button type="button" class="wa-choice" data-num="' + n + '"><span>📱 ' + (n ? prettyNumber(n) : 'Choose chat in WhatsApp') + '</span><span class="wa-go">Open ›</span></button>';
      }).join('');
    box.hidden = false;
    var first = !customer.name ? $('waName') : (!customer.place ? $('waPlace') : null);
    if (first) setTimeout(function () { first.focus(); }, 50);
  });
  $('waChoices').addEventListener('input', function (e) {
    if (e.target.id !== 'waName' && e.target.id !== 'waPlace') return;
    customer.name = $('waName').value; customer.place = $('waPlace').value;
    e.target.classList.remove('invalid');
    $('waErr').textContent = '';
    writeJSON('localStorage', CUSTOMER_KEY, customer);
  });
  $('waChoices').addEventListener('click', function (e) {
    var b = e.target.closest('[data-num]'); if (!b || !order.length) return;
    var nameEl = $('waName'), placeEl = $('waPlace');
    customer.name = nameEl.value.trim(); customer.place = placeEl.value.trim();
    nameEl.classList.toggle('invalid', !customer.name);
    placeEl.classList.toggle('invalid', !customer.place);
    if (!customer.name || !customer.place) {
      $('waErr').textContent = !customer.name && !customer.place ? 'Please type your name and place.' : (!customer.name ? 'Please type your name.' : 'Please type your place.');
      (!customer.name ? nameEl : placeEl).focus();
      return;
    }
    writeJSON('localStorage', CUSTOMER_KEY, customer);
    openWhatsApp(b.dataset.num);
    b.classList.add('done');
    b.querySelector('.wa-go').textContent = '✓ Opened';
  });

  var basketOpen = false, savedOv = {};
  function setBasket(open) {
    basketOpen = open;
    $('basket').classList.toggle('visible', open); $('basket').classList.toggle('invisible', !open);
    $('basketBg').classList.toggle('opacity-100', open); $('basketBg').classList.toggle('opacity-0', !open);
    $('basketPanel').classList.toggle('translate-x-0', open); $('basketPanel').classList.toggle('translate-x-[110%]', !open);
    var de = document.documentElement;
    if (open) { savedOv = { h: de.style.overflow, b: document.body.style.overflow }; de.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; document.body.dataset.basketOpen = '1'; }
    else { de.style.overflow = savedOv.h || ''; document.body.style.overflow = savedOv.b || ''; delete document.body.dataset.basketOpen; }
  }
  $('basketBtn').addEventListener('click', function () { setBasket(true); });
  $('basketFab').addEventListener('click', function () { setBasket(true); });
  $('basketClose').addEventListener('click', function () { setBasket(false); });
  $('basketBg').addEventListener('click', function () { setBasket(false); });

  // ---------- details sheet ----------
  var sheetRoot = $('sheetRoot'), sheetOv = '';
  function openSheet(v) {
    var opts = qtyOptions(v);
    var wasOpen = !!sheetVeg;
    sheetVeg = v;
    sheetQty = opts.some(function (o) { return o.qty === .25; }) ? .25 : 1;
    sheetAdded = false;
    if (!wasOpen) { sheetOv = document.body.style.overflow; document.body.style.overflow = 'hidden'; document.addEventListener('keydown', sheetKey); }
    renderSheet(true);
  }
  function closeSheet() {
    if (!sheetVeg) return;
    sheetVeg = null; clearTimeout(sheetTimer);
    document.body.style.overflow = sheetOv;
    document.removeEventListener('keydown', sheetKey);
    var w = sheetRoot.firstChild;
    if (!w) return;
    w.classList.add('is-closing'); // play the close animation, then remove
    setTimeout(function () { if (sheetRoot.firstChild === w && !sheetVeg) sheetRoot.innerHTML = ''; }, reduceMotion ? 0 : 300);
  }
  function sheetKey(e) { if (e.key === 'Escape') closeSheet(); }
  function sheetTotal() { return Math.round(sheetVeg.price * sheetQty * 100) / 100; }
  function chipClass(o) { return 'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ' + (sheetQty === o.qty ? 'scale-105 bg-primary text-primary-foreground shadow-lg' : 'glass hover:-translate-y-0.5'); }
  function addLabel() { return sheetAdded ? '✓ Added to basket' : 'Add ' + fmtQty(sheetVeg, sheetQty) + ' · ' + money(sheetTotal()); }
  function renderSheet(full) {
    var v = sheetVeg, opts = qtyOptions(v);
    if (full) {
      var catLabel = (CATS.filter(function (c) { return c.id === v.cat; })[0] || {}).label || '';
      sheetRoot.innerHTML =
        '<div class="sheet-wrap fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label="' + esc(v.name) + ' details">' +
          '<div data-s="bg" class="sheet-bg absolute inset-0 bg-forest/40 backdrop-blur-md"></div>' +
          '<div class="sheet-card sheet-in veg-sheet relative w-full max-w-3xl overflow-hidden rounded-[2rem] shadow-2xl">' +
            '<span class="sheet-grab" aria-hidden="true"></span>' +
            '<button data-s="close" aria-label="Close details" class="glass absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-sm transition hover:rotate-90 hover:scale-110">✕</button>' +
            '<div class="grid md:grid-cols-2">' +
              '<div class="sheet-img relative aspect-square bg-secondary md:aspect-auto">' +
                (v.img ? '<img src="' + esc(v.img) + '" alt="' + esc(v.name) + '" decoding="async" class="h-full w-full object-cover">' : '<div class="grid h-full place-items-center text-9xl">🥬</div>') +
                '<span class="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-primary">' + esc(catLabel) + '</span></div>' +
              '<div class="flex flex-col p-6 md:p-8">' +
                '<h2 class="font-display text-3xl font-semibold leading-tight text-forest">' + esc(v.name) + '</h2>' +
                '<p class="mt-1 text-sm text-muted-foreground">' + esc(v.local) + ' · sold by ' + (v.unit === 'kg' ? 'weight' : 'the ' + esc(v.unit)) + '</p>' +
                '<p class="mt-4 text-sm leading-relaxed text-muted-foreground">' + esc(v.desc) + '</p>' +
                '<div class="mt-5 flex items-end gap-2"><span class="font-display text-4xl font-semibold text-primary">₹' + v.price + '</span><span class="pb-1 text-sm text-muted-foreground">/ ' + esc(v.unit) + '</span></div>' +
                '<p class="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">Choose your quantity</p>' +
                '<div class="qty-chips mt-3 flex flex-wrap gap-2">' + opts.map(function (o, t) {
                  return '<span class="chip-float inline-block" style="animation-delay:' + (t * -1.1) + 's"><button data-q="' + o.qty + '" class="' + chipClass(o) + '">' + o.label + '</button></span>';
                }).join('') + '</div>' +
                '<div class="mt-5 flex items-center justify-between rounded-2xl bg-card/70 px-4 py-3"><span data-s="qtytxt" class="text-sm text-muted-foreground"></span><span data-s="total" class="font-display text-2xl font-semibold text-primary"></span></div>' +
                '<button data-s="add" class="mt-4 w-full rounded-full bg-leaf-gradient py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"></button>' +
                '<p class="mt-3 text-center text-xs text-muted-foreground">Weighed in front of you · Free delivery within 3 km above ₹300</p>' +
              '</div></div></div></div>';
      var root = sheetRoot.firstChild;
      root.addEventListener('click', function (e) {
        var s = e.target.closest('[data-s],[data-q]'); if (!s) return;
        if (s.dataset.q) { sheetQty = +s.dataset.q; sheetAdded = false; renderSheet(false); }
        else if (s.dataset.s === 'bg' || s.dataset.s === 'close') closeSheet();
        else if (s.dataset.s === 'add') {
          change(sheetVeg.name, sheetQty); sheetAdded = true; renderSheet(false);
          clearTimeout(sheetTimer); sheetTimer = setTimeout(function () { if (sheetVeg) { sheetAdded = false; renderSheet(false); } }, 1500);
        }
      });
      root.querySelector('[data-s="close"]').focus();
    }
    var r = sheetRoot.firstChild;
    r.querySelectorAll('[data-q]').forEach(function (b) { b.className = chipClass({ qty: +b.dataset.q }); });
    r.querySelector('[data-s="qtytxt"]').textContent = fmtQty(v, sheetQty) + ' at the counter';
    r.querySelector('[data-s="total"]').textContent = money(sheetTotal());
    r.querySelector('[data-s="add"]').textContent = addLabel();
  }

  function cardSig(v) { return [v.name, v.local, v.price, v.unit, v.cat, v.img ? v.img.length + ':' + v.img.slice(-24) : ''].join('|'); }

  // ---------- keep pictures saved on the device after the first load ----------
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (e) { console.warn('Picture cache unavailable:', e && e.message); });
    });
  }

  // ---------- init ----------
  $('year').textContent = new Date().getFullYear();
  renderCats();
  renderGrid();
  updateBasket(false);
  initBackend();
})();
