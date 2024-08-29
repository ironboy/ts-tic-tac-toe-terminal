import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {

  board: Board;
  // note: if order to not be forced to assign player instances
  // in the constructor (but be free to do in another method),
  // add this to tsconfig.json, 
  // under compilerOptions: "strictPropertyInitialization": false
  playerX: Player;
  playerO: Player;

  constructor() {
    // a while-loop that let us play the game repeatedly
    while (true) {
      this.createPlayers();
      this.board = new Board();
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      // ask if we should play again
      console.log('');
      let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
      if (playAgain !== 'ja') { break; }
    }
  }

  createPlayers(): void {
    console.clear();
    console.log('TIC-TAC-TOE\n');
    this.playerX = new Player(prompt('Spelare X:s namn: '), 'X', this.board);
    this.playerO = new Player(prompt('Spelare O:s namn: '), 'O', this.board);
  }

  startGameLoop(): void {
    // game loop - runs until the game is over
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      let player = this.board.currentPlayerColor === 'X'
        ? this.playerX : this.playerO;
      let move = prompt(
        `Ange ditt drag ${player.color} ${player.name} - skriv in rad,kolumn: `
      );
      // convert row and columns to numbers and zero-based indexes
      let [row, column] = move.split(',').map((x: string) => +x.trim() - 1);
      // try to make the move
      this.board.makeMove(player.color, row, column);
    }
  }

  whoHasWonOnGameOver(): void {
    // the game is over, tell the player who has one or if we have a draw
    console.clear();
    this.board.render();
    if (this.board.winner) {
      let winningPlayer = (this.board.winner === 'X' ? this.playerX : this.playerO);
      console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
    }
    else {
      console.log('Tyvärr det blev oavgjort...');
    }
  }

}