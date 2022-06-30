const title = document.querySelector(".d1-left-title span");
const cargo = document.querySelector(".tipo");
const descricao = document.querySelector(".descricao");
const aviso = document.querySelector(".d-2");
const lateral = document.querySelector(".d1-right");
const numeros = document.querySelector(".numeros");
const teclado = document.querySelectorAll(".teclado-botao");

let etapaAtual = 0;
let numero = "";
let braco = false;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];
  let numeroHtml = "";
  numero = "";
  branco = false;

  for (let index = 0; index < etapa.numeros; index++) {
    if (index === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  title.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    title.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome:${candidato.nome}<br/>Partido:${candidato.partido}`;
    let fotosHtml = "";
    for (const i in candidato.fotos) {
      if (candidato.fotos[i].vice) {
        fotosHtml += `<div class="img-vice">
        ${candidato.fotos[i].legenda}
        <img class="vice" src="img/${candidato.fotos[i].url}" alt="guaxinin" />
      </div>`;
      } else {
        fotosHtml += `<div class="img-presidente">
        ${candidato.fotos[i].legenda}
        <img class="presidente" src="img/${candidato.fotos[i].url}" alt="guaxinin" />
        </div>
        `;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    title.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

const clicou = (event) => {
  const elemento = document.querySelector(".numero.pisca");
  const teclaSelecionada = event.target.innerHTML;

  if (teclaSelecionada === "Corrige") {
    comecarEtapa();
  } else {
    if (teclaSelecionada === "Branco") {
      descricao.innerHTML = '<div class="aviso-grande pisca">BRANCO</div>';
      title.style.display = "block";
      aviso.style.display = "block";
      numeros.innerHTML = "";
      lateral.innerHTML = "";
      branco = true;
    } else if (teclaSelecionada === "Confirma") {
      confirma();
    } else if (elemento !== null) {
      elemento.innerHTML = teclaSelecionada;
      numero = `${numero}${teclaSelecionada}`;

      elemento.classList.remove("pisca");
      if (elemento.nextElementSibling !== null) {
        elemento.nextElementSibling.classList.add("pisca");
      } else {
        atualizaInterface();
      }
    }
  }
};

const confirma = () => {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (numero.length === etapa.numeros) {
    console.log("tecla confirma");
    votoConfirmado = true;
  } else if (branco === true) {
    console.log("voto branco");
    votoConfirmado = true;
  }
  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] != undefined) {
      comecarEtapa();
    } else {
      descricao.innerHTML = '<div class="aviso-grande fim">FIM</div>';
      title.style.display = "none";
      cargo.innerHTML = "";
      numeros.innerHTML = "";
      aviso.style.display = "none";
      lateral.innerHTML = "";
    }
  }
};

for (const tecla of teclado) {
  tecla.addEventListener("click", clicou);
}

comecarEtapa();
