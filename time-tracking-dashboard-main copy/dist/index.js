const timePeriods = document.querySelectorAll(".period")

timePeriods.forEach(timePeriod => timePeriod.addEventListener('click', changeTimePeriod))

function changeTimePeriod(e) {
    const targetEl = e.target;
    if (targetEl.classList.contains('active')) {
        return
    } else {
        const activeTimePeriods = document.querySelectorAll('.period.active')
        activeTimePeriods.forEach(activeTimePeriod => activeTimePeriod.classList.remove('active'))
        targetEl.classList.add('active')

        const activeTimeElements = document.querySelectorAll('.time.show')
        activeTimeElements.forEach(activeTime => activeTime.classList.remove('show'))

        const timeElements = document.querySelectorAll(`.time.${targetEl.id}`)
        timeElements.forEach(timeEl => timeEl.classList.add('show'))
    }
}
