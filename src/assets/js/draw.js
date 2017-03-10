var numRows = 8, numColumns = 8, blockSize = 100;
var blockWhite = "#cc2030", blockGray = "#2f2f2f", highlightedColor = "#ff0088";
var selectedLineWidth = 4, selectedPiece = null;
var pieceLocation = JSON.parse(readJSON('../assets/json/pieces.json'));
var blackPiece = new Image();
blackPiece.src = '../assets/img/tariq.jpg';

//Making image objects
var redPiece = new Image();
redPiece.src = '../assets/img/redbutton.png';


var blackKingPiece = new Image();
blackKingPiece.src = '../assets/img/blackKing.png';


var redKingPiece = new Image();
redKingPiece.src = '../assets/img/redKing.png';

//drawing all elements of the canvas
function draw(){
    canvas = document.getElementById('checkerBoard');

    if(canvas.getContext){

        ctx = canvas.getContext('2d');

        blockSize = canvas.height / numRows;

        drawBoard(numRows, canvas);

        drawPieces(pieceLocation);

        canvas.addEventListener('click',boardClick,false);
    }
    else{
        alert('Your phone is too outdate. Visit the nearest cellular store to upgrade...today...');
    }
}

//responsible for drawing the board
function drawBoard(numRows, canvas){
    var rowCounter;
    ctx = canvas.getContext('2d');

    for(rowCounter = 0; rowCounter < numRows; rowCounter++){
        drawRow(rowCounter);
    }

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, numRows * blockSize, numColumns * blockSize);
}

//draws a single row and goes row by row in above methods for loop
function drawRow(rowCounter){
    var blockCounter;

    for(blockCounter = 0; blockCounter < numColumns; blockCounter++){
        drawBlock(rowCounter, blockCounter);
    }
}

//draws a single block based on block number and which row it is on
function drawBlock(rowCounter, blockCounter){
    ctx.fillStyle = getBlockColor(rowCounter, blockCounter);
    ctx.fillRect(rowCounter * blockSize, blockCounter * blockSize, blockSize, blockSize);
    ctx.stroke();
}

//gets the color that the block is supposed to be
function getBlockColor(rowCounter, blockCounter){
    var cStartColor;

    if (rowCounter % 2){
        cStartColor = (blockCounter % 2 ? blockWhite : blockGray);
        //if the row is even gets the block and divides its number in the row to alternate the color scheme, hence the board
    }else{
        cStartColor = (blockCounter % 2 ? blockGray : blockWhite);
    }
    return cStartColor;
}

function readJSON(file){
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if(request.status == 200){
        console.log(request.responseText);
        return request.responseText;
    }
};

function drawPieces(pieceLocation){
    drawTeamOfPieces(pieceLocation);
}

function drawTeamOfPieces(pieces){

    for(var i = 0; i < pieces.length; i++){
        for(var j = 0; j < pieces[i].length; j++){
            if(pieces[i][j].identifier !== -1){
                drawPiece(pieces[i][j]);
            }
        }
    }
}

function drawPiece(currentPiece){
    var imageCoord = getPieceCord(currentPiece);
    if(currentPiece.color == "red" && currentPiece.isKing == false){
        ctx.drawImage(redPiece, imageCoord.x, imageCoord.y, blockSize, blockSize);
    }
    else if(currentPiece.color == "red" && currentPiece.isKing == true){
        ctx.drawImage(redKingPiece, imageCoord.x, imageCoord.y, blockSize, blockSize);
    }
    else if(currentPiece.color == "black" && currentPiece.isKing == false){
        ctx.drawImage(blackPiece, imageCoord.x, imageCoord.y, blockSize, blockSize);
    }
    else if(currentPiece.color == "black" && currentPiece.isKing == true){
        ctx.drawImage(blackKingPiece, imageCoord.x, imageCoord.y, blockSize, blockSize);
    }
}

function getPieceCord(piece){
    var imageCoords = {
        "x": piece.column * blockSize,
        "y": piece.row * blockSize
    };
    return imageCoords;
}

function getPieceAtBlock(pieces, clickedBlock){

    var currentPiece = null,
    rowCounter = 0,
    pieceAtBlock = null;

    for (rowCounter = 0; rowCounter < 8; rowCounter++){
        for(colCounter = 0; colCounter < 8; colCounter++){

            currentPiece = pieces[rowCounter][colCounter];

            if (currentPiece.column === clickedBlock.column && currentPiece.row === clickedBlock.row){
                console.log('In getPieceAtBlock() currentPiece= ' + currentPiece.identifier + "getting inside if statement");
                currentPiece.identifier = [rowCounter][colCounter];
                pieceAtBlock = currentPiece;
                console.log("Piece at block = " + pieceAtBlock.identifier);
                pieceCounter = pieces.length;
            }
        }
    }
    return pieceAtBlock;
}

function screenToBlock(x,y){
    var block = {
        "row": Math.floor(y / blockSize),
        "column": Math.floor(x / blockSize)
    };
    return block;
}

function selectPiece(pieceAtBlock){
    ctx.lineWidth = selectedLineWidth;
    ctx.strokeStyle = highlightedColor;
    ctx.strokeRect((pieceAtBlock.column * blockSize) + selectedLineWidth, (pieceAtBlock.column) + selectedLineWidth, blockSize - (selectedLineWidth * 2), blockSize - (selectedLineWidth * 2));

    selectedPiece = pieceAtBlock;
}

function removeSelectPiece(selectedPiece){
    drawBlock(selectedPiece.column, selectedPiece.row);
    drawPiece(selectedPiece);
}

function checkIfPieceClicked(clickedBlock){
    console.log('Checking if Piece Clicked!');
    var pieceAtBlock = getPieceAtBlock(pieceLocation, clickedBlock);
    console.log(pieceAtBlock);
    if(pieceAtBlock !== null){
        selectPiece(pieceAtBlock);
    }
}

function movePiece(clickedBlock){
    drawBlock(selectedPiece.column, selectedPiece.row);
    console.log('Reaching move piece func!');
    pieceLocation[selectedPiece.row][selectedPiece.column].column = clickedBlock.column;
    pieceLocation[selectedPiece.row][selectedPiece.column].column = clickedBlock.row;

    drawPiece(selectedPiece);
    selectedPiece = null;
}

function processMove(clickedBlock){
    console.log('Processing move!')
    var pieceAtBlock = getPieceAtBlock(pieceLocation,clickedBlock);
    console.log("Got the piece in processMove");
    if(pieceAtBlock !== null){
        removeSelectPiece(selectedPiece);
        checkIfPieceClicked(clickedBlock);
    }
    else{
        movePiece(clickedBlock);
    }
}

function resize(){

    var canvas = document.getElementById('checkerBoard');

	var width = window.innerWidth;
	var ratio = canvas.width/canvas.height;
	var height = width * ratio;

	canvas.style.width = width+'px';
	canvas.style.height = height+'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize',resize,false);

function boardClick(event){
    var xCord = event.clientX - canvas.offsetLeft;
    var yCord = event.clientY - canvas.offsetTop;
    clickedBlock = screenToBlock(xCord, yCord);
    console.log(xCord,yCord);

    if(selectedPiece == null){
        checkIfPieceClicked(clickedBlock);
        console.log('Hitting null!');
    }
    else{
        processMove(clickedBlock);
        console.log('Reaching processMove()');
    }
}
