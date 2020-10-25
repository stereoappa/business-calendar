import {$} from "@/core/dom";
import {Component} from "@/core/Component";
import {Emitter} from "@core/Emitter";

export class Calendar extends Component {
    static className = 'calendar'

    constructor(options) {
        super($.create('div', Calendar.className), {
            ...options,
            emitter: new Emitter()
        })
    }

}
