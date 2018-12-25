class Observable {
    constructor() {
        this.listeners = {};
    }

    trigger() {
        const data = Array.prototype.slice.call(arguments, 1);
        const event = Array.prototype.slice.call(arguments, 0, 1);
        const eventListeners = (this.listeners[event] || []).map(handler => handler);

        console.log('trigger', event);

        eventListeners.forEach(function(handler) {
            if(typeof handler === "function")
                handler.apply(null, data);
        });
    }

    on(event, handler) {
        console.log('on', event);

        this.listeners[event] = (this.listeners[event] || []);
        this.listeners[event].push(handler);
    }

    off(event, handler) {
        if(!handler) delete this.listeners[event];
        const handlerIndex = (this.listeners[event] || []).indexOf(handler);
        if(handlerIndex >= 0) {
            this.listeners[event].splice(handlerIndex, 1);
        }
    }

    once(event, handler) {
        const observable = this;
        const onceHandler = function() {
            handler.apply(observable, arguments);
            observable.off(event, onceHandler);
        };
        observable.on(event, onceHandler);
    }
}