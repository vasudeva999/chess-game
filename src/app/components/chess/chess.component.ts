import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  
  grid: any = []
  line: any =[]
  lst: any =[]

  current_player: any
  previousPiece: any

  ngOnInit(): void {
    this.resetGrid()

  }

  test(){
    // this.grid[0][0] = ""
    // console.log(this.grid);
    // console.log(this.queenPossibility(2, 3));
     this.grid[1][4][1] = ''
    
  }

  onClick(pieceArray: any, x:any, y: any){
    x = 7-x
    let piece = pieceArray[0]
    if (piece[0] == this.current_player[0].toUpperCase()){
      if (pieceArray[1]=='red'){
        if (this.current_player == 'white'){
          this.current_player = 'black'
        }else{
          this.current_player = 'white'
        }
        
        if (this.grid[7-x][y][0].substring(5, 9) == "King"){
          this.router.navigate(["win/"+this.current_player])
        }
        this.grid[7-this.previousPiece[1]][this.previousPiece[2]][0] = ''
        this.grid[7-x][y][0] = this.previousPiece[0]
        
        this.removeDots()

        
      }
      return 
    }
    this.removeDots()
    
    let pieceName = piece[5]+piece[6]
    let color
    let possibility

    if (piece[0]=='W'){
      color = 'white'
      this.previousPiece = [piece, x, y]
    }else if (piece[0]=='B'){
      color = 'black'
      this.previousPiece = [piece, x, y]
    }
    
    if (pieceName == 'Ki'){
      possibility = this.kingPossibility(x, y)
    }else if (pieceName == 'Qu'){
      possibility = this.queenPossibility(x, y)
    }else if (pieceName == 'Ro'){
      possibility = this.rookPossibility(x, y)
    }else if (pieceName == 'Bi'){
      possibility = this.bishopPossibility(x, y)
    }else if (pieceName == 'Kn'){
      possibility = this.knightPossibility(x, y)
    }else if (pieceName == 'Pa'){
      possibility = this.pawnPossibility(color, x, y)
    }else if (piece[0]+piece[1]+piece[2] == 'dot'){
      if (this.current_player == 'white'){
        this.current_player = 'black'
      }else{
        this.current_player = 'white'
      }
      this.grid[7-this.previousPiece[1]][this.previousPiece[2]][0] = ''
      this.grid[7-x][y][0] = this.previousPiece[0]

      
      if ((7-x)==7 && this.grid[7-x][y][0][5] == 'P'){
        this.grid[7-x][y][0] = 'BlackQueen.svg'
      }else if ((7-x)==0 && this.grid[7-x][y][0][5] == 'P'){
        this.grid[7-x][y][0] = 'WhiteQueen.svg'
      }
      
    }
    
    for (let values in possibility){
      for (let idx of possibility[values]){
        let i = 7-idx[0]
        let j = idx[1]

        if (pieceName == "Pa" && (values == 'top_right' || values == 'top_left' 
        || values == 'bottom_left' || values == 'bottom_right')){
          if (this.grid[i][j][0] != '' && color != this.grid[i][j][0].substring(0,5).toLowerCase()){
            this.lst.push([i, j])
            this.grid[i][j][1] = 'red'
          }
          continue
        }
        
        if (this.grid[i][j][0] == ''){
          this.grid[i][j][0] = 'dot.svg'
        }else{
          if (pieceName != "Pa" && color != this.grid[i][j][0].substring(0,5).toLowerCase()){
            this.lst.push([i, j])
            this.grid[i][j][1] = 'red'
          }
          break
        }
      }
    }
    
    
  }

  removeDots(){
    for(let i=0; i<8; i++){
      for(let j=0; j<8; j++){
        if (this.grid[i][j][0] == "dot.svg"){
          this.grid[i][j][0] = ''
        }
      }
    }
    
    for (let idx of this.lst){
      let i = idx[0]
      let j = idx[1]
      this.grid[i][j][1] = ''
    }
  }


  resetGrid(){
    this.current_player = 'black'
    this.lst = []

    const blackPieces = [['BlackRook.svg', ''], ['BlackKnight.svg', ''], ['BlackBishop.svg', ''], ['BlackQueen.svg', ''], ['BlackKing.svg', ''], ['BlackBishop.svg', ''], ['BlackKnight.svg', ''], ['BlackRook.svg', '']]
    const whitePieces = [['WhiteRook.svg', ''], ['WhiteKnight.svg', ''], ['WhiteBishop.svg', ''], ['WhiteQueen.svg', ''], ['WhiteKing.svg', ''], ['WhiteBishop.svg', ''], ['WhiteKnight.svg', ''], ['WhiteRook.svg', '']]
    this.grid[0] = blackPieces
    this.grid[1] = []
    for(let i=0; i<8; i++){
      this.grid[1].push(['BlackPawn.svg', ''])
    }
    
    for(let i=2; i<6; i++){
      this.line = []
      for(let j=0; j<8; j++){
        this.line[j] = ['', '']
      }
      this.grid[i] = this.line
    }

    this.grid[6] = []
    for(let i=0; i<8; i++){
      this.grid[6].push(['WhitePawn.svg', ''])
    }
    this.grid[7] = whitePieces
    

    // console.log(this.grid);
    
  }

  kingPossibility(x: any, y: any){
    let all:any = {}
    if (x-1>=0 && y-1>=0){
      all['bottom_left'] = [[x-1, y-1]]  // bottom left
    }if (x-1>=0 && y+1<=7){
      all['bottom_right'] = [[x-1, y+1]]  // bottom right
    }if (x+1<=7 && y-1>=0){
      all['top_left'] = [[x+1, y-1]] // top left
    }if (x+1<=7 && y+1<=7){
      all['top_right'] = [[x+1, y+1]] // top right
    }if (x+1<=7){
      all['top'] = [[x+1, y]] // top
    }if (x-1>=7){
      all['bottom'] = [[x-1, y]] // bottom
    }if (y-1>=0){
      all['left'] = [[x, y-1]] // left
    }if(y+1<=7){
      all['right'] = [[x, y+1]] //right
    }
    return all
  }

  queenPossibility(x: any, y: any){
    let all:any = {}
    all['top'] = []
    all['bottom'] = []
    all['left'] = []
    all['right'] = []
    all['top_right'] = []
    all['top_left'] = []
    all['bottom_right'] = []
    all['bottom_left'] = []

    for (let i=x+1; i<=7; i++){ // top
      all['top'].push([i, y])
    }for (let i=x-1; i>=0; i--){ // bottom
      all['bottom'].push([i, y])
    }for (let j=y-1; j>=0; j--){ // left
      all['left'].push([x, j])
    }for (let j=y+1; j<=7; j++){ // right
      all['right'].push([x, j])
    }for (let i=x+1, j=y-1; i<=7 && j>=0; i++, j--){ // top left
      all['top_left'].push([i, j])
    }for (let i=x+1, j=y+1; i<=7 && j<=7; i++, j++){ // top right
      all['top_right'].push([i, j])
    }for (let i=x-1, j=y-1; i>=0 && j>=0; i--, j--){ // bottom left
      all['bottom_left'].push([i, j])
    }for (let i=x-1, j=y+1; i>=0 && j<=7; i--, j++){ // bottom right
      all['bottom_right'].push([i, j])
    }
    return all
  }

  rookPossibility(x: any, y: any){
    let all:any = {}
    all['top'] = []
    all['bottom'] = []
    all['left'] = []
    all['right'] =[]

    for (let i=x+1; i<=7; i++){ // top
      all['top'].push([i, y])
    }for (let i=x-1; i>=0; i--){ // bottom
      all['bottom'].push([i, y])
    }for (let j=y-1; j>=0; j--){ // left
      all['left'].push([x, j])
    }for (let j=y+1; j<=7; j++){ // right
      all['right'].push([x, j])
    }
    return all
  }

  bishopPossibility(x: any, y: any){
    let all:any = {}
    all['top_left'] = []
    all['top_right'] = []
    all['bottom_left'] = []
    all['bottom_right'] = []

    for (let i=x+1, j=y-1; i<=7 && j>=0; i++, j--){ // top left
      all['top_left'].push([i, j])
    }for (let i=x+1, j=y+1; i<=7 && j<=7; i++, j++){ // top right
      all['top_right'].push([i, j])
    }for (let i=x-1, j=y-1; i>=0 && j>=0; i--, j--){ // bottom left
      all['bottom_left'].push([i, j])
    }for (let i=x-1, j=y+1; i>=0 && j<=7; i--, j++){ // bottom right
      all['bottom_right'].push([i, j])
    }
    return all
  }

  knightPossibility(x: any, y: any){
    let all:any = {}
    
    if (x+2<=7 && y+1<=7){
      all['top_right_1'] = [[x+2, y+1]] // top right 1
    }if (x+1<=7 && y+2<=7){
      all['top_right_2'] = [[x+1, y+2]] // top right 2
    }if (x+2<=7 && y-1>=0){
      all['top_left_1'] = [[x+2, y-1]] // top left 1
    }if (x+1<=7 && y-2>=0){
      all['top_left_2'] = [[x+1, y-2]] // top left 2
    }if (x-1>=0 && y-2>=0){
      all['bottom_left_1'] = [[x-1, y-2]] // bottom left 1
    }if (x-2>=0 && y-1>=0){
      all['bottom_left_2'] = [[x-2, y-1]] // bottom left 2
    }if (x-2>=0 && y+1>=0){
      all['bottom_right_1'] = [[x-2, y+1]] // bottom right 1
    }if (x-1>=0 && y+2>=0){
      all['bottom_right_2'] = [[x-1, y+2]] // bottom right 2
    }
    return all
  }

  pawnPossibility(color: any, x: any, y: any){
    let all:any = {}
    if (color == 'white'){
      all['top'] = []
      all['top_left'] = []
      all['top_right'] = []
      if (x+1<=7){
        all['top'].push([x+1, y]) // top 1
        if (y-1>=0){
          all['top_left'].push([x+1, y-1])
        }if (y+1<=7){
          all['top_right'].push([x+1, y+1])
        }
      }if (x==1 && x+2<=7){
        all['top'].push([x+2, y]) // top 2
      }
    }else{
      all['bottom'] = []
      all['bottom_left'] = []
      all['bottom_right'] = []
      if (x-1>=0){
        all['bottom'].push([x-1, y]) // bottom 1
        if (y-1>=0){
          all['bottom_left'].push([x-1, y-1])
        }if (y+1<=7){
          all['bottom_right'].push([x-1, y+1])
        }
      }if (x==6 && x-2>=0){
        all['bottom'].push([x-2, y]) // bottom 2
      }
    }
    return all
  }

}
