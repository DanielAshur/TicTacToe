import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Box from './Box'

function Board() {
    const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [currentPlayer, setCurrentPlayer] = useState(1)

    useEffect(() => {
        initialGame()
    }, [])

    function initialGame() {
        setBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ])
        setCurrentPlayer(1)
    }

    function CheckForWinners() {
        let boxes = 3;
        let sum;

        // check rows
        for (let i = 0; i < boxes; i++) {
            sum = board[i][0] + board[i][1] + board[i][2];
            if (sum === 3) { return 1; }
            else if (sum === -3) { return -1; }
        }
        // check columns
        for (let i = 0; i < boxes; i++) {
            sum = board[0][i] + board[1][i] + board[2][i];
            if (sum === 3) { return 1; }
            else if (sum === -3) { return -1; }
        }

        // check diagonals
        sum = board[0][0] + board[1][1] + board[2][2];
        if (sum === 3) { return 1; }
        if (sum === -3) { return -1; }

        sum = board[2][0] + board[1][1] + board[0][2];
        if (sum === 3) { return 1; }
        if (sum === -3) { return -1; }

    }

    function boxClicked(row, col) {
        // wont let the box change
        let value = board[row][col];
        if (value !== 0) { return }

        // set the board acording to player box clicked
        board[row][col] = currentPlayer
        setBoard(board)

        // switch players
        let nextPlayer = (currentPlayer === 1) ? -1 : 1;
        setCurrentPlayer(nextPlayer)

        // check winner
        let winner = CheckForWinners();
        if (winner === 1) {
            alert("X WINS");
            initialGame();
        }
        if (winner === -1) {
            alert("O WINS");
            initialGame();
        }
    }

    function renderImg(row, col) {
        // setting image acording to board state    
        let value = board[row][col];
        if (value === 1) {
            return <Image  alt="cross" className={"cross"} src={require('../images/cross.png')} />
        }
        if (value === -1) {
            return <Image  alt="circle" className={"circle"} src={require('../images/circle.png')} />
        }
    }

    // save current board to sessionStorage
    function saveGame() {
        window.sessionStorage.setItem("savedGame", JSON.stringify(board))
        window.sessionStorage.setItem("currentPlayer", currentPlayer);
    }

    // load saved game from sessionStorage
    function loadSavedGame() {
        let getSavedGame = JSON.parse(window.sessionStorage.getItem("savedGame"))
        let currentPlayer = JSON.parse(window.sessionStorage.getItem("currentPlayer"));
        (currentPlayer === 1) ? alert("X Turn") : alert("O Turn")
        setBoard(getSavedGame)
        setCurrentPlayer(currentPlayer)
    }

    return (
        <Container className="board-ctr">
            <Row><Col sm={12}><h1>Tic Tac Toe</h1></Col></Row>
            <Row>
                <Col>
                    <Box id="box-0" boxClicked={() => boxClicked(0, 0)} img={renderImg(0, 0)} />
                </Col>
                <Col>
                    <Box id="box-1" boxClicked={() => boxClicked(0, 1)} img={renderImg(0, 1)} />
                </Col>
                <Col>
                    <Box id="box-2" boxClicked={() => boxClicked(0, 2)} img={renderImg(0, 2)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Box id="box-3" boxClicked={() => boxClicked(1, 0)} img={renderImg(1, 0)} />
                </Col>
                <Col>
                    <Box id="box-4" boxClicked={() => boxClicked(1, 1)} img={renderImg(1, 1)} />
                </Col>
                <Col>
                    <Box id="box-5" boxClicked={() => boxClicked(1, 2)} img={renderImg(1, 2)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Box id="box-6" boxClicked={() => boxClicked(2, 0)} img={renderImg(2, 0)} />
                </Col>
                <Col>
                    <Box id="box-7" boxClicked={() => boxClicked(2, 1)} img={renderImg(2, 1)} />
                </Col>
                <Col>
                    <Box id="box-8" boxClicked={() => boxClicked(2, 2)} img={renderImg(2, 2)} />
                </Col>
            </Row>
            <Row className="buttons">
                <button className="new-game" onClick={() => initialGame()}>NEW GAME</button>
                <button className="save-game" onClick={() => saveGame()}>SAVE GAME</button>
                <button className="load-game" onClick={() => loadSavedGame()}>LOAD SAVED GAME</button>
            </Row>
        </Container>
    )
}


export default Board