let productsBase = [
    {nombre: 'pollo', precio:35},
    {nombre: 'carne', precio:50},
    {nombre:'chuletaRes', precio: 45},
    {nombre:'chuletaChancho', precio:30},
]

/*
1. La lógica que yo tenía era capturar el click en cada option, pero el elemento que tendrá el value sin importar que opción elijamos, es el select, entonces nos interesa capturar el valor que obtenga el select. 
2. También, el addEventListener que debemos capturar es el del botón cotizar, ya que hasta ese punto, hemos seleccionado los valores que queremos. 
3. JavasCript puede agarrar automáticamente el valor de cada etiqueta, por esa razón cada option tiene como value, el mismo nombre que el array.
*/


let listaProductos = document.getElementById('productos') 
let inputPrice = document.getElementById('input-price')
let buttomCotizar = document.getElementById('btn-cotizar')

// 2. NUEVO: Capturamos los elementos de nuestra ventana modal personalizada
const modal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

// ESCUCHAMOS EL CLICK EN EL BOTÓN CAPTURADO
buttomCotizar.addEventListener('click', ()=> {
    //CAPTURAMOS EL VALOR ACTUAL DEL SELECT
    let productoSeleccionado = listaProductos.value 

    // CAPTURAMOS EL VALOR DEL PRECIO INTRODUCIDO
    let precioSeleccionado = Number(inputPrice.value)

    /*  // PRUEBA EN CONSOLA DE QUE TODO ESTÁ BIEN
    console.log(productoSeleccionado)
    console.log(precioSeleccionado)
    */

    //BUSCAMOS EL OBJETO EN EL ARRAY CON .FIND
    let productoEncontrado = productsBase.find(producto => producto.nombre === productoSeleccionado)

    //PRIMERA BARRERA
    if (inputPrice.value.trim() === "" || isNaN(precioSeleccionado) || precioSeleccionado <= 0){
        modalMessage.textContent = 'Por favor, introduce un precio numérico válido. ✍️';
        modal.classList.add('show');

        
    } else if (productoEncontrado){
        let precioBase = productoEncontrado.precio
        let mensajeResultado = "";
        // COMPARAMOS EL PRECIO SELECCIONADO CON EL PRECIO DEL ARRAY
        if (precioSeleccionado > precioBase){
            mensajeResultado = 'Precio demasiado alto 📈';
        } else if (precioSeleccionado < precioBase) {
            mensajeResultado = 'Precio más bajo ✨';
        } else {
            mensajeResultado = '¡Es el precio estándar! ⚖️';
        }
        // REEMPLAZO DE LOS ALERT: Inyectamos el resultado en la modal y la mostramos
        modalMessage.textContent = mensajeResultado;
        modal.classList.add('show');
    }

    // 3. NUEVO: Escuchamos el clic en el botón "Aceptar" para cerrar la modal
    modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    inputPrice.value = ""; // Limpiamos el input para una nueva cotización (Opcional)
})

})
