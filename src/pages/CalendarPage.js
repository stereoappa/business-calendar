import {storage} from "@core/utils";
import {createStore} from "@core/store/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {defaultState} from "@/redux/initialState";
import {Calendar} from "@/components/Calendar/Calendar";
import {Header} from "@/components/Header/Header";
import {Workspace} from "@/components/Workspace/Workspace";
import {Page} from "@core/page/Page";

export class CalendarPage extends Page {
    constructor(param) {
        super(param)

        this.storeSub = null
    }

    getRoot() {
        const state = storage('calendar')
        const store = createStore(rootReducer, state || defaultState)

        this.storeSub = store.subscribe(state => {
            storage('calendar', state)
            console.log('New app state:', state)
        })

        this.calendar = new Calendar({
            components: [{Header}, {Workspace}],
            store
        })

        return this.calendar.getRoot()
    }

    afterRender() {
        this.calendar.init()
    }

    destroy() {
        this.calendar.destroy()
        this.storeSub.unsubscribe()
    }
}
