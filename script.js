let botonSuma =document.getElementById('boton-suma')
let botonResta =document.getElementById('boton-resta')
contador=document.getElementById('contador')

valorInicial = 0

const countAdd=() =>{
    contador.innerHTML = valorInicial += 1
}
const countSubstract = () => {
    contador.innerHTML = valorInicial -= 1
}
botonSuma.addEventListener('click',() =>{
    countAdd();
})

botonResta.addEventListener('click', () => {
    countSubstract()
})

function cargarMostrarImagenAleatoria(){
    let imagenes = [
        {
        src: "./assets/birdo-azul.png",
        width: "100",
        height: "80"
        },

        {
        src: "./assets/daisy.png",
        width: "100",
        height: "80"
        },

        {
        src: "./assets/luigi-lila.png",
        width: "100",
        height: "80"
        },

        {
        src: "./assets/peach.png",
        width: "100",
        height: "80"
        },

        {
        src: "./assets/toad-rosa.png",
        width: "100",
        height: "80"
        },

        {
        src: "./assets/toad-verde.png",
        width: "100",
        height: "80"
        }
    ];

let bufferImagenes = [];

for (const e of imagenes) {
    let imagen = new Image();
    imagen.src = e.src;
    imagen.width = e.width;
    imagen.height = e.height;

    bufferImagenes.push(imagen);
    }

    let indiceImagenAleatoria = generarEnteroAleatorio(imagenes.length);
    let imagenAleatoria = bufferImagenes[indiceImagenAleatoria];

    let nuevoElementoImagen = document.body.appendChild(imagenAleatoria);
}
    function generarEnteroAleatorio(cantidadImagenes) {
        return Math.floor(Math.random() * cantidadImagenes);
    }
function shuffle(array){
    var currentIndex = array.length,
    randomIndex;
    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]]=[
            array[currentIndex],
            array[currentIndex],
        ];
    }
    return array;
}
"use strict";

const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");
const addButton = document.querySelector("#addButton");

startButton.addEventListener("click", startWheel);
resetButton.addEventListener("click", reset);
addButton.addEventListener("click", addCoder);

let listaCoders = [];

function startWheel() {
  const listCodersAlive = [];
  listaCoders.forEach((coder) => {
    if (coder.status === "alive") {
      listCodersAlive.push(coder);
    }
  });
  if (listCodersAlive.length <= 0) {
    showResultMessage("No hay coders para sacrificar, ¿buscamos más?");
    return;
  }
  const selectedCoder = selectCoder(listCodersAlive);
  showResultMessage(selectedCoder.name);
  updateList(selectedCoder, "dead");
  updateCoderCard(selectedCoder);
  console.log(listaCoders, listCodersAlive)
}

function selectCoder(array) {
  const selectedCoder = array[Math.floor(Math.random() * array.length)];
  return selectedCoder;
}

function updateCoderCard(coder) {
  const coderCard = document.querySelector(`#${coder.name}`);
  coderCard.className = `${coder.status}`;
}

function updateList(coder, status) {
  const coderIndex = listaCoders.findIndex(
    (element) => element.name === coder.name
  );
  listaCoders[coderIndex].status = status;
}

function showResultMessage(message) {
  const selectedCard = document.querySelector("#display-message");
  selectedCard.innerHTML = message;
}

function showCoders() {
  listaCoders.forEach((coder) => {
    createCoderArticle(coder);
  });
}

function createCoderArticle(coder) {
  const coderListSection = document.querySelector("#coderList");
  const coderArticle = document.createElement("article");
  const coderName = document.createElement("p", `${coder.name}`);
  coderName.innerHTML += `${coder.name}`;
  coderArticle.setAttribute("class", `${coder.status}`);
  coderArticle.setAttribute("id", `${coder.name}`);
  coderArticle.appendChild(coderName);
  coderListSection.appendChild(coderArticle);
}

function reset() {
  listaCoders.forEach((element) => {
    updateList(element, "alive");
    updateCoderCard(element);
  });
  showResultMessage("");
}

function addCoder() {
  let coderNameInput = document.querySelector("#addCoder");
  const coderName = coderNameInput.value;
  if (!validateInput(coderName)) {
    return;
  }
  const coder = {
    name: coderName,
    status: "alive",
  };
  listaCoders.push(coder);
  createCoderArticle(coder);
  coderNameInput.value = "";
}

function validateInput(value) {
  if (value === "" || value === undefined) {
    showFeedbackMessage();
    return;
  }
  return true;
}

function showFeedbackMessage() {
  window.alert("please insert name")
}

const audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

window.onload = showCoders();
