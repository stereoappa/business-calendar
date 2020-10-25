import moment from "moment";
import {DATETIME_FORMAT} from "@/constants";


export function parse(date, format = DATETIME_FORMAT) {
    let res
    if (typeof date === 'string'){
        res = moment(date, format)
    }
    else if (moment.isMoment(date)){
        res = moment(date)
    }
    else if (moment.isDate(date)) {
        return moment(date)
    }

    return res.isValid() ? res : false
}

export function toTime (str) {
    const parts = str.split(':')
    return {
        hour: +parts[0],
        minute: +parts[1]
    }
}

export function getWeekday(number, dayOfWeek = moment()) {
   return moment(dayOfWeek).isoWeekday(number)
}

export function getWeekdaysShortArray() {
    return moment.weekdaysMin(true)
}

export function getWeek(momentOfWeek = moment()) {
    const monday = moment(momentOfWeek).startOf('week')
    let res = [monday]


    for (let i = 2; i <= 7; i++) {
        res.push(getWeekday(i, monday))
    }
    return res
}

export function weeksStartOf(anyMoment, countOfWeek) {
    const firstMonthDay = moment(anyMoment).startOf('month')

    let weeks = []
    for (let i = 0; i< countOfWeek; i++) {
        weeks.push(getWeek(firstMonthDay))

        firstMonthDay.add(7, 'd')
    }

    return weeks
}
