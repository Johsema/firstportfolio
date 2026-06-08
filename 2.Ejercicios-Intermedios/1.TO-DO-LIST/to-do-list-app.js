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
    // MÉTODO PARA AGREGAR UNA NUEVA TAREA
    addTask(){
        const taskText = this.task.value.trim()
        // VERIFICAMOS QUE EL IMPUT NO ESTÉ VACIO
        if (taskText===''){
            return alert ('Por favor agrega una tarea')
        }
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
        const li = document.createElement('li')
        li.innerText = text

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

        taskElements.forEach(li=>{
            //El texto de tu li incluye la palabra Eliminar del botón
            //Con .replace() limpiamos esa palabra para guardar solo la tarea real
            const text = li.innerText.replace('Eliminar','').trim()
            const isCompleted = li.classList.contains('completado')

            //Guardamos cada tarea como un objeto estructurado 
            arrayTasks.push({ text, isCompleted })
        })
        
        // CONVERTIMOS EL ARREGLO DE OBJETOS A UN STRING DE JSON Y LO GUARDAMOS
        localStorage.setItem('myTodoList', JSON.stringify(arrayTasks))
    }

    // LEE EL ALMACENAMIENTO LOCAL Y RECONSTRUYE LA LISTA AL ABRIR LA PÁGINA
    loadTasks(){ 
        const savedTasks = localStorage.getItem('myTodoList')

        //Si no hay nada guardado todavía, terminamos la función
        if(!savedTasks) return

        //Convertimos el String de JSON de vuelta a un arreglo de JavaScript
        const tasks = JSON.parse(savedTasks)

        //Recorremos el arreglo y recreamos cada elemento dle DOM
        tasks.forEach(task => {
            const taskItem = this.createTaskElement(task.text,task.isCompleted)
            this.taskList.appendChild(taskItem)
        })
    }

}

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