import { db } from './supabase.js';

let idAEliminar = null;
let productosActuales = []; // Guardamos los productos aquí para editarlos sin volver a llamar a la DB

const modalForm = document.getElementById('modal-form');
const formInsert = document.getElementById('form-insert');
const modalDelete = document.getElementById('modal-delete');
const modalQR = document.getElementById('modal-qr');

// DIBUJAR TABLA
function renderTable(productos) {
    productosActuales = productos;
    const tablas = {
        tapas: document.querySelector('#tapas'),
        bebidas: document.querySelector('#bebidas'),
        postres: document.querySelector('#postres')
    };

    Object.values(tablas).forEach(t => { if(t) t.innerHTML = ''; });

    productos.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.descripcion || '-'}</td>
            <td>$${p.precio}</td>
            <td style="text-transform: capitalize;">${p.tipo}</td>
            <td>
                <button class="btn-action btn-edit" data-id="${p.id}"><img src="img/pen-2-svgrepo-com.svg" width="18"></button>
                <button class="btn-action btn-delete" data-id="${p.id}"><img src="img/eraser-svgrepo-com.svg" width="18"></button>
            </td>
        `;
        const tipo = p.tipo?.toLowerCase().trim();
        if (tablas[tipo]) tablas[tipo].appendChild(row);
        statsConteoCategorias();
        statsRangoPrecios();
        statsCalidadDescripciones();
        statsAsequibilidad();
        statsPalabrasClave();
    });
}

function setupEventListeners() {
    // BOTÓN AGREGAR (NUEVO)
    document.getElementById('btn-open-add').addEventListener('click', () => {
        formInsert.reset();
        document.getElementById('editing_id').value = '';
        document.getElementById('modal-title').innerText = 'Agregar Producto';
        modalForm.style.display = 'flex';
    });

    // CERRAR TODOS LOS MODALES
    document.querySelectorAll('#modal-form-close, #btn-cancel-form, #modal-qr-close, #btn-close-qr, #btn-cancel-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            modalForm.style.display = 'none';
            modalDelete.style.display = 'none';
            modalQR.style.display = 'none';
        });
    });

    // GUARDAR O ACTUALIZAR
    formInsert.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editing_id').value;
        const producto = {
            nombre: formInsert.nombre.value,
            descripcion: formInsert.descripcion.value,
            precio: parseFloat(formInsert.precio.value),
            tipo: formInsert.tipo.value
        };

        try {
            if (id) {
                await db.updateProducto(id, producto);
            } else {
                await db.addProducto(producto);
            }
            modalForm.style.display = 'none';
        } catch (err) {
            alert('Error al guardar datos.');
        }
    });

    // CLICS DENTRO DE LA TABLA (EDITAR Y ELIMINAR)
    document.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnDelete = e.target.closest('.btn-delete');

        if (btnEdit) {
            const id = btnEdit.dataset.id;
            const p = productosActuales.find(prod => prod.id == id);
            if (p) {
                document.getElementById('editing_id').value = p.id;
                formInsert.nombre.value = p.nombre;
                formInsert.descripcion.value = p.descripcion || '';
                formInsert.precio.value = p.precio;
                formInsert.tipo.value = p.tipo;
                document.getElementById('modal-title').innerText = 'Editar Producto';
                modalForm.style.display = 'flex';
            }
        }

        if (btnDelete) {
            idAEliminar = btnDelete.dataset.id;
            modalDelete.style.display = 'flex';
        }
    });

    // ELIMINAR DEFINITIVO
    document.getElementById('modal-delete-confirm').addEventListener('click', async () => {
        if (idAEliminar) {
            await db.deleteProducto(idAEliminar);
            modalDelete.style.display = 'none';
        }
    });

    // GENERAR QR
    document.getElementById('btn-gen-qr').addEventListener('click', () => {
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = "";
        modalQR.style.display = 'flex';
        new QRCode(qrContainer, {
            text: "https://luis-gust.github.io/billiards-ranchon/",
            width: 250,
            height: 250
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productos = await db.getProductos();
        renderTable(productos);
        db.onProductosChanged(renderTable); // Escuchar cambios en tiempo real
        setupEventListeners();
    } catch (err) {
        console.error("Error:", err);
    }
});

function statsConteoCategorias() {
    const conteo = { tapas: 0, bebidas: 0, postres: 0 };
    productosActuales.forEach(p => {
        const tipo = p.tipo?.toLowerCase();
        if (conteo.hasOwnProperty(tipo)) conteo[tipo]++;
    });

    document.getElementById('stat-conteo').innerHTML = `
        <div class="stat-card"><span>Tapas:</span> <strong>${conteo.tapas}</strong></div>
        <div class="stat-card"><span>Bebidas:</span> <strong>${conteo.bebidas}</strong></div>
        <div class="stat-card"><span>Postres:</span> <strong>${conteo.postres}</strong></div>
    `;
}

function statsRangoPrecios() {
    const precios = productosActuales.map(p => parseFloat(p.precio));
    const max = Math.max(...precios);
    const min = Math.min(...precios);
    const avg = precios.reduce((a, b) => a + b, 0) / precios.length;

    document.getElementById('stat-precios').innerHTML = `
        <div class="stat-card"><span>Máximo:</span> <strong>$${max.toFixed(2)}</strong></div>
        <div class="stat-card"><span>Mínimo:</span> <strong>$${min.toFixed(2)}</strong></div>
        <div class="stat-card"><span>Promedio:</span> <strong>$${avg.toFixed(2)}</strong></div>
    `;
}

function statsCalidadDescripciones() {
    const total = productosActuales.length;
    const conDesc = productosActuales.filter(p => p.descripcion && p.descripcion.trim() !== "").length;
    const porcentaje = ((conDesc / total) * 100).toFixed(0);

    document.getElementById('stat-calidad').innerHTML = `
        <div class="stat-progress-bar">
            <div class="progress" style="width: ${porcentaje}%"></div>
        </div>
        <p>${porcentaje}% de productos tienen descripción completa.</p>
    `;
}

function statsAsequibilidad() {
    const rangos = { economico: 0, medio: 0, premium: 0 };
    productosActuales.forEach(p => {
        const precio = parseFloat(p.precio);
        if (precio < 500) rangos.economico++;
        else if (precio <= 1000) rangos.medio++;
        else rangos.premium++;
    });

    document.getElementById('stat-asequibilidad').innerHTML = `
        <ul class="stat-list">
            <li>Económicos : <strong>${rangos.economico}</strong></li>
            <li>Medios : <strong>${rangos.medio}</strong></li>
            <li>Premium : <strong>${rangos.premium}</strong></li>
        </ul>
    `;
}

function statsPalabrasClave() {
    const palabrasInteres = ["fresco", "cubano", "casero", "picante", "frío", "especial"];
    const resultados = {};

    palabrasInteres.forEach(palabra => {
        const count = productosActuales.filter(p =>
            p.descripcion?.toLowerCase().includes(palabra) ||
            p.nombre?.toLowerCase().includes(palabra)
        ).length;
        if(count > 0) resultados[palabra] = count;
    });

    let html = '<div class="tags-container">';
    for (const [word, count] of Object.entries(resultados)) {
        html += `<span class="tag">${word} (${count})</span>`;
    }
    html += '</div>';
    document.getElementById('stat-keywords').innerHTML = html;
}