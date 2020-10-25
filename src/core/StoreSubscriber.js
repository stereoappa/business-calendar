import {isEqual} from "@core/utils";

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.prevState = {}
        this.subs = []
    }

    subscribeComponent(component) {
        this.prevState = this.store.getState()
        const sub = this.store.subscribe(state => {
              Object.keys(state).forEach(key => {
                  if(!isEqual(this.prevState[key], state[key])) {
                    if (component.subscribe.includes(key)) {
                        component.storeChanged({[key]: state[key]})
                    }
                  }
              })
        })

        this.subs.push(sub)
    }

    unsubscribeFromStore() {
        this.subs.forEach(s => s.unsubscribe())
    }
}


