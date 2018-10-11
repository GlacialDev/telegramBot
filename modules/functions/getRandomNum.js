export default function getRandomNum(min, max) {

  let roll = Math.random() * (max - min) + min
  let roundRoll = Math.round(roll)

  return roundRoll
}