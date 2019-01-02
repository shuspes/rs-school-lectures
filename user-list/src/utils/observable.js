export default class Observable {
  constructor() {
    this.listeners = {};
  }

  trigger(event, ...data) {
    const eventListeners = (this.listeners[event] || []).map(handler => handler);

    // eslint-disable-next-line no-console
    console.log('trigger', event);

    eventListeners.forEach((handler) => {
      if (typeof handler === 'function') handler(...data);
    });
  }

  on(event, handler) {
    // eslint-disable-next-line no-console
    console.log('on', event);

    this.listeners[event] = (this.listeners[event] || []);
    this.listeners[event].push(handler);
  }

  off(event, handler) {
    if (!handler) delete this.listeners[event];
    const handlerIndex = (this.listeners[event] || []).indexOf(handler);
    if (handlerIndex >= 0) {
      this.listeners[event].splice(handlerIndex, 1);
    }
  }

  once(event, handler) {
    const observable = this;
    const onceHandler = (...arg) => {
      handler.apply(observable, arg);
      observable.off(event, onceHandler);
    };
    observable.on(event, onceHandler);
  }
}
