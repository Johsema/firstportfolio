const menuBtn = document.querySelector('.menu-nav')
const navLista = document.querySelector('.container-nav_lista')

menuBtn.addEventListener('click',()=>{
    navLista.classList.toggle('isActive')
})