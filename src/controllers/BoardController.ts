import { Component } from '@angular/core';
import { BoardService } from '../services/BoardService';

@Component({
  providers: [BoardService]
})
export class BoardController {
  constructor(private boardService: BoardService) {}

  getBoard() {
    this.boardService.getBoard();
  }
}


// .controller('LoginCtrl', function($scope) {
//   $scope.data = {};
//
//   $scope.login = function() {}
// })
