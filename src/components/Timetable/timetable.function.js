import moment from "moment";
import {$} from "@core/dom";
import {parse} from "@core/datetime.utils";
import {HTML_DATE_FORMAT, TIMETABLE_ROW_HEIGHT} from "@/constants";

export function getDays(startDate, daysCoverage) {
    const coverage = []
    for (let i = 0; i < daysCoverage; i++) {
        coverage.push(moment(startDate).add(i, 'days'))
    }
    return coverage
}

export function getTimeline(stepInMinutes) {
    const iteratedTime = moment()
    iteratedTime.set({hour: 7, minute: 0, second: 0, millisecond: 0})

    let scale = []

    do {
        scale.push({
            hour: iteratedTime.hour(),
            minute: iteratedTime.minute()
        })
        iteratedTime.add(stepInMinutes, 'minutes')
    }
    while (iteratedTime.hour() !== 23)

    return {
        scale,
        stepInMinutes
    }
}

export function daySlots(slots, day) {
    return slots.filter(x => moment(x.date)
        .startOf('day')
        .diff(day.startOf('day')) === 0)
}

export function getMomentClick(event) {
    const date = $(event.target)
        .closest('[data-date]')
        .attr('data-date')

    const clientMoment = parse(date, HTML_DATE_FORMAT)
    const timelineBlock = $('[data-role=timeline]').getCoords()
    const timePointNumber = ((event.clientY - timelineBlock.y) / TIMETABLE_ROW_HEIGHT) + 1

    return clientMoment.set({
        hour: 6 + Math.trunc(timePointNumber),
        minute: Math.trunc(timePointNumber % 1 * 60)
    })
}

// export function round(m ,step = 30) {
//     const prevNear = m.minute() % step
//     const nextNear = m.minute().add(step) % step
//
//
//     return moment(m).add(remainder, "minutes");
// }
