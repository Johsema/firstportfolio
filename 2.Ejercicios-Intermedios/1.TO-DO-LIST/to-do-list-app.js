const modal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

class TodoList {
    // El constuctor define el "estado inicial de cada instancia"
    // Esto equivale a lo que ponías directamente en la función constructora
    constructor() {
        this.task = document.getElementById('new-task')
        this.taskList = document.getElementById('task-list')
        this.addButton = document.getElementById('add-task')

        //Encenedemos los motores de la app 
        this.initEvents()

        // Al iniciar, cargamos las atreas que se hayan quedado guardadas 
        this.loadTasks()
    }
    /* Métodos de la clase
    Tras bambalinas, JavaScript agarra estas funciones y las asigna automáticamente a TodoList.prototype
    */
    initEvents(){
        //Vinculamos el click al método addTask
        this.addButton.addEventListener('click', () => {this.addTask()})
        /* Pequeño Tip, de esta manera podemos agregar la tarea apretando Enter*/
        this.task.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask()
        })
    }

    // 🔥 FUNCIÓN PARA SANEAR EL TEXTO (Previene XSS e inyecciones de código)
    sanitizeHTML(str) {
        return str.replace(/[&<>"']/g, (match) => {
            const escapeChars = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
            };
            return escapeChars[match];
        });
    }

    // MÉTODO PARA AGREGAR UNA NUEVA TAREA
    addTask(){
        let taskText = this.task.value.trim()
        // VERIFICAMOS QUE EL IMPUT NO ESTÉ VACIO
        if (taskText===''){
            modalMessage.textContent = 'Por favor introduce una tarea ✍️';
            modal.classList.add('show');
            return; // Detiene la ejecución aquí si está mal
        }

        // 🔥 2. NUEVA VALIDACIÓN: Longitud mínima (Por ejemplo, mínimo 3 caracteres)
        if (taskText.length < 3) {
            this.showModal('La tarea es muy corta (debe tener al menos 3 caracteres).');
            return;
        }

        // 2. Validación: Control de longitud máxima (Evita romper la UI)
        if (taskText.length > 70) {
            modalMessage.textContent = 'La tarea es muy larga (máximo 70 caracteres). ✍️';
            modal.classList.add('show');
            return; // Detiene la ejecución aquí si está mal
        }

        // 3. Validación: Evitar que sean solo números o puros símbolos extraños
        // Explicación de la Regex: Exige que al menos exista una letra o número en el texto
        const validTextRegex = /[a-zA-Z0-9]/;
        if (!validTextRegex.test(taskText)) {
            modalMessage.textContent = 'La tarea debe contener al menos una letra o número válido. ✍️';
            modal.classList.add('show');
            return; // Detiene la ejecución aquí si está mal
        }

        // 4. Saneamos el texto antes de procesarlo
        taskText = this.sanitizeHTML(taskText);

        // Creamos el elemento con un objeto de configuración falso por defecto
        const taskItem = this.createTaskElement(taskText, false)
        this.taskList.appendChild(taskItem)
        this.task.value=''

        //Guardamos el nuevo estado de la lista
        this.saveTasks()
    }
    // MÉTODO PARA CREAR LOS ELEMENTOS DE LA LISTA DE TAREAS
    //Modificamos este método para que acepte si la tarea ya viene 'Completada' desde el inicio
    createTaskElement(text, isCompleted){
        const li = document.createElement('li');
        // Usamos un contenedor span independiente para el texto de la tarea.
        // Esto evita que al hacer un replace('Eliminar') se altere el contenido del usuario.
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.innerHTML = text; // Seguro porque ya fue saneado en addTask y loadTasks
        li.appendChild(textSpan);

        //Si la tarea ya está completada, aplicamos el estilo CSS
        if (isCompleted){
            li.classList.add('completado')
        }

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Eliminar'
        deleteButton.classList.add('delete')

        //Eventos del DOM para la manipulación interna del elemento
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation()
            li.remove()
            this.saveTasks() //Guardamos los cambios tras eliminar
        })

        li.addEventListener('click',()=>{
            li.classList.toggle('completado')
            this.saveTasks() //Guardamos tras marcar/desmarcar
        })

        li.appendChild(deleteButton)
        return li
    }
    //NUEVOS METODOS PARA LOCAL STORAGE
    // Guarda el estado actual del DOM en el almacenamiento local
    saveTasks(){
        const arrayTasks =[]

        //Seleccionamos todos los 'li' actuales que viven dentro de la lista
        const taskElements = this.taskList.querySelectorAll('li')

        taskElements.forEach(li => {
            // 🔥 AQUÍ ESTÁ LA CORRECCIÓN:
            // Debemos buscar el 'span' que vive dentro de ESTE 'li' usando querySelector
            const textSpan = li.querySelector('.task-text');
            
        if (textSpan) {
                const text = textSpan.innerHTML; // Mantiene el texto saneado
                const isCompleted = li.classList.contains('completado');
                arrayTasks.push({ text, isCompleted });
            }
        });
        // CONVERTIMOS EL ARREGLO DE OBJETOS A UN STRING DE JSON Y LO GUARDAMOS
        localStorage.setItem('myTodoList', JSON.stringify(arrayTasks))
    }

    // LEE EL ALMACENAMIENTO LOCAL Y RECONSTRUYE LA LISTA AL ABRIR LA PÁGINA
    loadTasks(){ 
        const savedTasks = localStorage.getItem('myTodoList')

        //Si no hay nada guardado todavía, terminamos la función
        if(!savedTasks) return

        try {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                // Saneamos de nuevo al cargar por si acaso el LocalStorage fue manipulado externamente
                const safeText = this.sanitizeHTML(task.text);
                const taskItem = this.createTaskElement(safeText, task.isCompleted);
                this.taskList.appendChild(taskItem);
            });
        } catch (e) {
            console.error("Error al leer el almacenamiento local, datos corruptos.", e);
            localStorage.removeItem('myTodoList'); // Limpia datos corruptos si alguien metió mano al JSON
        }
    }
    // Helper dinámico para reutilizar la modal con diferentes mensajes
    showModal(message) {
        if (modalMessage) modalMessage.innerText = message;
        modal.classList.add('show');
    }

}

