import moment from "moment";
import {getWeek, getWeekdaysShortArray, weeksStartOf} from "@core/datetime.utils";

export function createByMoment(m) {

    return `
       <div class="month-navigator__body">
           <div class="selector-row">
              ${monthSelector(m)}
           </div>
               
           <div role="grid" class="table">
               <div class="row week-header">
                   ${getWeekdaysShortArray().map(dayHeader).join('')}
               </div>
               <div class="row-group">
                   ${daysGrid(m)}       
               </div>
           </div>
       </div>
    `
}

function monthSelector(moment) {
    return `    
          <span class="title">${moment.format("MMMM YYYY")}</span>
          <div data-button="prev" class="button mr-6">
            <i data-button="prev" class="material-icons">navigate_before</i>
          </div>
          <div data-button="next" class="button next-month">
            <i data-button="next" class="material-icons">navigate_next</i>
          </div>   
`
}

function dayHeader(title) {
    return `
         <span class="weekday-title cell" 
             data-text="Воскресенье" 
             data-tooltip-position="bottom">
             ${title}
         </span>
    `
}

function daysGrid(userMoment) {
    const weeks = weeksStartOf(userMoment, 6)

    let res = ''
    weeks.map(w => {
            res += `<div class="row">`
            res += w.map(d => {
                const active = moment().isSame(d, 'days') ? 'active' : ''
                const grayDay = d.isSame(userMoment, 'month') ? '' : 'gray-day'
                return `<span class="cell ${active}${grayDay}"><div class="day-number">${d.date()}</div></span>`
            }).join('')
            res += `</div>`
        }).join('')

    return res
}



