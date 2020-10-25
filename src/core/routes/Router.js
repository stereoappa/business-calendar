import {$} from '@core/dom';
import {CalendarPage} from "@/pages/CalendarPage";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Router {
    constructor(selector) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }

        this.$placeholder = $(selector)
        this.page = null

        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    async changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }

        this.page = new CalendarPage(ActiveRoute.param)

        const root = await this.page.getRoot()
        this.$placeholder.clear().append(root)

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}
