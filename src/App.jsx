import {useEffect, useState} from "react";
import cloneDeep from "clone-deep"
import Cell from "./components/Cell/Cell";
import './App.css';
import {useEvent} from "./utils";


function App() {
    const [score, setScore] = useState(0)
    const [gameWon, setGameWon] = useState(false)
    const [gameLose, setGameLose] = useState(false)
    const [board, setBoard] = useState([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    )

    console.log(gameLose)

    useEffect(() => {
        initialBoard()
    }, [])


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
            console.log("X", x)
            console.log("Y", y)
            if (newBoard[x][y] === 0) {
                newBoard[x][y] = Math.random() > 0.5 ? 2 : 4
                isAdded = true
            }
            console.log('ADD RANDOM NUM', newBoard[x][y])
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
        console.log('MOVE LEFT')
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
                        console.log(plugArr)
                        setScore(prevState => prevState + newBoard[i][k - 1])
                        if (newBoard[i][k - 1] === 2048) {
                            setGameWon(true)
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
        console.log('MOVE RIGHT')
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
                        console.log(plugArr)
                        setScore(prevState => prevState + newBoard[i][k + 1])
                        if (newBoard[i][k + 1] === 2048) {
                            setGameWon(true)
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
        console.log('MOVE UP')
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
                        console.log(plugArr)
                        if (newBoard[k - 1][i] === 2048) {
                            setGameWon(true)
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
        console.log('MOVE DOWN')
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
                        console.log(plugArr)
                        if (newBoard[k + 1][i] === 2048) {
                            setGameWon(true)
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

    if (gameWon) {
        return (
            <h1>YOU WIN!!!!</h1>
        )
    }
    if (gameLose) {
        return (
            <h1>YOU LOSE!!!!</h1>
        )
    }


    return (
        <div className="App">
            <h1 style={{fontSize: "60px"}}>2048 GAME</h1> <h2>SCORE {score}</h2>
            {/*{gameWon && <h1>YOU WIN!!!!</h1>}*/}
            {gameLose && <h1>YOU LOSE &#128543;</h1>}
            {board.map((row, index) => {
                return <div className="board" key={index}>
                    {row.map((num, i) =>
                        <Cell num={num} key={i}/>
                    )}
                </div>
            })}
            {!gameLose && <button style={{marginTop: "20px"}} onClick={resetGame}>RESET</button>}

        </div>
    );
}

export default App;
