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

// ESCUCHAMOS EL CLICK EN EL BOTÓN CAPTURADO
buttomCotizar.addEventListener('click', ()=> {
    //CAPTURAMOS EL VALOR ACTUAL DEL SELECT
    let productoSeleccionado = listaProductos.value 

    // CAPTURAMOS EL VALOR DEL PRECIO INTRODUCIDO
    let precioSeleccionado = inputPrice.value 

    /*  // PRUEBA EN CONSOLA DE QUE TODO ESTÁ BIEN
    console.log(productoSeleccionado)
    console.log(precioSeleccionado)
    */

    //BUSCAMOS EL OBJETO EN EL ARRAY CON .FIND
    let productoEncontrado = productsBase.find(producto => producto.nombre === productoSeleccionado)

    //POR SI ACASO VALIDAMOS QUE ENCONTRÓ EL OBJETO
    if (productoEncontrado){
        let precioBase = productoEncontrado.precio

        // COMPARAMOS EL PRECIO SELECCIONADO CON EL PRECIO DEL ARRAY
        if (precioSeleccionado > precioBase){
            alert('Precio demasiado alto')
        } else {
            alert('Precio más bajo')
        }
    }
})
