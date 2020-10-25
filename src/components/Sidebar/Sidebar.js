import {Component} from "@/core/Component";
import {monthNavigator} from "@/plugins/MonthNavigator/MonthNavigator";
import moment from "moment";

export class Sidebar extends Component {
    static className = 'sidebar'

    constructor($root, options) {
        super($root, options)

    }

    init() {
        super.init()
        monthNavigator({
            defaultDate: moment(),
            mode: 'range', // or 'single', 'multiple'
            onChange: (selectedDates) => {}
        }).embedTo(this.$root.find('.month-navigator-wrapper'))
    }

    toHTML() {
        return `
            <div class="title">
                <button class="create-btn">Создать</button>
            </div>
            <div class="month-navigator-wrapper"></div>
        `
    }
}
