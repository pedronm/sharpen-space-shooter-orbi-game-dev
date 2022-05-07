const yourShip = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')
const aliensImg = ['assets/img/monster-1.png', 'assets/img/monster-2.png']
const instructionsText = document.querySelector('.game-instructions')
const startButon = documet.querySelector('.start-button')
let alienInterval

function flyShip(event){
    if(event.key === 'arrowUp'){
        event.preventDefault()
    } else if(event.key === 'ArrowDown'){
        event.preventDefault()
        moveDown()
    } else if(event.key === " "){
        event.preventDefault()
        fireLaser()
    }
}

function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition === '0px'){
        return
    }else{
        let position = parseInt(topPosition)
        position -= 50
        yourShip.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition === "500px"){
        return
    }else{
        let position = parseInt(topPosition)
        position += 50
        yourShip.style.top = `${position}px`
    }
}

function fireLaser(){
    let laser = createLaserElement()
    playArea.appendChild(laser)
    moveLaser(laser)
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'))
    let newLaser  = document.createElement('img')
    newLaser.src = '/assets/img/shoot.pnt'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`
    return newLaser
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)

        if(xPosition === 340){
            laser.remove()
        }else{
            laser.style.left = `${xPosition + 0}px`
        }
    }, 10)
}

function createAliens(){
    let newAlien = document.createElement('img')
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]
    newAlien.src = alienSprite
    newAlien.classList.add('alien')
    newAlien.classList.add('alien-transition')
    newAlien.style.left = '370px'
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`
    playArea.appendChild(newAlien)
    moveAlien(newAlien)
}

function moveAlien(){
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        let aliens = document.querySelectorAll('.alien')

        aliens.forEach((alien) => {
            if(checkLaserCollision(laser, alien)){
                alien.src = 'assets/img/explosao.png'
                alien.classList.remove('alien')
                alien.classList.add('dead-alien')
            }
        })
        if(xPosition <= 50){
            if(Array.from(alien.classList).includes('dead-alien')){
                alien.remove()
            }else if(false){
                gameOver()
            }else{
                alien.style.left=`${xPosition -4}px`
            }
        }
    }, 30)
}

function checkLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.left)
    let alienLeft = parseInt(alien.style.left)
    let alienBottom = alienTop - 20;

    if(laserLeft != 340 && laserLeft +40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true
        }else{
            return false
        }
    }else{
        return false
    }

}

function gameOver(){
    window.removeEventListener('keydown', flyShip)
    clearInterval(alienInterval)
    let aliens = document.querySelectorAll('.alien')
    aliens.forEach((alien) => alien.remove)
    let lasers = document.querySelectorAll('.laser')
    lasers.forEach((laser) => laser.remove)
    setTimeout(() => {
        alert('game over!')
        yourShip.style.top ="250px"
        startButon.style.display = "block"
        instructionsText.style.display = "block"
    })
}

startButon.addEventListener('click', (event) => {
    playGame
})

function playGame(){
    startButon.style.display = 'none'
    instructionsText.style.display = 'none'
    window.addEventListener('keydown', flyShip)
    alienInterval = setInterval(() => {
        createAliens()
    }, 2000)
    
}

