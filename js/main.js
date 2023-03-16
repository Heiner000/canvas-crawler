//  DOM SELECTORS
const movementDisplay = document.querySelector("#movement")
const statusDisplay = document.querySelector("#status")
const canvas = document.querySelector("canvas")
// console.log(movementDisplay, statusDisplay, canvas)  //  just for testing(no null/errors)

// CANVAS SETUP
const ctx = canvas.getContext("2d")
//  ask the DOM what size the canvas actually is in pixels
    // and set the canvas's resolution to be that size
canvas.setAttribute("height", getComputedStyle(canvas).height)
canvas.setAttribute("width", getComputedStyle(canvas).width)
// console.log(ctx) //  for testing
/*
//  set renderer properties
ctx.fillStyle = "green"
//  invoke renderer methods
// fillRect (x, y, width, height)
ctx.fillRect(10, 10, 100, 100)

//  set renderer properties
ctx.fillStyle = "purple"
    //  invoke renderer methods
ctx.fillRect(200, 200, 45, 190)

ctx.strokeStyle = "brown"
ctx.lineWidth = 15
ctx.strokeRect(45, 45, 50, 125)

//  group context property setting and method calls together, as we see fit
function drawBox(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h);
}

drawBox(50, 50, 35, 100, "orange")

canvas.addEventListener("click", e => {
    console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
    drawBox(e.offsetX, e.offsetY, 30, 30, "blue")
})
*/

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

document.addEventListener("keydown", handleKeyPressEvent)

//  GAME OBJECTS
const hero = new Crawler(0, 0, 45, 45, "hotpink")
const ogre = new Crawler(400, 120, 100, 150, "#bada55")

const gameLoopInterval = setInterval(gameLoop, 60)
// const testCrawler = new Crawler(10, 45, 100, 50, "blue")
// testCrawler.render()


function handleKeyPressEvent(e) {
    // console.log("a key was pressed") //  used for testing
    // console.log(`key press: ${e.key}`)   // help identifying which keys are pressed
    const speed = 10
    switch(e.key) {
        case "w":
        case "ArrowUp":
            hero.y -= speed
            // console.log("move the hero up")
            break
        case "s":
        case "ArrowDown":
            hero.y += speed
            // console.log("move the hero down")
            break
        case "a":
        case "ArrowLeft":
            hero.x -= speed
            // console.log("move the hero left")
            break
        case "d":
        case "ArrowRight":
            hero.x += speed
            // console.log("move the hero right")
            break
    }
    movementDisplay.innerText = `x: ${hero.x}, y: ${hero.y}`
}

function detectHit() {
    // axis aligned bounding box collision detection - AABB
    const left = ogre.x <= hero.width + hero.x
    const right = ogre.x + ogre.width >= hero.x
    const top = ogre.y <= hero.y + hero.height
    const bottom = ogre.y + ogre.height >= hero.y
    // console.log(left, right, top, bottom)
    if (left && top && bottom && right) {
        return true
    } else {
        return false
    }
}

function gameLoop() {
    // clear off the renderer
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //  business logic of our game
        // check for collision
        if (detectHit()) {
            //  end game here
            console.log("end the game!")
            //  kill ogre
            ogre.alive = false
            statusDisplay.innerText = "Our hero hath bravely vanquished thine Ogre! Huzzah!"
        }
        // check for end game conditions
        // do all of the rendering
        if (ogre.alive) {
            ogre.render()
        }
        hero.render()
}