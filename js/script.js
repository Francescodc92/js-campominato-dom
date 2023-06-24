/*
- Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.

- In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

- La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

- Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.

RAGIONAMENTO BASE
  1. al creare gli elementi , dobbiamo far si che vengano creati anche 16 numeri (le bombe) che verranno sostituiti  all'elemento che ha id uguale l numero ricevuto
    - i numeri creati dovranno essere inseriti un array in maniera da poter essere comparati a quelli dell'array principale che contiene gli elementi 
  2. creare un ciclo che ripete la creazione del numero fino a quanto non ci sono 16 elementi differenti nell'array
  3. al cliccare su una cella dobbiamo verificare se l'id del numero cliccato uguale a quello dei numeri che hanno la bomba
    - se lo è il giocatore ha perso 
      - quindi annullare l'evento del click sull'elemento ,in maniera che il giocatore non possa continuare a giocare
      - e svuotare il contenitore delle celle in maniera da poter ricominciare il gioco
    - se non lo è il punteggio verrà incrementato
  4. dichiarare la condizione di vittoria
    - quando tutte le caselle che non sono quelle con l'id delle bombe sono state cliccate il player ha vinto
  5. in caso di vittoria colorare di rosso tutte le bombe e scrivere in un elemento che il player ha vinto
*/
const formSettingsGame = document.getElementById("game-settings")
const gameContainer = document.querySelector(".game-container")
const difficultyLevelSelect = document.getElementById("difficulty-level")
const pointsElements = document.querySelectorAll(".points")
const modalElement = document.querySelector(".modal")
const resetButton = document.querySelector(".reset-button")
const resultDisplay = document.getElementById("result")
const bombArrayIndex = []
let playerPoint = 0

let cellsNumber
function gameStart(e) {
  const difficultyLevelValue = difficultyLevelSelect.value
  e.preventDefault()
  if (difficultyLevelValue == "easy") {
    cellsNumber = 100
  } else if (difficultyLevelValue == "medium") {
    cellsNumber = 81
  } else if (difficultyLevelValue == "hard") {
    cellsNumber = 49
  }
  const numberBomb = 16

  const classWidthElement =
    difficultyLevelValue == "easy"
      ? "easy"
      : difficultyLevelValue == "medium"
      ? "medium"
      : "hard"
  gameContainer.innerHTML = ""
  for (let i = 1; i <= cellsNumber; i++) {
    const createdElement = createElementHTML(i, classWidthElement)
    gameContainer.append(createdElement)
  }

  createRandomBombArray(numberBomb, cellsNumber)
}

const createElementHTML = (index, classCellContainer) => {
  const htmlCellContainer = document.createElement("div")
  htmlCellContainer.classList.add("game-cell-container", classCellContainer)
  const htmlCellElement = document.createElement("div")
  htmlCellElement.setAttribute("id", `cell${index}`)
  htmlCellElement.classList.add("game-cell")
  htmlCellElement.innerHTML = index
  htmlCellElement.addEventListener("click", cellClicched)
  htmlCellContainer.append(htmlCellElement)

  return htmlCellContainer
}

const createRandomBombArray = (numberBomb, cellLenght) => {
  let randomNumber
  do {
    randomNumber = randomNumberCreate(1, cellLenght)
    if (!bombArrayIndex.includes(randomNumber)) {
      bombArrayIndex.push(randomNumber)
    }
  } while (bombArrayIndex.length < numberBomb)

  return bombArrayIndex
}

const randomNumberCreate = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let cellWithoutBombs = []
const cellClicched = function () {
  let itsBomb = false
  const currentId = this.id
  const currentElementCell = document.querySelector("#" + currentId)

  //inserire in una funzione che verifica se è una bomba
  bombArrayIndex.forEach((number) => {
    if (currentId == `cell${number}`) {
      bombId = "cell" + number
      itsBomb = true
      currentElementCell.style.backgroundColor = "red"
      gameEnd("hai perso")
    }
  })

  if (itsBomb == false) {
    cellWithoutBombs.push(currentElementCell)
  }

  if (cellWithoutBombs.length == cellsNumber - 16) {
    gameEnd("hai vinto")
  }

  if (!this.classList.contains("clicked") && !itsBomb) {
    playerPoint++
    pointsElements.forEach((element) => {
      element.innerHTML = playerPoint
    })
  }

  this.classList.add("clicked")
}
const gameEnd = (result) => {
  resultDisplay.innerHTML = ""
  modalElement.classList.add("active")
  resultDisplay.innerHTML = result
}

resetButton.addEventListener("click", () => {
  window.location.reload()
})

formSettingsGame.addEventListener("submit", gameStart)
