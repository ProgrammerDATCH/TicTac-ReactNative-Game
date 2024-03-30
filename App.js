import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    if (isComputerTurn && !winner) {
      const computerMove = getComputerMove();
      handlePress(computerMove);
    }
  }, [isComputerTurn]);

  const handlePress = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard, player);
      setPlayer(player === 'X' ? 'O' : 'X');
      setIsComputerTurn(!isComputerTurn);
    }
  };

  const getComputerMove = () => {
    let index;
    do {
      index = Math.floor(Math.random() * 9);
    } while (board[index]);
    return index;
  };

  const checkWinner = (board, player) => {
    // Same checkWinner logic as before
  };

  const handleReplay = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner(null);
    setIsComputerTurn(false);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handlePress(index)}
      disabled={board[index] || winner || (isComputerTurn && player === 'O')}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((_, index) => (
          <React.Fragment key={index}>
            {renderSquare(index)}
            {(index + 1) % 3 === 0 && <View style={{ width: '100%', height: 10 }} />}
          </React.Fragment>
        ))}
      </View>
      <Text style={styles.status}>
        {winner ? (winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} wins!`) : `Next player: ${player}`}
      </Text>
      {winner && (
        <TouchableOpacity style={styles.button} onPress={handleReplay}>
          <Text style={styles.buttonText}>Replay</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginTop: 20,
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 20,
    marginTop: 20,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