// Escuchador para cerrar la modal (Se queda afuera para cuidar la memoria)
modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

document.addEventListener('DOMContentLoaded', () => {
const myApp = new TodoList()

// ==========================================
    // LÓGICA DEL MODO OSCURO (ESTILO DIBUJO)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    const darkModeGuardado = localStorage.getItem('darkMode') === 'enabled';
    
    if (darkModeGuardado) {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☾'; // Luna lineal dibujada
    } else {
        themeToggleBtn.textContent = '☼'; // Sol lineal dibujado
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☾'; // Cambia a luna en modo oscuro
            localStorage.setItem('darkMode', 'enabled');
        } else {
            themeToggleBtn.textContent = '☼'; // Cambia a sol en modo claro
            localStorage.setItem('darkMode', 'disabled');
        }
    });

// REGISTRO DEL SERVICE WORKER PARA LA PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado con éxito', reg))
            .catch(err => console.error('Error al registrar el Service Worker', err));
    });
}
})




/* 
// SELECCIONAMOS LOS ELEMENTOS DEL DOM

let task = document.getElementById('new-task')
let taskList = document.getElementById('task-list') 
let addButton = document.getElementById('add-task')

// FUNCIÓN PARA AGREGAR UNA NUEVA TAREA

addButton.addEventListener('click', () =>{
    const newTask = task.value

    // VERIFICAMOS QUE LA TAREA NO ESTÉ VACÍA
    if (newTask.trim() === '') {
        alert('Agregar una tarea')
        return
    }

    //CREAR UN ELEMENTO LI PARA LA TAREA 
    const taskItem = document.createElement('li')
    taskItem.innerText = newTask
    
    //CREAMOS UN BOTÓN PARA ELIMINAR LA TAREA
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Eliminar'
    deleteButton.classList.add('delete')

    //EVENTO PARA ELIMINAR LA TAREA AL PRESIONAR EL BOTON 
    deleteButton.addEventListener('click', ()=>{
        taskItem.remove()
    })

    //EVENTO PARA MARCAR LA TAREA AL HACER CLICK 
    taskItem.addEventListener('click',()=>{
        taskItem.classList.toggle('Completado')
    })

    //BOTON PARA ELIMINAR EL LI 
    taskItem.appendChild(deleteButton)

    //AÑADIMOS EL LI A LA LISTA DE TAREAS
    taskList.appendChild(taskItem)

    //LIMPIAMOS EL IMPUT DONDE COLOCAMOS LA TAREA
    task.value = ''
}) */