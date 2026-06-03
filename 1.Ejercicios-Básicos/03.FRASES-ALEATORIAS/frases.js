let frases = [
    "HOY SERÁ UN GRAN DÍA",
    "NO TE RINDAS, LO ESTÁS HACIENDO EXCELENTE",
    "VAMOS, TU PUEDES",
    "CADA PEQUEÑO PASO, TE DIRIGIRÁ A ALGO MÁS GRANDE",
    "TEN FE EN TI MISMO",
    "ARRIBA!"
]

let frase = document.getElementById('frase')
let btnGenerar = document.getElementById('btn-generar')
let contador = 0

btnGenerar.addEventListener('click',()=>{
    frase.classList.remove('ocultar')
    contador = Math.floor(Math.random()*5)
    let fraseBuscada = frases[contador]
    frase.innerText = fraseBuscada
})