export function throttle(func, ms) {
    let timers = new WeakMap();
  
    return (element, ...args) => {
      if (timers.has(element)) return;
  
      const timer = setTimeout(() => {
        func(element, ...args);
        timers.delete(element);
      }, ms);

      timers.set(element, timer);
    };
}