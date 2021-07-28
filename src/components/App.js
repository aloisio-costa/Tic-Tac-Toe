import { React, useState, useEffect } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import { fetchScore, addScore, resetScore } from "../actions/Game.actions";

const App = () => {
    const [gameBoard, setGameBoard] = useState([...Array(9).fill(null)]);
    const [numbPlays, setNumbPlays] = useState(0);
    const [xPlayerTurn, setXplayerTurn] = useState(true);
    const [scores, setScores] = useState([...Array(2).fill(0)]);
    const [winner, setWinner] = useState();
    const XO = xPlayerTurn ? "X" : "O";

    const handleOnClick = (i) => {
        const squares = [...gameBoard];
        //check if we got winner or square already with value
        if (winner || squares[i]) return;

        //fill the square with the value
        squares[i] = XO;

        //actualiza o Game board
        setGameBoard(squares);

        const winnerXO = calculateWinner(squares);
        if (winnerXO) {
            debugger
            setWinner(winnerXO);
            updateScore(winnerXO);
            return;
        }

        setNumbPlays(numbPlays + 1);
        setXplayerTurn(!xPlayerTurn);
    }

    const handleReset = () => {
        setWinner(null);
        setGameBoard([...Array(9).fill(null)]);
        setXplayerTurn(true);
        setNumbPlays(0);
    }


    const updateScore = async (winner) => {
        await addScore({ winner });
        const score = await fetchScore();
        if (score) {
            setScores(score);
        }
    }

    useEffect(() => {
        resetScore();
    }, [])


    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="game-score">
                <h2>X: {scores[0]}</h2>
                <h2>Score</h2>
                <h2>O: {scores[1]}</h2>
            </div>

            <Board squares={gameBoard} onClick={handleOnClick} />

            <div className="game-report">
                {numbPlays === gameBoard.length && !winner && <h2>It's a Draw!</h2>}
                {winner && <h2>Winner: {winner}</h2>}
                {numbPlays !== gameBoard.length && !winner && <h2>Player Turn: {XO}</h2>}
                <button onClick={handleReset}>Reset Game</button>
            </div>
        </div >
    )
}

export default App;