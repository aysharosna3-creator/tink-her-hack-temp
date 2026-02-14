/* ============================================
   FindMyBus — App Logic
   ============================================ */

// ---- Sample Data ----
const BUSES = [
  // Malappuram ↔ Kozhikode routes (Local)
  { id: 1, name: "City Liner 101", type: "local", route: "Malappuram → Kozhikode", time: "06:00 AM", date: "2026-02-14", seats: 50, rate: 45, from: "Malappuram", to: "Kozhikode" },
  { id: 2, name: "Town Shuttle 22", type: "local", route: "Malappuram → Kozhikode", time: "07:30 AM", date: "2026-02-14", seats: 48, rate: 40, from: "Malappuram", to: "Kozhikode" },
  { id: 3, name: "FastTrack Local", type: "local", route: "Malappuram → Kozhikode", time: "09:00 AM", date: "2026-02-14", seats: 52, rate: 42, from: "Malappuram", to: "Kozhikode" },
  { id: 4, name: "City Rider 35", type: "local", route: "Malappuram → Kozhikode", time: "11:00 AM", date: "2026-02-15", seats: 50, rate: 45, from: "Malappuram", to: "Kozhikode" },
  { id: 5, name: "Town Express 9", type: "local", route: "Malappuram → Kozhikode", time: "01:30 PM", date: "2026-02-15", seats: 50, rate: 40, from: "Malappuram", to: "Kozhikode" },
  { id: 6, name: "City Liner 107", type: "local", route: "Malappuram → Kozhikode", time: "04:00 PM", date: "2026-02-14", seats: 48, rate: 45, from: "Malappuram", to: "Kozhikode" },

  // Kozhikode ↔ Malappuram routes (Local)
  { id: 7, name: "Town Shuttle 44", type: "local", route: "Kozhikode → Malappuram", time: "06:30 AM", date: "2026-02-14", seats: 50, rate: 42, from: "Kozhikode", to: "Malappuram" },
  { id: 8, name: "City Rider 18", type: "local", route: "Kozhikode → Malappuram", time: "08:15 AM", date: "2026-02-15", seats: 48, rate: 40, from: "Kozhikode", to: "Malappuram" },
  { id: 9, name: "FastTrack Return", type: "local", route: "Kozhikode → Malappuram", time: "10:45 AM", date: "2026-02-14", seats: 52, rate: 45, from: "Kozhikode", to: "Malappuram" },

  // Malappuram ↔ Kozhikode (A/C)
  { id: 10, name: "ComfortLine A/C", type: "ac", route: "Malappuram → Kozhikode", time: "07:00 AM", date: "2026-02-14", seats: 36, rate: 120, from: "Malappuram", to: "Kozhikode" },
  { id: 11, name: "CoolBreeze A/C", type: "ac", route: "Malappuram → Kozhikode", time: "10:00 AM", date: "2026-02-15", seats: 36, rate: 130, from: "Malappuram", to: "Kozhikode" },
  { id: 12, name: "Royal A/C Express", type: "ac", route: "Kozhikode → Malappuram", time: "02:00 PM", date: "2026-02-14", seats: 32, rate: 125, from: "Kozhikode", to: "Malappuram" },

  // Malappuram ↔ Kozhikode (KSRTC)
  { id: 13, name: "KSRTC SuperFast", type: "ksrtc", route: "Malappuram → Kozhikode", time: "06:15 AM", date: "2026-02-14", seats: 42, rate: 65, from: "Malappuram", to: "Kozhikode" },
  { id: 14, name: "KSRTC Ordinary", type: "ksrtc", route: "Malappuram → Kozhikode", time: "08:45 AM", date: "2026-02-14", seats: 45, rate: 50, from: "Malappuram", to: "Kozhikode" },
  { id: 15, name: "KSRTC Fast Passenger", type: "ksrtc", route: "Kozhikode → Malappuram", time: "12:00 PM", date: "2026-02-15", seats: 42, rate: 55, from: "Kozhikode", to: "Malappuram" },

  // Other Kerala routes
  { id: 16, name: "KSRTC Garuda", type: "ksrtc", route: "Kochi → Trivandrum", time: "06:30 AM", date: "2026-02-14", seats: 40, rate: 350, from: "Kochi", to: "Trivandrum" },
  { id: 17, name: "GreenLine A/C", type: "ac", route: "Kochi → Trivandrum", time: "08:00 AM", date: "2026-02-14", seats: 36, rate: 480, from: "Kochi", to: "Trivandrum" },
  { id: 18, name: "KSRTC Swift", type: "ksrtc", route: "Kozhikode → Ernakulam", time: "10:30 AM", date: "2026-02-15", seats: 42, rate: 400, from: "Kozhikode", to: "Ernakulam" },
  { id: 19, name: "Express Non-AC", type: "nonac", route: "Thrissur → Palakkad", time: "09:45 AM", date: "2026-02-14", seats: 45, rate: 120, from: "Thrissur", to: "Palakkad" },
  { id: 20, name: "Metro Connect", type: "local", route: "Kochi → Alappuzha", time: "11:00 AM", date: "2026-02-14", seats: 55, rate: 80, from: "Kochi", to: "Alappuzha" },
  { id: 21, name: "Royal Cruiser A/C", type: "ac", route: "Trivandrum → Kollam", time: "02:00 PM", date: "2026-02-15", seats: 32, rate: 150, from: "Trivandrum", to: "Kollam" },
  { id: 22, name: "Town Shuttle 88", type: "nonac", route: "Malappuram → Palakkad", time: "03:30 PM", date: "2026-02-14", seats: 48, rate: 90, from: "Malappuram", to: "Palakkad" },
  { id: 23, name: "NightRider Express", type: "ac", route: "Kozhikode → Kochi", time: "09:00 PM", date: "2026-02-14", seats: 36, rate: 350, from: "Kozhikode", to: "Kochi" },
  { id: 24, name: "KSRTC Volvo", type: "ksrtc", route: "Kozhikode → Trivandrum", time: "07:00 PM", date: "2026-02-15", seats: 40, rate: 600, from: "Kozhikode", to: "Trivandrum" },
];

