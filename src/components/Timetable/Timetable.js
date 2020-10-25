import {Component} from "@/core/Component";
import {createTimetable} from "@/components/Timetable/timetable.template";
import {getTimeline, getDays, getMomentClick, round} from "@/components/Timetable/timetable.function";
import {$} from "@core/dom";
import {templates} from "@/widgets/modal.template";
import {getWeekday, parse} from "@core/datetime.utils";
import {addSlot} from "@/redux/actions";
import {Modals} from "@/widgets/modal";


export class Timetable extends Component {
    static className = 'timetable'

    constructor($root, options) {
        super($root, {
                name: 'Timetable',
                listeners: ['click'],
                subscribe: ['slotsState'],
                ...options
            }
        )

        this.timestep = options.timestep || 60
        this.startDay = parse(options.startDay) || getWeekday(1)
        this.daysCoverage = options.daysCoverage || 7

        this.days = getDays(this.startDay, this.daysCoverage)
        this.timeline = getTimeline(this.timestep)
    }


    storeChanged(changes) {
        this.$root.html(this.toHTML())
    }

    onClick(event) {
        if (event.target.dataset.date) {
            const momentClient = getMomentClick(event)

            const createModal = Modals.create({
                style: {margin: '250px auto'},
                callback: (data) => {
                    this.$dispatch(addSlot(data))
                }
            })
            createModal.setData({
                initialDate: momentClient,
                timeStart: momentClient.toObject(),
                timeEnd: momentClient.toObject()
            })
            createModal.open()
        }
    }

    toHTML() {
        return createTimetable(this.days, this.timeline, this.store)
    }
}
