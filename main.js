const menuBtn = document.querySelector('.menu-nav')
const navLista = document.querySelector('.container-nav_lista')

menuBtn.addEventListener('click',()=>{

    navLista.classList.toggle('isActive')
    // Verificamos el texto actual del botón para alternarlo
    if (menuBtn.textContent === '=') {
        menuBtn.textContent = 'x';
    } else {
        menuBtn.textContent = '=';
    }
})