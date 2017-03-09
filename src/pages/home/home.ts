import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { BoardService } from '../../services/BoardService';
// import { GetCheckers } from '../../hardcodedcheckers/getcheckers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BoardService]
})

export class BoardController {
  constructor(private boardService: BoardService) {}

  getBoard() {
    this.boardService.getBoard();
  }
}
//
// export class HomePage {
//
//   constructor(public navCtrl: NavController) {
//   }
//
// }
