const title = document.querySelector(".d1-left-title span");
const cargo = document.querySelector(".tipo");
const descricao = document.querySelector(".descricao");
const aviso = document.querySelector(".d-2");
const lateral = document.querySelector(".d1-right");
const numeros = document.querySelector(".numeros");

const teclado = document.querySelectorAll(".teclado-botao")


const clicou = (event)=>{
    alert(event.target.innerHTML);
}

for (const tecla of teclado) {
    tecla.addEventListener("click", clicou)
}


