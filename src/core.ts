import { Signal } from 'signal-polyfill';
import { Runtime } from './lib/runtime';
import { EffectFunction } from './lib/types';

export function memo<T>(
    accessor: () => T,
    options?: { equals?: false | ((prev: T, next: T) => boolean) },
): () => T {
    const opts = {
        equals: options?.equals
            ? (lhs: T, rhs: T) => {
                  if (typeof options.equals === 'boolean') {
                      return options.equals;
                  }

                  return options.equals!(lhs, rhs);
              }
            : undefined,
    };

    const computation = new Signal.Computed(accessor, opts);
    return computation.get.bind(computation);
}

export function effect(fn: EffectFunction<any, any>) {
    new Runtime.subtle.RenderEffect(fn);
}

export const getOwner = Runtime.subtle.getOwner;
export const createComponent = Runtime.subtle.createComponent;
export const root = Runtime.createRoot;
export const sharedConfig = {};
export const untrack = Signal.subtle.untrack;
