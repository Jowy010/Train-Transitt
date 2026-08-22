let map;

// Inicialización del Mapa Nativo / Leaflet
function initMap() {
  // Posición inicial: Península Ibérica completa
  map = L.map('map', { zoomControl: false }).setView([40.4167, -3.7037], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Animación smooth de 2 segundos hacia el GPS del usuario
  setTimeout(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.flyTo([pos.coords.latitude, pos.coords.longitude], 13, {
            duration: 2.0
          });
        },
        (err) => {
          console.log("Acceso a GPS denegado o no disponible.");
        }
      );
    }
  }, 2000);
}

// Navegación entre pestañas
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(`tab-${tabName}`);
  const activeBtn = document.getElementById(`btn-${tabName}`);

  if (activeTab) activeTab.classList.add('active');
  if (activeBtn) activeBtn.classList.add('active');

  // Ajuste de renderizado de mapa al cambiar de vista
  if (tabName === 'mapa' && map) {
    setTimeout(() => map.invalidateSize(), 100);
  }
}

// Cerrar Bottom Sheet del Tren
function closeTrainSheet() {
  const sheet = document.getElementById('train-sheet');
  if (sheet) sheet.classList.add('hidden');
}

window.onload = initMap;
