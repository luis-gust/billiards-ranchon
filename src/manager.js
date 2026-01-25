import { db } from './supabase.js';

let idAEliminar = null;

// Elementos del DOM
const btnOpenAdd = document.getElementById('btn-open-add');
const modalForm = document.getElementById('modal-form');
const formInsert = document.getElementById('form-insert');
const modalDelete = document.getElementById('modal-delete');
const tablaTapas = document.querySelector('#tapas');
const tablaBebidas = document.querySelector('#bebidas');
const tablaPostres = document.querySelector('#postres');

function renderTable(productos) {
    // Limpiar tablas
    [tablaTapas, tablaBebidas, tablaPostres].forEach(t => {
        if (t) t.innerHTML = '';
    });

    productos.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.descripcion || '-'}</td>
            <td>$${p.precio}</td>
            <td>${p.tipo}</td>
            <td>
                <button class="btn-action btn-edit" data-id="${p.id}" title="Editar">
                    <img src="img/pen-2-svgrepo-com.svg" width="20" height="20">
                </button>
                <button class="btn-action btn-delete" data-id="${p.id}" title="Eliminar">
                    <img src="img/eraser-svgrepo-com.svg" width="20" height="20">
                </button>
            </td>
        `;

        const tipo = p.tipo?.toLowerCase().trim();
        if (tipo === 'tapas') tablaTapas.appendChild(row);
        else if (tipo === 'bebidas') tablaBebidas.appendChild(row);
        else if (tipo === 'postres') tablaPostres.appendChild(row);
    });
}

function setupEventListeners() {
    // ABRIR FORMULARIO (Agregar)
    btnOpenAdd.addEventListener('click', () => {
        formInsert.reset();
        document.getElementById('editing_id').value = '';
        document.getElementById('modal-title').innerText = 'Agregar Producto';
        modalForm.style.display = 'flex';
    });

    // CERRAR FORMULARIO (Botón X y Cancelar)
    document.querySelectorAll('#modal-form-close, #btn-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            modalForm.style.display = 'none';
        });
    });

    // GUARDAR / EDITAR PRODUCTO
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
            formInsert.reset();
        } catch (err) {
            alert('Error al guardar el producto');
        }
    });

    // CLIC EN TABLA (Editar o Eliminar)
    document.body.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnDelete = e.target.closest('.btn-delete');

        if (btnEdit) {
            const id = btnEdit.dataset.id;
            // Aquí deberías buscar el producto en tu estado actual para rellenar el form
            // Por brevedad, este es el trigger para abrir el modal:
            document.getElementById('editing_id').value = id;
            document.getElementById('modal-title').innerText = 'Editar Producto';
            modalForm.style.display = 'flex';
        }

        if (btnDelete) {
            idAEliminar = btnDelete.dataset.id;
            modalDelete.style.display = 'flex';
        }
    });

    // ELIMINAR (Confirmar y Cancelar)
    document.getElementById('modal-delete-confirm').addEventListener('click', async () => {
        if (idAEliminar) {
            try {
                await db.deleteProducto(idAEliminar);
                modalDelete.style.display = 'none';
                idAEliminar = null;
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    });

    document.getElementById('modal-delete-cancel').addEventListener('click', () => {
        modalDelete.style.display = 'none';
        idAEliminar = null;
    });

    // LÓGICA DEL QR
    const btnGenQR = document.getElementById('btn-gen-qr');
    const modalQR = document.getElementById('modal-qr');
    const qrContainer = document.getElementById('qrcode');

    if (btnGenQR) {
        btnGenQR.addEventListener('click', () => {
            modalQR.style.display = 'flex';
            qrContainer.innerHTML = "";
            new QRCode(qrContainer, {
                text: "https://luis-gust.github.io/billiards-ranchon/",
                width: 250,
                height: 250
            });
        });
    }

    // CERRAR QR
    document.querySelectorAll('#modal-qr-close, #modal-qr-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            modalQR.style.display = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productos = await db.getProductos();
        renderTable(productos);
        db.onProductosChanged(renderTable);
        setupEventListeners();
    } catch (err) {
        console.error('Error al cargar manager:', err);
    }
});