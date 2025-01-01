import { readable, writable } from "svelte/store";

const safeLocalStorage = globalThis.localStorage;
const isLocalStorageItemNull = (key:string) => safeLocalStorage?.getItem(key) === null;

function convertToBoolean(input: string | null): boolean {
    if (input == null){
        return false
    }
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return true;
    }
}

export function getShowCuratorNotes() {
    const key = 'showCuratorNotes';
    if (isLocalStorageItemNull(key)) { safeLocalStorage?.setItem(key, 'true') }
    const bool = convertToBoolean(safeLocalStorage?.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    // subscribe(val => localStorage.setItem("musicStore", val.toString()))
    return {
        subscribe,
        read: () => {return convertToBoolean(safeLocalStorage?.getItem(key))},
        setBoolCuratorNotes: (b: boolean) => { 
             set(b), 
             safeLocalStorage?.setItem(key, String(b))
            }
    }
}