const FACILITIES = {
  local: ["🚌 Regular Stops", "🎵 Music", "📱 Customer Support"],
  ac: ["❄️ A/C", "📶 Free WiFi", "🔌 Charging Plug", "💧 Water Bottle", "🧻 Wipes", "📱 Customer Support", "🍔 Food Order"],
  nonac: ["💧 Water Bottle", "🎵 Music", "📱 Customer Support"],
  ksrtc: ["📶 Free WiFi", "🔌 Charging Plug", "💧 Water Bottle", "🎵 Music", "🧻 Wipes", "📱 Customer Support", "🍔 Food Order"]
};

const OFFERS = [
  { id: 1, title: "Full Day Travel Pass", desc: "Travel unlimited on all local buses for just ₹99! Valid on weekdays.", code: "FULLDAY99", type: "gold" },
  { id: 2, title: "50% Off First Ride", desc: "New users get 50% off on their first A/C bus booking. Max discount ₹200.", code: "FIRST50", type: "rose" },
  { id: 3, title: "Weekend Explorer", desc: "Flat ₹149 for any inter-city KSRTC bus on weekends. Book now!", code: "WEEKEND149", type: "mint-accent" },
  { id: 4, title: "Group Discount", desc: "Book 4+ seats together and get 25% off total fare. Perfect for families!", code: "GROUP25", type: "gold" },
  { id: 5, title: "Lucky Draw Winner", desc: "Every 100th booking wins a free round trip! Check if you're the lucky one.", code: "LUCKY100", type: "rose" }
];

// ---- Helpers ----
function saveData(key, val) {
  localStorage.setItem('fmb_' + key, JSON.stringify(val));
}
function loadData(key) {
  const v = localStorage.getItem('fmb_' + key);
  return v ? JSON.parse(v) : null;
}

function addToHistory(bus) {
  let hist = loadData('history') || [];
  hist = hist.filter(h => h.id !== bus.id);
  hist.unshift({ id: bus.id, name: bus.name, from: bus.from, to: bus.to, date: bus.date });
  if (hist.length > 5) hist = hist.slice(0, 5);
  saveData('history', hist);
}

