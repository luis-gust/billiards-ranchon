import { db } from './supabase.js';
// Selecciones DOM para las secciones del menú
const tapasEl = document.getElementById('tapas');
const bebidasEl = document.getElementById('bebidas');
const postresEl = document.getElementById('postres');

function clearSection(sectionEl) {
  if (sectionEl) sectionEl.innerHTML = '';
}

function createProductElement(product) {
  const name = product.nombre || 'Sin nombre';
  const price = product.precio ? `$${product.precio}` : '';
  const description = product.descripcion || '';

  const container = document.createElement('div');
  container.className = 'producto';

  // Cambiamos el h3 para que tenga una estructura que permita los puntos
  const h3 = document.createElement('h3');
  h3.className = 'producto-cabecera'; // Nueva clase
  h3.innerHTML = `
    <span class="producto-nombre">${name}</span>
    <span class="producto-puntos"></span>
    <span class="precio">${price}</span>
  `;

  container.appendChild(h3);

  if (description) {
    const p = document.createElement('p');
    p.className = 'especificaciones';
    p.textContent = description;
    container.appendChild(p);
  }

  return container;
}

function updateSections(productos) {
  clearSection(tapasEl);
  clearSection(bebidasEl);
  clearSection(postresEl);

  const grouped = { tapas: [], bebidas: [], postres: [] };
  productos.forEach(p => {
    const tipo = p.tipo?.toLowerCase();
    if (grouped[tipo]) grouped[tipo].push(p);
  });

  Object.keys(grouped).forEach(sectionId => {
    const items = grouped[sectionId];
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl || items.length === 0) return;

    const h2 = document.createElement('h2');
    h2.className = 'title';
    h2.textContent = sectionId.toUpperCase();
    sectionEl.appendChild(h2);

    items.forEach(prod => {
      sectionEl.appendChild(createProductElement(prod));
    });
  });
}

function setupLoginModal() {
  const btnOpen = document.getElementById('btn-open-login');
  const modal = document.getElementById('modal-login');
  const loginForm = document.getElementById('login-form');
  const errorEl = document.getElementById('error_name');

  if (!btnOpen || !modal) return;

  btnOpen.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  document.querySelectorAll('#modal-login-close, #login-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
      const submitBtn = document.getElementById('login-submit');

      try {
        submitBtn.disabled = true;
        submitBtn.value = 'Iniciando...';

        await db.login(email, password);
        window.location.href = 'manager.html';
      } catch (err) {
        console.error('Error de login:', err);
        errorEl.textContent = 'Credenciales incorrectas o error de conexión.';
        errorEl.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.value = 'Iniciar Sesión';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const productos = await db.getProductos();
    updateSections(productos);

    db.onProductosChanged((nuevosProductos) => {
      updateSections(nuevosProductos);
    });

    setupLoginModal();
  } catch (err) {
    console.error('Error al inicializar:', err);
  }
});