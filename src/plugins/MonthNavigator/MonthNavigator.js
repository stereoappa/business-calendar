import "./scss/monthnavigator.material.scss"
import {createByMoment} from "./monthNavigator.template";
import moment from "moment";
import {$} from "@core/dom";
import {capitalize} from "@core/utils";

export function monthNavigator(options) {
    return new MonthNavigator(options)
}

class MonthNavigator {
    constructor(options) {
        this.defaultDate = moment(options.defaultDate)
        this.listeners = ['click', 'mousedown']
        this.$root = this.getRoot()
    }

    embedTo(container$) {
        container$.append(this.getRoot())
        this.init()

        return this
    }

    init() {
        this.initDOMListeners()
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })

        function getMethodName(eventName) {
            return 'on' + capitalize(eventName)
        }
    }

    onClick(event) {
        const element = $(event.target).data['button']
        if (element === 'prev') {
            this.defaultDate.add(-1, 'M')
        }
        if (element === 'next') {
            this.defaultDate.add(1, 'M')
        }

        $('.month-navigator').clear().$el.insertAdjacentHTML('afterbegin', createByMoment(this.defaultDate))
    }

    onMousedown(event) {
        console.log(event.target)
    }

    onMouseup(event) {
        console.log(event.target)

    }

    getRoot() {
        if (this.$root) {
           return this.$root
        }

        const $root = $.create('div', 'month-navigator')
        $root.$el.insertAdjacentHTML('afterbegin', createByMoment(this.defaultDate))

         return $root
    }

    destroy() {

    }
}