// Helper: convert 12-hour time string to 24h minutes for comparison
function timeToMinutes(timeStr) {
  // Handles "06:30 AM", "02:00 PM" etc.
  const parts = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!parts) return 0;
  let h = parseInt(parts[1]);
  const m = parseInt(parts[2]);
  const period = parts[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

// Helper: format date from input (YYYY-MM-DD) to display format
function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
}

// ---- Page 1: Home ----
function initHomePage() {
  const searchBtn = document.getElementById('searchBtn');
  const busTypeItems = document.querySelectorAll('.bus-type-item');
  const busListEl = document.getElementById('busList');
  const noResultsEl = document.getElementById('noResults');

  // Toggle facilities
  busTypeItems.forEach(item => {
    item.addEventListener('click', () => {
      const panel = item.nextElementSibling;
      if (panel && panel.classList.contains('facilities-panel')) {
        panel.classList.toggle('open');
        item.classList.toggle('active');
      }
    });
  });

  // Render bus list
  function renderBuses(filters) {
    let filtered = BUSES;

    // Filter by bus type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(b => b.type === filters.type);
    }

    // Filter by 'from' location (case-insensitive partial match)
    if (filters.from && filters.from.trim()) {
      const fromQuery = filters.from.trim().toLowerCase();
      filtered = filtered.filter(b => b.from.toLowerCase().includes(fromQuery));
    }

    // Filter by 'to' location (case-insensitive partial match)
    if (filters.to && filters.to.trim()) {
      const toQuery = filters.to.trim().toLowerCase();
      filtered = filtered.filter(b => b.to.toLowerCase().includes(toQuery));
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter(b => b.date === filters.date);
    }

    // Filter by time (show buses at or after selected time)
    if (filters.time) {
      const [th, tm] = filters.time.split(':').map(Number);
      const filterMinutes = th * 60 + tm;
      filtered = filtered.filter(b => timeToMinutes(b.time) >= filterMinutes);
    }

    // Show/hide no-results message
    if (noResultsEl) {
      noResultsEl.style.display = filtered.length === 0 ? 'block' : 'none';
    }

    busListEl.innerHTML = filtered.map(b => `
      <div class="bus-card" data-id="${b.id}" onclick="selectBus(${b.id})">
        <div class="bus-info">
          <div class="bus-name">🚌 ${b.name}</div>
          <div class="bus-route">${b.route}</div>
          <div class="bus-route">${formatDateDisplay(b.date)}</div>
        </div>
        <div class="bus-time-badge">${b.time}</div>
      </div>
    `).join('');
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const type = document.getElementById('busType').value;
      const from = document.getElementById('fromLocation').value;
      const to = document.getElementById('toLocation').value;
      const date = document.getElementById('travelDate').value;
      const time = document.getElementById('travelTime').value;

      renderBuses({ type, from, to, date, time });
    });
  }

  // Show all buses initially
  renderBuses({ type: 'all' });
}

function selectBus(id) {
  const bus = BUSES.find(b => b.id === id);
  if (bus) {
    saveData('selectedBus', bus);
    addToHistory(bus);
    window.location.href = 'journey.html';
  }
}

// ---- Page 2: Journey ----
function initJourneyPage() {
  const bus = loadData('selectedBus');
  const busNameEl = document.getElementById('selectedBusName');
  const historyEl = document.getElementById('historyList');

  if (bus && busNameEl) {
    busNameEl.textContent = '🚌 ' + bus.name + ' — ' + bus.route;
  }

  const hist = loadData('history') || [];
  if (historyEl) {
    if (hist.length === 0) {
      historyEl.innerHTML = '<p style="font-size:13px;color:var(--text-muted)">No travel history yet.</p>';
    } else {
      historyEl.innerHTML = hist.map(h => `
        <div class="history-item">
          <div class="hi-icon">🚌</div>
          <div class="hi-details">
            <strong>${h.name}</strong><br>
            ${h.from} → ${h.to} &nbsp;·&nbsp; ${h.date}
          </div>
        </div>
      `).join('');
    }
  }
}

