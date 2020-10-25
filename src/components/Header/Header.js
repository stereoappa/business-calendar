import {Component} from "@/core/Component";
import {$} from "@core/dom";

export class Header extends Component{
    static className = 'calendar__header'

    constructor($root, options) {
        super($root, options)
    }

    toHTML() {
        return `<h2>Header</h2>`
    }
}
