import './App.css';
import {useEffect, useState} from "react";
import Cell from "./components/Cell/Cell";
import cloneDeep from "clone-deep"


function App() {
    const [score, setScore] = useState(0)
    const [board, setBoard] = useState(
        [
            [2, 2, 4, 4],
            [2, 0, 0, 0],
            [8, 0, 0, 0],
            [8, 0, 0, 0]
        ]
    )


    useEffect(() => {
        initialBoard()
    }, [])

    const onKeyDown = (code) => {
        switch (code) {
            case "ArrowLeft":
                console.log(code)
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
    };
    //
    // useEffect(() => {
    //     window.addEventListener("keydown", onKeyDown);
    //
    //     return () => {
    //         window.removeEventListener("keydown", onKeyDown);
    //     };
    // });

    const initialBoard = () => {
        const newBoard = cloneDeep(board)

        addRandomNumber(newBoard)
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }

    const addRandomNumber = (newBoard) => {
        const x = Math.floor(Math.random() * 4)
        const y = Math.floor(Math.random() * 4)
        if (newBoard[x][y] === 0) {
            newBoard[x][y] = Math.random() > 0.5 ? 2 : 4
        }
    }

    const moveLeft = () => {
        console.log('MOVE LEFT')
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            let plugArr = [0, 0, 0, 0]
            for (let j = 0; j < 4; j++) {
                if (newBoard[i][j] === 0) continue
                for (let k = j; k > 0; k--)
                    if (newBoard[i][k - 1] === 0) {
                        newBoard[i][k - 1] = newBoard[i][k]
                        newBoard[i][k] = 0
                    } else if (newBoard[i][k - 1] === newBoard[i][k] && plugArr[k-1] === 0  ) {
                        newBoard[i][k - 1] = newBoard[i][k - 1] + newBoard[i][k]
                        newBoard[i][k] = 0
                        plugArr[k-1] = 1
                        console.log(plugArr)
                        setScore(prevState => prevState + newBoard[i][k - 1])
                        break
                    }
            }
        }
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }

    const moveRight = () => {
        console.log('MOVE RIGHT')
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            let count = 0
            for (let j = 3; j >= 0; j--) {
                if (newBoard[i][j] === 0) continue

                for (let k = j; k < 4; k++)
                    if (newBoard[i][k + 1] === 0) {
                        newBoard[i][k + 1] = newBoard[i][k]
                        newBoard[i][k] = 0
                    } else if (newBoard[i][k + 1] === newBoard[i][k] && count === 0) {
                        newBoard[i][k + 1] = newBoard[i][k + 1] + newBoard[i][k]
                        newBoard[i][k] = 0
                        count = 1
                        setScore(prevState => prevState + newBoard[i][k + 1])
                        break
                    }
            }
        }
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }

    const moveUp = () => {
        console.log('MOVE UP')
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            let count = 0
            for (let j = 0; j < 4; j++) {
                if (newBoard[j][i] === 0) continue
                for (let k = j; k > 0; k--)
                    if (newBoard[k - 1][i] === 0) {
                        newBoard[k - 1][i] = newBoard[k][i]
                        newBoard[k][i] = 0
                    } else if (newBoard[k - 1][i] === newBoard[k][i] && count === 0) {
                        newBoard[k - 1][i] = newBoard[k - 1][i] + newBoard[k][i]
                        newBoard[k][i] = 0
                        count = 1
                        setScore(prevState => prevState + newBoard[k - 1][i])
                        break
                    }
            }
        }
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }

    const moveDown = () => {
        console.log('MOVE DOWN')
        const newBoard = cloneDeep(board)
        for (let i = 0; i < 4; i++) {
            let count = 0
            for (let j = 3; j >= 0; j--) {
                if (newBoard[j][i] === 0) continue

                for (let k = j; k < 3; k++)
                    if (newBoard[k + 1][i] === 0) {
                        newBoard[k + 1][i] = newBoard[k][i]
                        newBoard[k][i] = 0
                    } else if (newBoard[k + 1][i] === newBoard[k][i] && count === 0) {
                        newBoard[k + 1][i] = newBoard[k + 1][i] + newBoard[k][i]
                        newBoard[k][i] = 0
                        count = 1
                        setScore(prevState => prevState + newBoard[k + 1][i])
                        break
                    }
            }
        }
        addRandomNumber(newBoard)
        setBoard(newBoard)
    }


    return (
        <div tabIndex={0} onKeyDown={(e) => onKeyDown(e.code)}  className="App">
            <h1>2048</h1> <h2>SCORE {score}</h2>
            {board.map((row, index) => {
                return <div  className="board" key={index}>
                    {row.map((num, i) =>
                        <Cell num={num} key={i}/>
                    )}
                </div>
            })}
            <button style={{marginTop: "20px"}}>NEW GAME</button>

        </div>
    );
}

export default App;
