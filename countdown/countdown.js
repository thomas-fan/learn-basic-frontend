let WINDOW_WIDTH = 1024
let WINDOW_HEIGHT = 768
let RADIUS = 8
let MARGIN_TOP = 60
let MARGIN_LEFT = 30

const endTime = new Date()
endTime.setTime(endTime.getTime() + 3600 * 1000)
let curShowTimeSeconds = 0

let balls = []
const colors = ["red", "yellow", "blue", "orange", "gray"];

window.onload = function () {
    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)

    let canvas = document.getElementById("canvas")
    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    let context = canvas.getContext("2d")
    if (!context) {
        alert("当前浏览器不支持Canvas，请更换浏览器")
        return false;
    }

    curShowTimeSeconds = getCurrentShowTimeSeconds()

    setInterval(function () {
        render(context)
        update()

    }, 50)


}

function update() {
    let nextShowTimeSeconds = getCurrentShowTimeSeconds();
    let nextHours = parseInt(nextShowTimeSeconds / 3600)
    let nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    let nextSeconds = nextShowTimeSeconds % 60

    let curHours = parseInt(curShowTimeSeconds / 3600)
    let curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    let curSeconds = curShowTimeSeconds % 60

    if (nextSeconds !== curSeconds) {
        if (parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10))
        }

        if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10))
        }

        if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10))
        }

        if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10))
        }

        if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10))
        }

        if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10))
        }

        curShowTimeSeconds = nextShowTimeSeconds
    }

    updateBalls()

}

function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS
            balls[i].vy = -balls[i].vy * 0.75
        }
    }

    let cnt = 0
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i]
        }
    }

    while (balls.length > Math.min(cnt, 300)) {
        balls.pop()
    }
}

function addBalls(x, y, number) {

    for (let i = 0; i < digit[number].length; i++) {
        for (let j = 0; j < digit[number][i].length; j++) {
            if (digit[number][i][j] === 1) {
                let Ball = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(Ball)
            }
        }
    }
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

    let hours = parseInt(curShowTimeSeconds / 3600)
    let minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    let seconds = curShowTimeSeconds % 60

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)

    for (let i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color
        ctx.beginPath()
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
        ctx.closePath()
        ctx.fill()
    }
}

function getCurrentShowTimeSeconds() {
    let curTime = new Date()
    let ret = endTime.getTime() - curTime.getTime()
    ret = Math.round(ret / 1000)
    // 更改为时钟代码
    // return ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds()
    return ret >= 0 ? ret : 0
}

function renderDigit(x, y, number, ctx) {
    ctx.fillStyle = "rgb(0,102,153)"
    for (let i = 0; i < digit[number].length; i++) {
        for (let j = 0; j < digit[number][i].length; j++) {
            if (digit[number][i][j] === 1) {
                ctx.beginPath()
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath()

                ctx.fill()
            }
        }
    }

}
