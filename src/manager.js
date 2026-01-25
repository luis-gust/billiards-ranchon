import { db } from './supabase.js';

let idAEliminar = null;

const btnOpenAdd = document.getElementById('btn-open-add');
const modalForm = document.getElementById('modal-form');
const formInsert = document.getElementById('form-insert');
const modalDelete = document.getElementById('modal-delete');
const tablaTapas = document.querySelector('#tapas');
const tablaBebidas = document.querySelector('#bebidas');
const tablaPostres = document.querySelector('#postres');

function renderTable(productos) {
    [tablaTapas, tablaBebidas, tablaPostres].forEach(t => t.innerHTML = '');

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

        const tipo = p.tipo?.toLowerCase();
        if (tipo === 'tapas') tablaTapas.appendChild(row);
        else if (tipo === 'bebidas') tablaBebidas.appendChild(row);
        else if (tipo === 'postres') tablaPostres.appendChild(row);
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const p = productos.find(prod => String(prod.id) === String(id));
            if (p) openEditModal(p);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            idAEliminar = btn.getAttribute('data-id');
            modalDelete.style.display = 'flex';
        });
    });
}

function openEditModal(p) {
    document.getElementById('editing_id').value = p.id;
    document.getElementById('input_name').value = p.nombre;
    document.getElementById('input_des').value = p.descripcion || '';
    document.getElementById('input_pre').value = p.precio;
    document.getElementById('producto_tipo').value = p.tipo;
    document.getElementById('modal-title').textContent = 'Editar producto';
    modalForm.style.display = 'flex';
}

function setupEventListeners() {
    btnOpenAdd.addEventListener('click', () => {
        formInsert.reset();
        document.getElementById('editing_id').value = '';
        document.getElementById('modal-title').textContent = 'Agregar Producto';
        modalForm.style.display = 'flex';
    });

    document.querySelectorAll('#modal-form-close, #modal-form-cancel').forEach(btn => {
        btn.addEventListener('click', () => modalForm.style.display = 'none');
    });

    formInsert.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editing_id').value;
        const datos = {
            nombre: document.getElementById('input_name').value,
            descripcion: document.getElementById('input_des').value,
            precio: parseFloat(document.getElementById('input_pre').value),
            tipo: document.getElementById('producto_tipo').value
        };

        try {
            if (id) await db.updateProducto(id, datos);
            else await db.addProducto(datos);
            modalForm.style.display = 'none';
        } catch (err) {
            alert('Error al guardar el producto');
        }
    });

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

    // Lógica del QR
    const btnGenQR = document.getElementById('btn-gen-qr');
    const modalQR = document.getElementById('modal-qr');
    const qrContainer = document.getElementById('qrcode');

    btnGenQR.addEventListener('click', () => {
        modalQR.style.display = 'flex';
        qrContainer.innerHTML = "";
        new QRCode(qrContainer, {
            text: "https://bar-menu-ddb1b.web.app", // Actualizar con tu URL final
            width: 250, height: 250
        });
    });

    document.querySelectorAll('#modal-qr-close, #modal-qr-cancel').forEach(btn => {
        btn.addEventListener('click', () => modalQR.style.display = 'none');
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productos = await db.getProductos();
        renderTable(productos);
        db.onProductosChanged(renderTable);
        setupEventListeners();
        document.getElementById('year').textContent = new Date().getFullYear();
    } catch (err) {
        console.error('Error inicializando manager:', err);
    }
});