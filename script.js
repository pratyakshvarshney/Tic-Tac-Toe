let boxes = document.querySelectorAll(".box");
let newGameButton = document.querySelector(".newGame");
let resetButton = document.querySelector(".reset");
let msg1 = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-conatiner");

let Oturn = true;
let count = 0;

let winningSpot = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    Oturn = true;
    count = 0;
    enableBoxes();
    msg1.classList.add("hide");
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        if(Oturn) {
            box.innerText = "O"
            Oturn = false;
            box.classList.add("O");
        } else {
            box.innerText = "X";
            Oturn = true;
            box.classList.add("X");
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg1.innerText = `Game was a Draw!`;
    msg1.classList.remove("hide");
    disableBoxes();

    setTimeout( () => {
        alert("New Game Initiated!");
        resetGame();
    }, 6000);
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
        box.classList.remove("O");
        box.classList.remove("X");
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg1.innerText = `Congratulations!! Winner is ${winner}`;
    msg1.classList.remove("hide");
    disableBoxes();

    setTimeout( () => {
        alert("New Game Initiated!");
        resetGame();
    }, 6000);
};

const checkWinner = () => {
    for (spot of winningSpot) {
        let value1 = boxes[spot[0]].innerText;
        let value2 = boxes[spot[1]].innerText;
        let value3 = boxes[spot[2]].innerText;

        if(value1 != "" && value2 != ""  && value3 != "") {
            if (value1 === value2 && value2 === value3) {
                showWinner(value1);
                return true;
            }
        }
    }
    return false;
};

newGameButton.addEventListener("click", () => {
    alert("New Game Initiated!");
    resetGame();
});

resetButton.addEventListener("click", () => {
    alert("Game was Reset!");
    resetGame();
});