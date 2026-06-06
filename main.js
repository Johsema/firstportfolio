const menuBtn = document.querySelector('.menu-nav')
const navLista = document.querySelector('.container-nav_lista')
/*Variables de las tarjetas de los lenguajes utilizados */
const cardContainer = document.querySelector('.program-container')
const languageTitle = document.getElementById('language-tittle'); // Mantiene tu id del HTML
const languageDescription = document.getElementById('language-description');
/*Variables de la ventana de información que surgirá al apretar un lenguaje */
const modalOverlay = document.getElementById('modal-overlay'); // Selecciona el fondo oscuro
const closeModalBtn = document.getElementById('close-modal-btn'); // Botón X


// Diccionario con la información de cada lenguaje
const descriptions ={ 
    'card-html': {
        title: '¿Qué es HTML?',
        text: 'Es el Esqueleto. HyperText Markup Language (Lenguaje de Marcado de Hipertexto) se encarga de definir la estructura básica de una página web, como el texto, las imágenes y los enlaces.'
    },
    'card-css': {
        title: '¿Qué es CSS?',
        text: 'Es la Vestimenta. Cascading Style Sheets (Hojas de Estilo en Cascada) se utiliza para dar estilo, color, diseño y forma visual a la estructura que creamos con HTML.'
    },
    'card-javascript': {
        title: '¿Qué es JavaScript?',
        text: 'Es el Cerebro. Un lenguaje de programación que te permite darle interactividad y dinamismo a la página, como animaciones, formularios inteligentes o ventanas que aparecen al hacer clic.'
    }
}

menuBtn.addEventListener('click',()=>{

    navLista.classList.toggle('isActive')
    menuBtn.classList.toggle('isActive')
    // Verificamos el texto actual del botón para alternarlo
    if (menuBtn.textContent === '=') {
        menuBtn.textContent = 'x';
    } else {
        menuBtn.textContent = '=';
    }
})

cardContainer.addEventListener ('click',(event)=>{
    // Buscamos el ancestro más cercano que tenga la clase 'card-item'
    const card = event.target.closest('.card-item')

    // Si el clic no fue dentro de una tarjeta (fue en el contenedor vacío), salimos de la función
    if (!card) return;

    // Obtenemos el ID de la tarjeta seleccionada (ej: 'card-html')
    const cardId = card.id;

    // Extraemos la información del diccionario usando el ID como llave
    const info = descriptions[cardId];

    if (info) {
        // Inyectamos el contenido en el HTML de forma dinámica
        languageTitle.textContent = info.title;
        languageDescription.textContent = info.text;
    }

    // Quitamos la clase 'hidden' para mostrar la ventana con su fondo oscuro
        modalOverlay.classList.remove('hidden');

})

// FUNCIÓN PARA CERRAR EL MODAL
const closeModal = () => {
    modalOverlay.classList.add('hidden');
};

// Cerrar al hacer clic en la "X"
closeModalBtn.addEventListener('click', closeModal);

// EXTRA DE UX: Cerrar también si el usuario hace clic afuera de la tarjeta (en el fondo oscuro)
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});