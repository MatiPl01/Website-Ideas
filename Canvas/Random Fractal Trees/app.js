const canvas = document.querySelector('.canvas')
const generateButton = document.querySelector('.generate-tree-button')
canvas.width = 1000
canvas.height = 1000
const ctx = canvas.getContext('2d')

let curve = curve2 = 10;

const drawTree = (startX, startY, len, angle, branchWidth, c1, c2) => {
    ctx.beginPath()
    ctx.save()
    ctx.strokeStyle = c1
    ctx.fillStyle = c2
    ctx.shadowBlur = 15
    ctx.shadowColor = 'black'
    ctx.lineWidth = branchWidth
    ctx.translate(startX, startY)
    ctx.rotate(angle * Math.PI/180)
    ctx.moveTo(0,0)
    //ctx.lineTo(0, -len)
    if (angle > 0) ctx.bezierCurveTo(curve2, -len/2, curve2, -len/2, 0, -len)
    else ctx.bezierCurveTo(-curve2, -len/2, -curve2, -len/2, 0, -len)
    ctx.stroke()

    if (len < 10) {
        // leaves
        ctx.beginPath()
        ctx.arc(0, -len, 15, 0, Math.PI/2)
        ctx.fill()
        ctx.restore()
        return
    }

    drawTree(0, -len, len * .8, angle + curve, branchWidth * .6)
    drawTree(0, -len, len * .8, angle - curve, branchWidth * .6)

    ctx.restore()
}

const getRandomRGBColor = () => `rgb(${[255,255,255].map(c => Math.floor(c * Math.random())).join()})`

const generateRandomTree = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let len = Math.floor((Math.random() * 30) + 100)
    let angle = 0
    let branchWidth = (Math.random() * 140) + 1
    let c1 = getRandomRGBColor()
    let c2 = getRandomRGBColor()

    drawTree(canvas.width/2, canvas.height - 100, len, angle, branchWidth, c1, c2)
    generateButton.style.background = c1
    document.body.style.background = `radial-gradient(${getRandomRGBColor()}, black)`
    curve = Math.random()*20 + 2
    curve2 = Math.random()*35
}

generateRandomTree()
generateButton.addEventListener('click', generateRandomTree)
