function showNumberWithAnimation(x, y, num) {
    let numberCell = $(`#number-cell-${x}-${y}`)
    numberCell.css('background-color', getNumberBackgroundColor(num))
    numberCell.css('color', getNumberColor(num))
    numberCell.text(num)

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 50)
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    let numberCell = $(`#number-cell-${fromX}-${fromY}`)
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200)
}

function updateScore(score) {
    $("#score").text(score)
}