// ---- Page 3: Bus Time ----
function initBusTimePage() {
  const bus = loadData('selectedBus');
  const listEl = document.getElementById('timeList');
  if (!listEl) return;

  const typeBuses = bus ? BUSES.filter(b => b.type === bus.type) : BUSES;
  listEl.innerHTML = typeBuses.map(b => `
    <div class="bus-card">
      <div class="bus-info">
        <div class="bus-name">🚌 ${b.name}</div>
        <div class="bus-route">${b.route}</div>
        <div class="bus-route">${formatDateDisplay(b.date)}</div>
      </div>
      <div class="bus-time-badge">${b.time}</div>
    </div>
  `).join('');
}

// ---- Page 4: Tracking ----
function initTrackingPage() {
  const bus = loadData('selectedBus');
  const infoEl = document.getElementById('trackingInfo');
  if (bus && infoEl) {
    infoEl.innerHTML = `<strong>${bus.name}</strong> &nbsp;·&nbsp; ${bus.from} → ${bus.to}`;
  }

  // Initialize map with Leaflet
  if (typeof L !== 'undefined') {
    const map = L.map('map').setView([10.8505, 76.2711], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Bus location marker
    const busIcon = L.divIcon({
      html: '<div style="font-size:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">📍</div>',
      iconSize: [30, 30],
      className: ''
    });
    L.marker([10.9, 76.25], { icon: busIcon }).addTo(map)
      .bindPopup('🚌 Bus is here!');

    // Bus stops
    const stops = [
      [10.53, 76.21, "Stop 1 – Thrissur"],
      [10.69, 76.32, "Stop 2 – Palakkad Jn"],
      [10.79, 76.28, "Stop 3 – Ottapalam"],
      [10.95, 76.24, "Stop 4 – Shoranur"],
      [11.07, 76.07, "Stop 5 – Kozhikode"]
    ];
    const stopIcon = L.divIcon({
      html: '<div style="width:12px;height:12px;background:#7c6bc4;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.2)"></div>',
      iconSize: [12, 12],
      className: ''
    });
    stops.forEach(s => {
      L.marker([s[0], s[1]], { icon: stopIcon }).addTo(map).bindPopup(s[2]);
    });

    // Route line
    L.polyline(stops.map(s => [s[0], s[1]]), {
      color: '#7c6bc4', weight: 3, opacity: 0.6, dashArray: '8,8'
    }).addTo(map);
  }
}

// ---- Page 5: Seats ----
function initSeatsPage() {
  const bus = loadData('selectedBus');
  const gridEl = document.getElementById('seatGrid');
  const busInfoEl = document.getElementById('seatBusInfo');
  const countEl = document.getElementById('selectedCount');

  if (!gridEl) return;

  const totalSeats = bus ? bus.seats : 40;
  if (bus && busInfoEl) {
    busInfoEl.textContent = bus.name + ' — ' + bus.route;
  }

  // randomly mark some as booked
  const bookedSeats = new Set();
  const numBooked = Math.floor(totalSeats * 0.35);
  while (bookedSeats.size < numBooked) {
    bookedSeats.add(Math.floor(Math.random() * totalSeats) + 1);
  }

  const selectedSeats = new Set();

  // Render seats in rows of 5 (2 + aisle + 3 pattern simplified to 5 cols)
  let html = '';
  for (let i = 1; i <= totalSeats; i++) {
    const isBooked = bookedSeats.has(i);
    const cls = isBooked ? 'seat booked' : 'seat';

    // Insert aisle after 2nd seat of each row
    if ((i - 1) % 5 === 2) {
      // skip — this IS the aisle column (handled by grid)
    }

    html += `<div class="${cls}" data-seat="${i}" ${isBooked ? '' : `onclick="toggleSeat(${i})"`}>${i}</div>`;
  }
  gridEl.innerHTML = html;

  window.toggleSeat = function (num) {
    const el = gridEl.querySelector(`[data-seat="${num}"]`);
    if (!el || el.classList.contains('booked')) return;
    if (selectedSeats.has(num)) {
      selectedSeats.delete(num);
      el.classList.remove('selected');
    } else {
      selectedSeats.add(num);
      el.classList.add('selected');
    }
    if (countEl) countEl.textContent = selectedSeats.size;
    saveData('selectedSeats', [...selectedSeats]);
  };
}

// ---- Page 6: Support ----
function initSupportPage() {
  // Static page, no special logic needed
}

// ---- Page 7: Ticket Booking ----
function initTicketPage() {
  const bus = loadData('selectedBus');
  const rateEl = document.getElementById('ticketRate');
  const payBtns = document.querySelectorAll('.payment-toggle button');
  const confirmBtn = document.getElementById('confirmTicket');

  if (bus) {
    if (rateEl) rateEl.textContent = '₹' + bus.rate;
    const fromEl = document.getElementById('tFrom');
    const toEl = document.getElementById('tTo');
    const busTypeEl = document.getElementById('tBusType');
    const timeEl = document.getElementById('tTime');
    if (fromEl) fromEl.value = bus.from;
    if (toEl) toEl.value = bus.to;
    if (busTypeEl) busTypeEl.value = bus.type;
    if (timeEl) timeEl.value = bus.time;
  }

  // Payment toggle
  payBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      payBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveData('paymentMode', btn.dataset.mode);
    });
  });

  // Confirm
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const date = document.getElementById('tDate')?.value;
      const from = document.getElementById('tFrom')?.value;
      const to = document.getElementById('tTo')?.value;

      if (!date || !from || !to) {
        alert('Please fill all fields!');
        return;
      }

      saveData('ticket', {
        date, from, to,
        busType: document.getElementById('tBusType')?.value,
        time: document.getElementById('tTime')?.value,
        rate: bus ? bus.rate : 0,
        payment: loadData('paymentMode') || 'online',
        busName: bus ? bus.name : 'Unknown'
      });

      window.location.href = 'confirmation.html';
    });
  }
}

