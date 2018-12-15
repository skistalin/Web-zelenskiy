var tiles = []
var FreeCell = {y:3, x:3};
var shuffled = false;

function CreateCellNull() {
    var cell = document.createElement("div");
    cell.classList.add("field-cell", "field-cell-null");
    return cell;
}

function setCellOffset(cell) {
    cell.style.left = (16 + (16 + 80) * cell.x) + "px";
    cell.style.top = (16 + (16 + 80) * cell.y) + "px";
}

function appendCell(cell) {
    var field = document.getElementById("field");
    field.appendChild(cell);
}

function createField() {
    var x,y,cell;
    for (y=0; y<4; ++y) {
        for (x=0; x<4; ++x) {
            cell = CreateCellNull();
            cell.x = x;
            cell.y = y;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}

function CreateCellTile() {
    var cell = document.createElement("div");
    cell.classList.add("field-cell", "field-cell-tile");
    return cell;
}

function createTiles() {
    var x,y,cell,n;
    for (y=0; y<4; ++y) {
        for (x=0; x<4; ++x) {
            n = y*4+x+1;
            if (n<16) {
                cell = CreateCellTile();
                cell.x = x;
                cell.y = y;
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
                tiles.push(cell);
            }
        }
    }
}

function between(a,b,t) {
    return a <= t && t <=b || b <= t && t <= a;
}

function tileClick(event) {
    var bar = event.target;
    var i, tile;
    var oldx = bar.x, oldy = bar.y;
    
    if (bar.y == FreeCell.y) {
        for (i=0; i<tiles.length; ++i) {
            tile = tiles[i];
            if (tile.y == bar.y && between(bar.x, FreeCell.x, tile.x)) {
                    if (bar.x < FreeCell.x) tile.x += 1;
                    else tile.x -= 1;
                    setCellOffset(tile); 
                }
            }
        FreeCell = {y:oldy, x:oldx};   
    }
        
    
    else if (bar.x == FreeCell.x) {
        for (i=0; i<tiles.length; ++i) {
        tile = tiles[i];
            if (tile.x == bar.x && between(bar.y, FreeCell.y, tile.y)) {
                if (bar.y < FreeCell.y) tile.y += 1;
                else tile.y -= 1;
                setCellOffset(tile);  
            }
        }
        FreeCell = {y:oldy, x:oldx};
    }
    if(shuffled) {
    checkvictory();
    }
}
    
function animatetiles() {
    var i;
    for (i=0; i<tiles.length; ++i) {
        tiles[i].addEventListener("click", tileClick);
    }
}

function shuffleTiles() {
    var i, index;
    for (i=0; i<1000; ++i) {
        index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
    shuffled = true;
}

function checkvictory() {
    var i,n;
    for(i=0; i<tiles.length; ++i) {
        n= tiles[i].y * 4 * tiles[i].x + 1;
        if (tiles[i].innerHTML != n) return;
    }
    document.getElementById("modal").classList.add("modal-visible");
}

createField();
createTiles();
animatetiles();
shuffleTiles();