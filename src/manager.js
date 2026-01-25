import { db } from './supabase.js';

let idAEliminar = null;
let productosActuales = []; // Guardamos los productos aquí para editarlos sin volver a llamar a la DB

const modalForm = document.getElementById('modal-form');
const formInsert = document.getElementById('form-insert');
const modalDelete = document.getElementById('modal-delete');
const modalQR = document.getElementById('modal-qr');

// DIBUJAR TABLA
function renderTable(productos) {
    productosActuales = productos; // Actualizamos la "memoria" local
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