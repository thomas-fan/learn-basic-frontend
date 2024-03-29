let board = []
let score = 0
let hasConflicted = []

let startX = 0
let startY = 0
let endX = 0
let endY = 0

document.body.addEventListener('touchmove', function (event) {
    event.preventDefault()
}, {passive: false})

$(document).ready(function () {
    prepareForMobile()
    newGame()
})

$('#newGameButton').on('click', function (event) {
    score = 0
    updateScore(score)
    newGame()
})

$('#newGameButton').on('touchstart', function (event) {
    score = 0
    updateScore(score)
    newGame()
})


$(document).on('touchstart', function (event) {
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
    event.preventDefault()
})



$(document).on('touchend', function (event) {
    event.preventDefault()
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY

    let deltaX = endX - startX
    let deltaY = endY - startY
    if (Math.abs(deltaX) < 0.2 * documentWidth && Math.abs(deltaY) < 0.2 * documentWidth) {
        return false
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            if (moveRight()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
        } else {
            if (moveLeft()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }

        }


    } else {
        if (deltaY > 0) {
            if (moveDown()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }

        } else {
            if (moveUp()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
        }

    }
})

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500
        cellSpace = 20
        cellSideLength = 100
    }
    $('#grid-container').css({
        'width': gridContainerWidth - 2 * cellSpace,
        'height': gridContainerWidth - 2 * cellSpace,
        'padding': cellSpace,
        'border-radius': 0.02 * gridContainerWidth,
    })

    $('.grid-cell').css({
        'width': cellSideLength,
        'height': cellSideLength,
        'border-radius': 0.02 * gridContainerWidth
    })

}

function newGame() {
    // 初始化棋盘格
    init()
    // 在随机两个格子生成数字
    generateOneNumber()
    generateOneNumber()
}

function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $(`#grid-cell-${i}-${j}`)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }

    }

    for (let i = 0; i < 4; i++) {
        board[i] = []
        hasConflicted[i] = []
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0
            hasConflicted[i][j] = false
        }
    }

    updateBoardView()
    score = 0
}

function updateBoardView() {
    $(".number-cell").remove()
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
            let theNumberCell = $(`#number-cell-${i}-${j}`)

            if (board[i][j] === 0) {
                theNumberCell.css("width", "0px")
                theNumberCell.css("height", "0px")
                theNumberCell.css("top", getPosTop(i, j) + cellSideLength / 2)
                theNumberCell.css("left", getPosLeft(i, j) + cellSideLength / 2)

            } else {
                theNumberCell.css("width", cellSideLength + 'px')
                theNumberCell.css("height", cellSideLength + 'px')
                theNumberCell.css("top", getPosTop(i, j))
                theNumberCell.css("left", getPosLeft(i, j))
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]))
                theNumberCell.css("color", getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
            }
            hasConflicted[i][j] = false

        }
        $('.number-cell').css({
            'line-height': cellSideLength + 'px',
            'font-size': 0.6 * cellSideLength + 'px'
        })
    }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false
    }

    // 随机一个位置
    let randX = parseInt(Math.floor(Math.random() * 4))
    let randY = parseInt(Math.floor(Math.random() * 4))
    let times = 0

    while (times === 0) {
        if (board[randX][randY] === 0) {
            break;
        }
        randX = parseInt(Math.floor(Math.random() * 4))
        randY = parseInt(Math.floor(Math.random() * 4))
        times++
    }
    if (times === 50) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randX = i
                    randY = j
                }
            }
        }
    }

    // 随机一个数字

    let randNumber = Math.random() < 0.5 ? 2 : 4

    // 在随机位置显示随机数字

    board[randX][randY] = randNumber
    showNumberWithAnimation(randX, randY, randNumber)

    return true
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:    // left
            event.preventDefault()
            if (moveLeft()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
            break
        case 38:    // up
            event.preventDefault()
            if (moveUp()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
            break
        case 39:    // right
            event.preventDefault()
            if (moveRight()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
            break
        case 40:    // down
            event.preventDefault()
            if (moveDown()) {
                setTimeout(generateOneNumber, 210)
                setTimeout(isGameOver, 300)
            }
            break;
        default:
            break;
    }
})

function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver()
    }
}

function gameOver() {
    alert('游戏结束！')
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false
    }

    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBLockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                    } else if (board[k][j] === board[i][j] && noBLockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j)

                        board[k][j] += board[i][j]
                        board[i][j] = 0;
                        score += board[i][k]
                        hasConflicted[k][j] = true
                        updateScore(score)
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200)

    return true
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = i + 1; k < 4; k++) {
                    if (board[k][j] === 0 && noBLockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                    } else if (board[k][j] === board[i][j] && noBLockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j)

                        board[k][j] += board[i][j]
                        board[i][j] = 0;
                        score += board[k][j]
                        updateScore(score)
                        hasConflicted[k][j] = true
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200)

    return true
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false
    }

    // moveRight
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                for (let k = j + 1; k < 4; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score += board[i][k]
                        updateScore(score)
                        hasConflicted[i][k] = true
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200)
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false
    }
    // moveLeft
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0

                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        // add
                        score += board[i][k]
                        updateScore(score)
                        hasConflicted[i][k] = true
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200)

    return true
}