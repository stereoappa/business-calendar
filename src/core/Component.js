import {$} from "@core/dom";
import {DomListener} from "@core/DomListener ";
import {StoreSubscriber} from "@core/StoreSubscriber";

export class Component extends DomListener {
    constructor($root, options) {
        super($root, options.listeners)

        this.name = options.name || ''
        this.emitter = options.emitter || {}
        this.unsubscribers = []

        this.store = options.store || {}
        this.subscriber = new StoreSubscriber(options.store)
        this.subscribe = options.subscribe || []

        // create instances of nested components
        let {components, ...baseOptions} = options
        this.components = components && components.map(c => {
            const ComponentType = c[Object.keys(c)[0]]
            return new ComponentType(
                $.create('div', ComponentType.className),
                {...c.options, ...baseOptions}
            )
        })
    }

    init() {
        this.initDOMListeners()
        this.subscriber.subscribeComponent(this)
        this.components && this.components.forEach(component => component.init())
    }

    getRoot() {
        if (this.components) {
            this.components.forEach(instance => {
                this.$root.append(instance.getRoot())
            })
        } else {
            this.$root.html(this.toHTML())
        }

        return this.$root
    }

    toHTML() {
        return ''
    }

    storeChanged(changes) {}

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    destroy() {
        this.components.forEach(component => component.destroy())
        this.unsubscribers.forEach(unsub => unsub())
    }
}