// ---- Page 8: Offers ----
function initOffersPage() {
  const listEl = document.getElementById('offersList');
  if (!listEl) return;

  listEl.innerHTML = OFFERS.map(o => `
    <div class="offer-card ${o.type}">
      <div class="offer-badge">${o.type === 'gold' ? '⭐ Special' : o.type === 'rose' ? '🎉 New' : '🌿 Green'}</div>
      <div class="offer-title">${o.title}</div>
      <div class="offer-desc">${o.desc}</div>
      <div class="offer-code">${o.code}</div>
    </div>
  `).join('');
}

// ---- Page 9: Confirmation ----
function initConfirmPage() {
  const ticket = loadData('ticket');
  const bus = loadData('selectedBus');
  const seats = loadData('selectedSeats');
  const tableEl = document.getElementById('summaryBody');

  if (!tableEl) return;

  const rows = [
    ['Bus', bus ? bus.name : '—'],
    ['Route', ticket ? ticket.from + ' → ' + ticket.to : '—'],
    ['Date', ticket ? ticket.date : '—'],
    ['Time', ticket ? ticket.time : '—'],
    ['Seats', seats && seats.length ? seats.join(', ') : 'Not selected'],
    ['Fare', ticket ? '₹' + ticket.rate : '—'],
    ['Payment', ticket ? (ticket.payment === 'online' ? '💳 Online' : '💵 Offline') : '—']
  ];

  tableEl.innerHTML = rows.map(r => `
    <tr><td>${r[0]}</td><td>${r[1]}</td></tr>
  `).join('');

  // Animated confetti-like particles
  createParticles();
}

function createParticles() {
  const container = document.querySelector('.confirm-page');
  if (!container) return;
  const colors = ['#c9b8e8', '#f2c6d0', '#b5e8d5', '#fdd9b5', '#b3d9f2', '#fce9a6'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed;width:8px;height:8px;border-radius:50%;
      background:${colors[i % colors.length]};
      left:${Math.random() * 100}%;top:-10px;
      opacity:0.7;z-index:0;pointer-events:none;
      animation:confettiFall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s infinite;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      @keyframes confettiFall {
        0% { transform:translateY(-10px) rotate(0deg); opacity:0.8; }
        100% { transform:translateY(100vh) rotate(720deg); opacity:0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ---- Router (Auto-init based on page) ----
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  switch (page) {
    case 'home': initHomePage(); break;
    case 'journey': initJourneyPage(); break;
    case 'bustime': initBusTimePage(); break;
    case 'tracking': initTrackingPage(); break;
    case 'seats': initSeatsPage(); break;
    case 'support': initSupportPage(); break;
    case 'ticket': initTicketPage(); break;
    case 'offers': initOffersPage(); break;
    case 'confirm': initConfirmPage(); break;
  }
});
