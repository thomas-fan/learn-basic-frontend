function getPosTop(i, j) {
    return 20 + i * 120
}

function getPosLeft(i, j) {
    return 20 + j * 120
}

function getNumberBackgroundColor(num) {
    let color = "#fff"
    switch (num) {
        case 2:
            color = "#eee4da"
            return color
            break
        case 4:
            color = "#ede0c8"
            return color
            break
        case 8:
            color = "#f2b179"
            return color
            break
        case 16:
            color = "#f59563"
            return color
            break
        case 32:
            color = "#f67c5f"
            return color
            break
        case 64:
            color = "#f65e3b"
            return color
            break
        case 128:
            color = "#edcf72"
            return color
            break
        case 256:
            color = "#edcc61"
            return color
            break
        case 512:
            color = "#9c0"
            return color
            break
        case 1024:
            color = "#33b5e5"
            return color
            break
        case 2048:
            color = "#09c"
            return color
            break
        case 4096:
            color = "#a6c"
            return color
            break
        case 8192:
            color = "#93c"
            return color
            break
        default:
            return "black"
    }
}

function getNumberColor(num) {
    if (num <= 4) {
        return "#776e65"
    }

    return "white"

}


function nospace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false
            }
        }
    }
    return true
}

function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                return true
            }
        }
    }
    return false
}

function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
                return true
            }
        }
    }
    return false

}

function canMoveUp(board) {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
                return true
            }
        }
    }
    return false

}

function canMoveDown(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
                return true
            }
        }
    }
    return false

}

function noBlockHorizontal(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return false
        }
    }
    return true
}

function noBLockVertical(col, row1, row2, board) {
    for (let i = row1 + 1; i < row2; i++) {
        if (board[row1][col] !== 0) {
            return false
        }
    }

    return true

}

function noMove(board) {
    return canMoveUp(board) || canMoveDown(board) || canMoveRight(board) || canMoveLeft(board);

}