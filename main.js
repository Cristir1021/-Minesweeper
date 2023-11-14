const array1 = new Array();
const array = [];
var uncovered = 0

function setGame(b) {
    var a = "<div class=\"btn-toolbar mb-3\" role=\"toolbar\" aria-label=\"Toolbar with button groups\"><div class=\"btn-group-vertical\" id = \"buttonsSet\"><div class=\"btn-group me-2\" role=\"group\" aria-label=\"First group\">";
    var mapHeight, mapWidth, nrMines, mapSize;
    if (b == 1) {
        mapHeight = 9, mapWidth = 9, nrMines = 10;
    }
    if (b == 2) {
        mapHeight = 16, mapWidth = 16, nrMines = 40;
    }
    if (b == 3) {
        mapHeight = 16, mapWidth = 30, nrMines = 99;
    }
    mapSize = mapHeight * mapWidth;
    insertMinesRandom(mapHeight, mapWidth, nrMines);
    addNrMinesNear(mapHeight, mapWidth);
    var p = 1;
    for (var i = 0; i < mapHeight; ++i) {
        for (var j = 0; j < mapWidth; ++j) {
            array[p] = array1[i][j];
            a += "<button type=\"button\" class=\"btn btn-outline-secondary\"  oncontextmenu=\"return flagThis(this); return false;\" onclick=\"return showValue(this, " + mapHeight + ", " + mapWidth + ", " + nrMines +");\"style=\"width: 2.4rem; height: 2.4rem;\" id=\"" + p + "\"></button>";
            if (p % mapWidth == 0) {
                a += "</div> <div class=\"btn-group me-2\" role=\"group\" aria-label=\"First group\">";
            }
            ++p;
        }
    }
    a += "</div></div>"
    document.getElementById("page1").innerHTML=a;
    document.getElementById("whatToDo").innerHTML="Now you have to find where are the mines and not press on them";
    return false;
}

function insertMinesRandom(mapHeight, mapWidth, nrMines) {
    var q , w;
    for (var i = 0; i < mapHeight; ++i) {
        array1[i] = new Array(mapWidth).fill(0);
    }
    for (var i = 0; i < nrMines; ++i) {
        do {
            q = Math.floor(Math.random() * mapHeight);
            w = Math.floor(Math.random() * mapWidth);
        } while (array1[q][w] == 'M');
        array1[q][w] = 'M';
    }
}

function addNrMinesNear(mapHeight, mapWidth) {
    var lin, col;
    for (var i = 0; i < mapHeight; ++i) {
        for (var j = 0; j < mapWidth; ++j) {
            if (array1[i][j] == 'M') {
                var lin = i - 1;
                if (i == 0) {
                    ++lin;
                } 
                var col = j - 1;
                if (j == 0) {
                    ++col;
                } 
                for (; lin <= i + 1 && lin < mapHeight; ++lin) {
                    for (var colj = col; colj <= j + 1 && colj < mapWidth; ++colj) {
                        if (array1[lin][colj] != 'M') {
                            ++array1[lin][colj];
                        }
                    }
                }
            }
        }
    }
}

function uncover(v, mapHeight, mapWidth) {
    var g = Number(v);
    if (document.getElementById(g).disabled==false) {
        document.getElementById(g).disabled=true;
        document.getElementById(g).innerHTML=array[g];
        ++uncovered;
    }
    if ((g-1) % mapWidth != 0) {
        discover(g-1, mapHeight, mapWidth);
    }
    if ((g+1) % mapWidth != 1) {
        discover(g+1, mapHeight, mapWidth);
    }
    if ((g+mapWidth) / (mapWidth * mapHeight) <= 1) {
        discover(g+mapWidth, mapHeight, mapWidth);
    }
    if ((g+mapWidth-1) / (mapWidth * mapHeight) < 1 && (g+mapWidth-1) % mapWidth != 0) {
        discover(g+mapWidth-1, mapHeight, mapWidth);
    }
    if ((g+mapWidth+1) / (mapWidth * mapHeight) <= 1 && (g+mapWidth+1) % mapWidth != 1) {
        discover(g+mapWidth+1, mapHeight, mapWidth);
    }
    if ((g-mapWidth) > 0) {
        discover(g-mapWidth, mapHeight, mapWidth);
    }
    if ((g-mapWidth-1) > 0 && (g-mapWidth-1) % mapWidth != 0) {
        discover(g-mapWidth-1, mapHeight, mapWidth);
    }
    if ((g-mapWidth+1) > 0 && (g-mapWidth+1) % mapWidth != 1) {
        discover(g-mapWidth+1, mapHeight, mapWidth);
    }
}

function discover(id, mapHeight, mapWidth) {
    if (document.getElementById(id).disabled==false) {
        document.getElementById(id).disabled=true;
        document.getElementById(id).innerHTML=array[id];
        ++uncovered;
        if (array[id] == 0) {
            uncover(id, mapHeight, mapWidth);
        }
    }
}

function showValue(e, mapHeight, mapWidth, nrMines) {
    if (array[e.id] == 'M') {
        document.getElementById(e.id).style.backgroundColor="red";
        document.getElementById("whatToDo").innerHTML="<H4 style=\"font-size: 50px;\">GAME OVER</H4> <button class=\"btn btn-primary\" type=\"button\" onclick=\"return restart();\">Restart Game</button>";
        for (var i = 0; i <= mapHeight * mapWidth; ++i) {
            if (array[i] == 'M') {
                document.getElementById(i).disabled=true;
                document.getElementById(i).innerHTML=array[i];
            }
        }
    } else if (array[e.id] == 0) {
        uncover(e.id, mapHeight, mapWidth);
    }
    if (document.getElementById(e.id).disabled==false) {
        document.getElementById(e.id).disabled=true;
        document.getElementById(e.id).innerHTML=array[e.id];
        ++uncovered;
    }
    if (mapHeight * mapWidth - uncovered == nrMines) {
        document.getElementById("whatToDo").innerHTML="<H4 style=\"font-size: 50px;\">Congratulation!</H4> <button class=\"btn btn-primary\" type=\"button\" onclick=\"return restart();\">Restart Game</button>";
    }
    return false;
}

function flagThis(e) {
    if (document.getElementById(e.id).innerHTML=="<img src=\"redFlag.png\">") {
        document.getElementById(e.id).innerHTML="";
    } else {
        document.getElementById(e.id).innerHTML="<img src=\"redFlag.png\">";
    }
    return false;
}

function restart() {
    location.reload();
    return false;
}