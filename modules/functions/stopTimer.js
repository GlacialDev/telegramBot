// остановка таймера

export default function stopTimer(timerName) {
    clearInterval(timerName)
    timerName = null
}