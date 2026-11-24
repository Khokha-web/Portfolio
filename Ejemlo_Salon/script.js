// 1. Filtro por categoría de servicios
const catButtons = document.querySelectorAll(".cat-btn");
const serviceCards = document.querySelectorAll(".service-card");

catButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedCat = btn.dataset.cat;

    catButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    serviceCards.forEach((card) => {
      const cardCat = card.dataset.cat;
      const matches = selectedCat === "all" || cardCat === selectedCat;
      card.classList.toggle("hide-service", !matches);
    });
  });
});

// 2. Formulario de reserva dentro de la web
const bookingForm = document.getElementById("bookingForm");
const bookingSummary = document.getElementById("bookingSummary");
const servicioSelect = document.getElementById("servicioSelect");
const fechaInput = document.getElementById("fechaInput");

// Evitar seleccionar fechas pasadas
if (fechaInput) {
  const hoy = new Date().toISOString().split("T")[0];
  fechaInput.min = hoy;
}

// Botones "Reservar aquí" dentro de cada tarjeta de servicio
document.querySelectorAll(".book-service-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const serviceText = btn.dataset.service;
    if (servicioSelect && serviceText) {
      for (const option of servicioSelect.options) {
        if (option.value === serviceText) {
          servicioSelect.value = serviceText;
          break;
        }
      }
    }
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Mostrar resumen al confirmar la solicitud de cita
if (bookingForm && bookingSummary) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const servicio = document.getElementById("servicioSelect").value;
    const fecha = document.getElementById("fechaInput").value;
    const hora = document.getElementById("horaSelect").value;
    const nombre = document.getElementById("clienteNombre").value.trim();
    const contacto = document.getElementById("clienteContacto").value.trim();

    bookingSummary.hidden = false;
    bookingSummary.innerHTML = `
      <strong>Solicitud de reserva preparada</strong><br />
      Nombre: ${nombre} (${contacto})<br />
      Servicio: ${servicio}<br />
      Día y hora: ${fecha} · ${hora}<br />
      <span class="small-note">Tu solicitud queda registrada en esta página para confirmar la cita con el salón.</span>
    `;
  });
}

// 3. Desplazamiento suave para todos los enlaces internos (#servicios, #reservar, #ubicacion)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 4. Mapa interactivo en C. de Concepción Jerónima, 5, 28012 Madrid (adaptado a móvil)
const mapContainer = document.getElementById("salonMap");
if (mapContainer && typeof L !== "undefined") {
  const salonCoords = [40.4126, -3.7058];
  const isMobile = window.innerWidth <= 768;
  const map = L.map("salonMap", {
    dragging: !isMobile,
    tap: !isMobile
  }).setView(salonCoords, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; Contribuidores de OpenStreetMap"
  }).addTo(map);

  L.circleMarker(salonCoords, {
    radius: 9,
    fillColor: "#84cc16",
    color: "#3f6212",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.95
  })
    .addTo(map)
    .bindPopup("<strong>Brows by Assma Cosmetics</strong><br />C. de Concepción Jerónima, 5, 28012 Madrid")
    .openPopup();
}