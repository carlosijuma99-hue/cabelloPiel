// Animación suave al hacer clic en botones
const botones = document.querySelectorAll("button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    boton.classList.add("animar");

    // Remueve la animación después de 300ms
    setTimeout(() => {
      boton.classList.remove("animar");
    }, 300);
  });
});

// Añadir efecto de pulsación a enlaces con clase btn-mas
document.querySelectorAll('.btn-mas').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.add('animar');
    setTimeout(() => el.classList.remove('animar'), 250);
  });
});


// Efecto simple de fade-in al hacer scroll para las tarjetas
const tarjetas = document.querySelectorAll('.card-servicio');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

tarjetas.forEach(t => observer.observe(t));

// Cargar servicios desde JSON y generar tarjetas dinámicamente
fetch("servicios.json")
  .then(response => response.json())
  .then(servicios => {
    const contenedor = document.getElementById("lista-servicios");

    servicios.forEach(servicio => {
      const card = document.createElement("article");
      card.classList.add("card-servicio");

      card.innerHTML = `
        <img src="img/${servicio.imagen}" alt="${servicio.titulo}" loading="lazy">
        <div class="card-body">
          <h3>${servicio.titulo}</h3>
          <p>${servicio.descripcion}</p>
          <p class="precio">Desde S/${servicio.precio}</p>
        </div>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => console.error("Error cargando servicios:", error));
