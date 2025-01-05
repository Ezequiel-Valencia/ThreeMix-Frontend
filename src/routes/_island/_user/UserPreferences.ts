import { readable, writable, type Subscriber, type Unsubscriber } from "svelte/store";
import type { User } from "../../../types/user";
import Cookies from 'js-cookie'


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
    setUser: (user: User) => void,
    delete: () => void
}

function readUserCache(key: string): User | null{
    if (isLocalStorageItemNotPresent(key)) {
        return null
    } else if (Cookies.get("csrf_token") != undefined){
        return JSON.parse(localStorage.getItem(key) as string) 
    } else{
        localStorage.removeItem(key)
        return null
    }
}

/**
 * Attempt to get the user cache. But if the csrf or session tokens are not present,
 * delete the user cache and return null.
 * @returns UserCache
 */
export function getUserCache(): UserCache{
    const key = 'user_cache'
    let cachedUser: User | null = readUserCache(key)
    
    const {subscribe, set} = writable(cachedUser)
    return {
        subscribe,
        read: (): User | null => {return readUserCache(key)},
        setUser: (user: User) => {
            set(user),
            localStorage.setItem(key, JSON.stringify(user))
        },
        delete: () => {
            if (!isLocalStorageItemNotPresent(key)){
                localStorage.removeItem(key)
            }
        }
    }
}

