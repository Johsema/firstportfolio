let btnIncrementar = document.getElementById('btn-incrementar')
let btnDisminuir = document.getElementById('btn-disminuir')
let btnReiniciar = document.getElementById('btn-reiniciar')
let valor = document.getElementById('valor')
let contador = 0

function actualizarValor(){
    valor.textContent=contador
}
btnIncrementar.addEventListener('click',()=>{
    contador++
    actualizarValor()
})

btnDisminuir.addEventListener('click',()=>{
    if (contador>0){
        contador--
        actualizarValor()
    }
})

btnReiniciar.addEventListener('click',()=>{
    contador=0
    actualizarValor()
})

