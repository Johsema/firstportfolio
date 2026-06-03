class ValidadorPrecios {
    // 1. Propiedad PRIVADA (Encapsulamiento). Nadie fuera de esta clase puede modificar este array.
    #baseDatos;

    constructor() {
        this.#baseDatos = [
            { nombre: 'pollo', precio: 35 },
            { nombre: 'carne', precio: 50 },
            { nombre: 'chuletaRes', precio: 45 },
            { nombre: 'chuletaChancho', precio: 30 },
        ];
    }

    // 2. Método público para hacer la lógica de comparación
    comparar(nombreProducto, precioUsuario) {
        const producto = this.#baseDatos.find(p => p.nombre === nombreProducto);
        
        if (!producto) return 'Producto no encontrado ❌';
        
        if (precioUsuario > producto.precio) {
            return 'Precio demasiado alto 📈';
        } else if (precioUsuario < producto.precio) {
            return 'Precio más bajo ✨';
        } else {
            return '¡Es el precio estándar! ⚖️';
        }
    }
}

// ========================================================
// INSTANCIACIÓN Y CONTROL DEL DOM (Tu lógica de interfaz)
// ========================================================

// Creamos el objeto validador de forma segura
const cotizadorCore = new ValidadorPrecios();

const listaProductos = document.getElementById('productos');
const inputPrice = document.getElementById('input-price');
const buttomCotizar = document.getElementById('btn-cotizar');
const modal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');


// ESCUDO EN VIVO: Bloquea letras y símbolos en la computadora en tiempo real
inputPrice.addEventListener('input', (e) => {
    // Reemplaza cualquier caracter que NO sea un número o un punto decimal por nada ''
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Evita que el usuario escriba más de un punto decimal por error (ej: 35.5.5)
    const puntos = e.target.value.split('.').length - 1;
    if (puntos > 1) {
        e.target.value = e.target.value.slice(0, -1);
    }
});


// Escuchador del botón Cotizar
buttomCotizar.addEventListener('click', () => {
    const productoSeleccionado = listaProductos.value;
    const precioSeleccionado = Number(inputPrice.value);

    // Primera barrera de validación (Inputs)
    if (inputPrice.value.trim() === "" || isNaN(precioSeleccionado) || precioSeleccionado <= 0) {
        modalMessage.textContent = 'Por favor, introduce un precio numérico válido. ✍️';
        modal.classList.add('show');
        return; // Detiene la ejecución aquí si está mal
    }

    // Usamos el método encapsulado de nuestra clase para obtener el veredicto
    const resultado = cotizadorCore.comparar(productoSeleccionado, precioSeleccionado);
    
    // Mostramos el resultado en la interfaz
    modalMessage.textContent = resultado;
    modal.classList.add('show');
});

// Escuchador para cerrar la modal (Se queda afuera para cuidar la memoria)
modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    inputPrice.value = "";
});
