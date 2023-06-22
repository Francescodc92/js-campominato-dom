/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
  Ogni cella ha un numero progressivo, da 1 a 100.
  Ci saranno quindi 10 caselle per ognuna delle 10 righe.
  Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

RAGIONAMENTO BASE
1. prendere il bottone che da inizio alla partita 
    nel caso prendo il form e agiungo l'evento al sumbit 
2. intercettare il click 
3. quando l'utente cliccherà il bottone 
  -creare un ciclo che definisce quante volte creare l'elemento (di conseguenza definisce quandi elementi che creeremo nella pagina)
  - chiamare la funzione che crea gli elementi in pagina ad ogni giro

4. creare una funzione che crea l'elemento html da agiungere alla pagina 
  - nella stessa aggiungere all'elemento un eventlistener che prenderà il click dell'utente e chiamerà una funzione 
5. creare una funzione legata al click dell'utente che cambia il bakground dell'elemento e scrive in console l'innerhtml dell'elemento 

BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
  - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
  - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
  - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

RAGIONAMENTO BASE BONUS 
1. creare una select nell'html
2. in base alle difficoltà cambiare il width delle caselle in base al numero di caselle che l'esercizio richiede
  - se la difficoltà è easy 7 caselle per righa   
  - se la difficoltà è medium 9 caselle per righa
  - se la difficoltà e hard 10 caselle per righa

3. in base alla difficoltà deve cambiare anche il numero totale di elementi html 
  - cambiare il valore della variabile cellsNumber in base alla difficoltà di gioco 
      -se la difficoltà è easy il valore della variabile sarà 49
      -se la difficoltà è medium il valore della variabile sarà 81
      -se la difficoltà è hard il valore sarà 100

*/
const formSettingsGame = document.getElementById("game-settings")
const gameContainer = document.querySelector(".game-container")
const difficultyLevelSelect = document.getElementById("difficulty-level")
const createElementHTML = (index, classCellContainer) => {
  const htmlCellContainer = document.createElement("div")
  htmlCellContainer.classList.add("game-cell-container", classCellContainer)
  const htmlCellElement = document.createElement("div")
  htmlCellElement.classList.add("game-cell")
  htmlCellElement.innerHTML = index
  htmlCellElement.addEventListener("click", cellClicched)
  htmlCellContainer.append(htmlCellElement)

  return htmlCellContainer
}
const cellClicched = function () {
  this.classList.add("clicked")
  console.log(this.innerHTML)
}

function gameStart(e) {
  const difficultyLevelValue = difficultyLevelSelect.value
  e.preventDefault()
  const cellsNumber =
    difficultyLevelValue == "easy"
      ? 100
      : difficultyLevelValue == "medium"
      ? 81
      : 49
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
}

formSettingsGame.addEventListener("submit", gameStart)
