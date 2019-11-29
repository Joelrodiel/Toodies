import * as throttleFn from 'lodash.throttle';

export function Debounce(delay: number = 300): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let timeout = null;

        const original = descriptor.value;

        descriptor.value = function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => original.apply(this, args), delay);
        };

        return descriptor;
    };
}

export function Throttle(milliseconds: number = 0, options = {}): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = throttleFn(original, milliseconds, options);
        return descriptor;
    };
}
