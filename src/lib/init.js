const debug = require('debug')('ok:init')
// input
// @x {int}
// @y {int}
// @person {int}
// @thunder {int}
// return
// @ctx canvas node
// @poeceLocation {array}
// @chessArr {doble arr}
// @nowChessMan {string}

// @beginPath {int}
// @distance {int}
export default (x = 15, person = 1, thunderLev = 1) => { 
  const canvas = document.querySelector('canvas')
  if(!canvas) return debug ('canvas is undefined') 
  x = parseInt(x)
  if(isNaN(x)) return debug('input cant catch')
  if(x > 40) return debug('init x 太大')
  const distance = Math.floor((canvas.width/x)/10)*10
  const beginPath = (canvas.width - distance * (x-1))/2
  //debug('show', beginPath)
  const ctx = canvas.getContext('2d')
  const chessFactor = 2
  const pieceLocation = [ ~~(x/chessFactor)+1, ~~(x/chessFactor)+1 ]
  const nowChessMan = 'person'
  let chessArr = []
  const { width, height } = canvas
  // chessArr.concat([ 0, 0, 0, 0 ])
  for(let i = 0; i < x; i++) chessArr.push(new Array(x).fill(0))
  ctx.fillRect(0, 0, width, height)
  for(let i = 0; i < x; i++) {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.moveTo(beginPath + i * distance, beginPath)
    ctx.lineTo(beginPath + i * distance, height-beginPath)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.moveTo(beginPath, beginPath + i * distance)
    ctx.lineTo(height-beginPath, beginPath + i * distance)
    ctx.stroke()
  }

  debug ('init return value', ctx, pieceLocation, chessArr, nowChessMan)
  return { ctx, pieceLocation, chessArr, nowChessMan, beginPath, distance }
}
