import type { Unsubscriber, Updater, Writable } from "svelte/store";

export function cleanable<T>(initial: T) {
    let state = initial;
    const subscribers = new Set<CleanableSubscriber<T>>();
    const unsubscribers = new Set<Unsubscriber>();
    const notifyAll = () => {
        unsubscribers.forEach((unsub) => unsub());
        unsubscribers.clear();
        subscribers.forEach((run) => notify(run));
    };

    function set(value: T): void {
        state = value;
        notifyAll();
    }

    function update(updater: Updater<T>): void {
        state = updater(state);
        notifyAll();
    }

    function subscribe(run: CleanableSubscriber<T>): Unsubscriber {
        subscribers.add(run);
        notify(run);
        return () => subscribers.delete(run);
    }

    function notify(run: CleanableSubscriber<T>) {
        const unsub = run(state);
        if (typeof unsub === "function") unsubscribers.add(unsub);
    }

    return { set, update, subscribe } satisfies Writable<T>;
}

export type CleanableSubscriber<T> = (value: T) => Unsubscriber | void;
