import {Component} from "@/core/Component";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {Timetable} from "@/components/Timetable/Timetable";

export class Workspace extends Component {
    static className = 'calendar__workspace'

    constructor($root, options) {
        super($root, {
            components: [
                {Sidebar},
                {Timetable, options: {
                    timestep: 60,
                    startDay: '03.10.2020',
                    daysCoverage: 7
                }}
            ],
            ...options
        })
    }
}
