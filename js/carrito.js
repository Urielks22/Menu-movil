document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    document.getElementById('regresar-menu').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('confirmar-compra').addEventListener('click', () => {
        confirmarCompra();
    });
});

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    const totalCarritoElement = document.getElementById('total-carrito');

    carritoContainer.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const carritoItem = document.createElement('div');
        carritoItem.className = 'carrito-item';

        const imagen = document.createElement('img');
        imagen.src = item.imagenUrl;
        imagen.alt = item.nombre;
        imagen.style.width = '100px';
        imagen.style.marginBottom = '10px';

        const nombre = document.createElement('h3');
        nombre.textContent = item.nombre;

        const cantidad = document.createElement('input');
        cantidad.type = 'number';
        cantidad.min = '1';
        cantidad.value = item.cantidad;
        cantidad.className = 'cantidad-input-carrito';
        cantidad.addEventListener('change', () => modificarCantidad(index, cantidad.value));

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${item.precio.toFixed(2)}`;

        const subtotal = document.createElement('p');
        subtotal.textContent = `Subtotal: $${(item.precio * item.cantidad).toFixed(2)}`;

        carritoItem.appendChild(imagen);
        carritoItem.appendChild(nombre);
        carritoItem.appendChild(cantidad);
        carritoItem.appendChild(precio);
        carritoItem.appendChild(subtotal);

        // Mostrar el botón "Eliminar" solo si la cantidad es 1
        if (item.cantidad === 1) {
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.className = 'eliminar-item';
            eliminarBtn.addEventListener('click', () => eliminarProducto(index));
            carritoItem.appendChild(eliminarBtn);
        }

        carritoContainer.appendChild(carritoItem);

        total += item.precio * item.cantidad;
    });

    // Si el carrito está vacío, establecer el total en 0.00
    if (carrito.length === 0) {
        carritoContainer.innerHTML = `<p>Tu carrito está vacío, regresa al menú para añadir platillos.</p>`;
        totalCarritoElement.textContent = '0.00';
    } else {
        totalCarritoElement.textContent = total.toFixed(2);
    }
}





function modificarCantidad(index, nuevaCantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarResumenCarrito();
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarResumenCarrito();
}

function confirmarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length > 0) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
        actualizarResumenCarrito();

        // Mostrar alerta de confirmación
        alert('Su pedido está en camino');
    } else {
        alert('El carrito está vacío.');
    }
}

function actualizarResumenCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadProductosElement = document.getElementById('cantidad-productos');
    const totalPagarElement = document.getElementById('total-pagar');

    if (cantidadProductosElement && totalPagarElement) {
        const cantidadProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const totalPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        cantidadProductosElement.textContent = cantidadProductos;
        totalPagarElement.textContent = totalPagar.toFixed(2);
    } else {
        console.error('Elementos de resumen no encontrados en el DOM.');
    }
}

document.getElementById('navbar-toggle').addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('show');
    document.getElementById('close-navbar').style.display = 'block';
    this.style.display = 'none';
});

document.getElementById('close-navbar').addEventListener('click', function() {
    document.getElementById('navbar').classList.remove('show');
    document.getElementById('navbar-toggle').style.display = 'block';
    this.style.display = 'none';
});
