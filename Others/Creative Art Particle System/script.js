const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const edge = 70
let is_drawing = false

const mouse = {
    x: null,
    y: null
}

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x
        this.y = y
        this.color = color
        this.centerX = centerX
        this.centerY = centerY
        this.speedX = 0
        this.speedY = 0
    }

    draw() {
        this.speedX += (Math.random() - .5) / 2
        this.speedY += (Math.random() - .5) / 2
        this.x += this.speedX
        this.y += this.speedY

        const distanceX = this.x - this.centerX
        const distanceY = this.y - this.centerY
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
        const radius = (-distance / edge + 1) * edge / 10

        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this))
            ctx.beginPath()
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.strokeStyle = 'black'
            ctx.stroke()
        }
    }
}

const branchOut = () => {
    if (is_drawing) {
        const centerX = mouse.x
        const centerY = mouse.y
        for (let i=0; i<3; ++i) {
            const root = new Root(mouse.x, mouse.y, 'orangered', centerX, centerY)
            root.draw()
        }
    }
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

window.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y

    // ctx.fillStyle = 'rgba(255,255,255,.03)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    branchOut()
})

window.addEventListener('mousedown', () => is_drawing = true)
window.addEventListener('mouseup', () => is_drawing = false)
