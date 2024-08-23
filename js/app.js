// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    cargarPlatillos();
    actualizarResumenCarrito();
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const platillos = [
    { id: 1, nombre: 'Salmon Sushi Roll', descripcion: 'Delicioso sushi con aguacate y salmón', precio: 120, imagenUrl: 'img/sushi 1.jpg' },
    { id: 2, nombre: 'Clasic Sushi Roll', descripcion: 'Rollo de sushi con atún y pepino', precio: 150, imagenUrl: 'img/sushi 2.jpg' },
    { id: 3, nombre: 'Mix Sushi Roll', descripcion: 'Combinacion de sushi Mango y aguacate', precio: 130, imagenUrl: 'img/sushi 3.jpg' },

    { id: 4, nombre: 'Tempura Mix', descripcion: 'Deliciosa combinacion con 4 tipos de Tempura', precio: 160, imagenUrl: 'img/tempura 1.jpg' },
    { id: 5, nombre: 'Full Tempura ', descripcion: 'Prueba todas nuestras recetas de tempura', precio: 280, imagenUrl: 'img/tempura 2.jpg' },
    { id: 6, nombre: 'Camaron tempura', descripcion: 'Brochetas de camaron tempura', precio: 100, imagenUrl: 'img/tempura 3.jpg' },

    { id: 7, nombre: 'Mexican Ramen', descripcion: 'Delicioso ramen Picante, inspirado en la gastronomia mexicana', precio: 240, imagenUrl: 'img/ramen 1.jpg' },
    { id: 8, nombre: 'Ramen de pollo ', descripcion: 'Ramen de pollo, Lechuga y huevo', precio: 210, imagenUrl: 'img/ramen 2.jpg' },
    { id: 9, nombre: 'Ramen de res', descripcion: 'Ramen de res, huevo y nudles', precio: 260, imagenUrl: 'img/ramen 3.jpg' }
    
];

function cargarPlatillos() {
    const platillosContainer = document.getElementById('platillos-container');
    platillos.forEach(platillo => {
        const platilloDiv = document.createElement('div');
        platilloDiv.className = 'platillo';
        
        const img = document.createElement('img');
        img.src = platillo.imagenUrl;
        img.alt = platillo.nombre;
        
        const nombre = document.createElement('h3');
        nombre.textContent = platillo.nombre;
        
        const descripcion = document.createElement('p');
        descripcion.textContent = platillo.descripcion;
        
        const precio = document.createElement('p');
        precio.textContent = `$${platillo.precio.toFixed(2)}`;
        
        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.min = '1';
        cantidadInput.value = '1';
        cantidadInput.className = 'cantidad-input';
        cantidadInput.setAttribute('data-id', platillo.id);

        const addButton = document.createElement('button');
        addButton.textContent = 'Añadir al carrito';
        addButton.className = 'add-to-cart';
        addButton.setAttribute('data-id', platillo.id);
        addButton.addEventListener('click', agregarAlCarrito);
        
        platilloDiv.appendChild(img);
        platilloDiv.appendChild(nombre);
        platilloDiv.appendChild(descripcion);
        platilloDiv.appendChild(precio);
        platilloDiv.appendChild(cantidadInput);
        platilloDiv.appendChild(addButton);
        
        platillosContainer.appendChild(platilloDiv);
    });
}

function agregarAlCarrito(event) {
    const platilloId = event.target.getAttribute('data-id');
    const cantidadInput = document.querySelector(`input[data-id='${platilloId}']`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        const platillo = platillos.find(p => p.id == platilloId);
        const itemEnCarrito = carrito.find(item => item.id === platillo.id);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...platillo, cantidad: cantidad });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarResumenCarrito();
        mostrarConfirmacion(platillo.nombre);
    } else {
        alert('Por favor, ingrese una cantidad válida.');
    }
}

function actualizarResumenCarrito() {
    const cantidadProductosElement = document.getElementById('cantidad-productos');
    const totalPagarElement = document.getElementById('total-pagar');

    const cantidadProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    cantidadProductosElement.textContent = cantidadProductos;
    totalPagarElement.textContent = totalPagar.toFixed(2);
}

function mostrarConfirmacion(nombrePlatillo) {
    const confirmacion = document.createElement('div');
    confirmacion.className = 'confirmacion';
    confirmacion.textContent = `${nombrePlatillo} añadido al carrito`;

    document.body.appendChild(confirmacion);

    setTimeout(() => {
        confirmacion.remove();
    }, 2000);
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
