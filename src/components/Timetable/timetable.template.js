import {daySlots} from "@/components/Timetable/timetable.function";
import {toTime} from "@core/datetime.utils";
import {HTML_DATE_FORMAT, TIMETABLE_ROW_HEIGHT} from "@/constants";


export function createTimetable(days, timeline, store = {}) {
    const week = days.map(day => createDay(day, timeline, store.getState().slotsState))
        .join('')
    const timelineHtml = timeline.scale.map(toTimePoint).join('')
    const grid = timeline.scale.map(t => `<div role="row"></div>`).join('')
    return `  
            <div class="row">
                ${createTableTitle(days)}
            </div>
            <div class="row">                      
                <div class="table-container">
                    <div class="timeline" data-role="timeline">${timelineHtml}</div>  
                    <div class="grid">${grid}</div>
                    <div class="vertical-grid-line line-delta"></div>
                    <div class="days">${week}</div>
                </div>                        
            </div>
            `
}

function createTableTitle(weekdays) {
    const tableTitle = weekdays.map(day =>
        `<div class="table-title">
            <div class="title-grid-serif"></div>
            <div class="data weekday">${day.locale('ru').format('dd')}</div>
            <div class="data number-day">${day.format('DD')}</div>
        </div>
        `)
        .join('')

    return `
        <div class="timeline"></div>
        <div class="line-delta"></div>     
        ${tableTitle}
    `
}

function toTimePoint(time) {
    const timeTitle = `${time.hour}:${time.minute.toString().padStart(2, '0')}`
    return `<div class="time-point" data-time-point="${timeTitle}">
                ${time.minute === 0 ? timeTitle : ''}
            </div>`
}

function createDay(day, timeline, slots = []) {
    const slotsOfDayHtml = daySlots(slots, day)
        .map(s => toSlot(s, timeline))
        .join('')

    return `
        <div class="day" data-date="${day.format(HTML_DATE_FORMAT)}">
             <div class="layout">${slotsOfDayHtml}</div>      
        </div>
    `
}

function toSlot({title, date, timeStart, timeEnd}, timeline) {
    return `
        <div 
            draggable="true" 
            class="slot"
            style="${slotStyles(timeStart, timeEnd, timeline)}">
            <div class="slot-content">
                <div class="slot-content-row">
                    ${title}
                </div>
                <div class="slot-content-row">
                    ${timeStart} - ${timeEnd}
                </div>
            </div>
        </div>
    `
}

function slotStyles(timeStart, timeEnd, timeline) {
    timeStart = toTime(timeStart)
    timeEnd = toTime(timeEnd)

    const inHourShift = timeStart.minute / 60

    const slotStartPosition = (timeline.scale.findIndex(t =>
        t.hour === timeStart.hour) + inHourShift) * TIMETABLE_ROW_HEIGHT

    const slotHeight = (
        ((timeEnd.hour - timeStart.hour) * 60 +
        (timeEnd.minute - timeStart.minute)) / timeline.stepInMinutes) * TIMETABLE_ROW_HEIGHT

    return `top:${slotStartPosition}px;height:${slotHeight}px`
}
