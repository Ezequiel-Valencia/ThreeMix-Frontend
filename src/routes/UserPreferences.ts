import { readable, writable, type Subscriber, type Unsubscriber } from "svelte/store";
import type { User } from "../types/user";

const isLocalStorageItemNotPresent = (key:string) => {
    let item = localStorage.getItem(key)
    return item === null || item === undefined
};

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
    if (isLocalStorageItemNotPresent(key)) { localStorage.setItem(key, 'true') }
    const bool = convertToBoolean(localStorage.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    // subscribe(val => localStorage.setItem("musicStore", val.toString()))
    return {
        subscribe,
        read: () => {return convertToBoolean(localStorage.getItem(key))},
        setBoolCuratorNotes: (b: boolean) => { 
             set(b), 
             localStorage.setItem(key, String(b))
            }
    }
}

/**
 * Uses the local storage date of last voted as a cache reference
 * for whether voting is allowed. Verfication is still done on the server
 * no matter the state of local storage.
 */
export type VoteDecision = {
    dateUTC: string
    number: number
}
export function getLastVoteDate(){
    const key = 'lastVote'
    let lastVoteDone: VoteDecision
    if (isLocalStorageItemNotPresent(key)) {
        let minute = 60 * 1000
        let day = 24 * 60 * minute
        let yesterday = new Date(new Date().getTime() - day)
        lastVoteDone = {
            dateUTC: yesterday.toUTCString(),
            number: 0
        }
        localStorage.setItem(key, JSON.stringify(lastVoteDone))
    } else{
        lastVoteDone = JSON.parse(localStorage.getItem(key) as string) 
    }
    const {subscribe, set} = writable(lastVoteDone)
    return {
        subscribe,
        read: (): VoteDecision => {return JSON.parse(localStorage.getItem(key) as string)},
        setVote: (vote: VoteDecision) => {
            set(vote),
            localStorage.setItem(key, JSON.stringify(vote))
        }
    }
}

export type UserCache = {
    subscribe: (run: Subscriber<User | null>) => Unsubscriber,
    read: () => User | null,
    setUser: (user: User) => void
}

export function getUserCache(): UserCache{
    const key = 'user_cache'
    let cachedUser: User | null
    if (isLocalStorageItemNotPresent(key)) {
        cachedUser = null
    } else{
        cachedUser = JSON.parse(localStorage.getItem(key) as string) 
    }
    const {subscribe, set} = writable(cachedUser)
    return {
        subscribe,
        read: (): User | null => {return isLocalStorageItemNotPresent(key) ? null : JSON.parse(localStorage.getItem(key) as string)},
        setUser: (user: User) => {
            set(user),
            localStorage.setItem(key, JSON.stringify(user))
        }
    }
}

