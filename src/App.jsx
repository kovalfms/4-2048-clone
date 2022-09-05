import {useEffect, useState} from "react";
import cloneDeep from "clone-deep"

import {Cell} from "./components/Cell";
import {Popup} from "./components/Popup";
import {useEvent} from "./utils";

import './App.css';

const WIN = <h1>YOU WIN!!! &#128522;</h1>
const LOSE = <h1>YOU LOSE!!! &#128543;</h1>

function App() {
    const [score, setScore] = useState(0)
    const [haveZero, setHaveZero] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [gameLose, setGameLose] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [board, setBoard] = useState([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    )


    useEffect(() => {
        initialBoard()
    }, [])

    useEffect(() => {
        if (board.flat().includes(0)) {
            setHaveZero(true)
        } else {
            setHaveZero(false)
        }
        checkGameLose()
    }, [board, haveZero]);


    const initialBoard = () => {
        const newBoard = cloneDeep(board)

        addRandomNumber(newBoard)
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }

    const addRandomNumber = (newBoard) => {
        let isAdded = false
        while (!isAdded) {
            const x = Math.floor(Math.random() * 4)
            const y = Math.floor(Math.random() * 4)
            if (newBoard[x][y] === 0) {
                newBoard[x][y] = Math.random() > 0.5 ? 2 : 4
                isAdded = true
            }
        }
    }

    const checkGameLose = () => {
        if (!haveZero) {
            let rowMove = false;
            let columnMove = false;

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === board[i][j + 1]) {
                        rowMove = true
                    }
                }
            }

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[j][i] === board[j + 1][i]) {
                        columnMove = true;
                    }
                }
            }

            if (!rowMove && !columnMove) {
                setGameLose(true)
                setShowPopup(true)
            }
        }
    }

    const resetGame = () => {
        const emptyBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        addRandomNumber(emptyBoard)
        addRandomNumber(emptyBoard)
        setBoard(emptyBoard)
        setScore(0)
        setGameWon(false)
        setGameLose(false)
        setShowPopup(false)
    }


    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                moveLeft()
                break;
            case "ArrowRight":
                moveRight()
                break;
            case "ArrowUp":
                moveUp()
                break;
            case "ArrowDown":
                moveDown()
                break;
            default:
        }
    }

    useEvent('keydown', onKeyDown)


    const moveLeft = () => {
        const oldBoard = board
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            const plugArr = [0, 0, 0, 0]
            for (let j = 0; j < 4; j++) {
                if (newBoard[i][j] === 0) continue
                for (let k = j; k > 0; k--)
                    if (newBoard[i][k - 1] === 0) {
                        newBoard[i][k - 1] = newBoard[i][k]
                        newBoard[i][k] = 0
                    } else if (newBoard[i][k - 1] === newBoard[i][k] && plugArr[k - 1] === 0) {
                        newBoard[i][k - 1] = newBoard[i][k - 1] + newBoard[i][k]
                        newBoard[i][k] = 0
                        plugArr[k - 1] = 1
                        setScore(prevState => prevState + newBoard[i][k - 1])
                        if (newBoard[i][k - 1] === 2048) {
                            setGameWon(true)
                            setShowPopup(true)
                        }
                        break
                    }
            }
        }
        if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
            addRandomNumber(newBoard)
        }
        setBoard(newBoard)
    }

    const moveRight = () => {
        const oldBoard = board
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            const plugArr = [0, 0, 0, 0]
            for (let j = 3; j >= 0; j--) {
                if (newBoard[i][j] === 0) continue

                for (let k = j; k < 4; k++)
                    if (newBoard[i][k + 1] === 0) {
                        newBoard[i][k + 1] = newBoard[i][k]
                        newBoard[i][k] = 0
                    } else if (newBoard[i][k + 1] === newBoard[i][k] && plugArr[k + 1] === 0) {
                        newBoard[i][k + 1] = newBoard[i][k + 1] + newBoard[i][k]
                        newBoard[i][k] = 0
                        plugArr[k + 1] = 1
                        setScore(prevState => prevState + newBoard[i][k + 1])
                        if (newBoard[i][k + 1] === 2048) {
                            setGameWon(true)
                            setShowPopup(true)
                        }
                        break
                    }
            }
        }
        if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
            addRandomNumber(newBoard)
        }
        setBoard(newBoard)
    }

    const moveUp = () => {
        const oldBoard = board
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            const plugArr = [0, 0, 0, 0]
            for (let j = 0; j < 4; j++) {
                if (newBoard[j][i] === 0) continue
                for (let k = j; k > 0; k--)
                    if (newBoard[k - 1][i] === 0) {
                        newBoard[k - 1][i] = newBoard[k][i]
                        newBoard[k][i] = 0
                    } else if (newBoard[k - 1][i] === newBoard[k][i] && plugArr[k - 1] === 0) {
                        newBoard[k - 1][i] = newBoard[k - 1][i] + newBoard[k][i]
                        newBoard[k][i] = 0
                        plugArr[k - 1] = 1
                        if (newBoard[k - 1][i] === 2048) {
                            setGameWon(true)
                            setShowPopup(true)
                        }
                        setScore(prevState => prevState + newBoard[k - 1][i])
                        break
                    }
            }
        }
        if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
            addRandomNumber(newBoard)
        }
        setBoard(newBoard)
    }

    const moveDown = () => {
        const oldBoard = board
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            const plugArr = [0, 0, 0, 0]
            for (let j = 3; j >= 0; j--) {
                if (newBoard[j][i] === 0) continue

                for (let k = j; k < 3; k++)
                    if (newBoard[k + 1][i] === 0) {
                        newBoard[k + 1][i] = newBoard[k][i]
                        newBoard[k][i] = 0
                    } else if (newBoard[k + 1][i] === newBoard[k][i] && plugArr[k + 1] === 0) {
                        newBoard[k + 1][i] = newBoard[k + 1][i] + newBoard[k][i]
                        newBoard[k][i] = 0
                        plugArr[k + 1] = 1
                        if (newBoard[k + 1][i] === 2048) {
                            setGameWon(true)
                            setShowPopup(true)
                        }
                        setScore(prevState => prevState + newBoard[k + 1][i])
                        break
                    }
            }
        }
        if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
            addRandomNumber(newBoard)
        }
        setBoard(newBoard)
    }

    return (
        <div className="App">
            <div className="boardTop">
                <h1 style={{fontSize: "60px"}}>2048 GAME</h1>
                <div className="score">
                    <div>SCORE:</div>
                    <div className="counter">{score}</div>
                </div>
            </div>
            {board.map((row, index) => {
                return <div className="board" key={index}>
                    {row.map((num, i) =>
                        <Cell num={num} key={i}/>
                    )}
                </div>
            })}
            {!gameLose && <button style={{marginTop: "20px"}} onClick={resetGame}>RESET</button>}
            {gameLose && showPopup ? <Popup text={LOSE} resetGame={resetGame}/> : null}
            {gameWon && showPopup ? <Popup text={WIN} resetGame={resetGame}/> : null}
        </div>

    );
}

export default App;
