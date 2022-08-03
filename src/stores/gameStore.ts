import {defineStore} from "pinia";
import {cyrb53} from "../crypto";

export const useGameStore = defineStore('settings', {
    state: () => {
        return {
            name: "",
            topics: [],
            characters: [],
            password: -1
        }
    },
    actions: {
        decode(code: string, password: string) {
            const decoded = JSON.parse(atob(code))
            if ((decoded['pwd']  !== "" && decoded['pwd'] === cyrb53(password)) || decoded['pwd'] === "") {
                this.name = decoded['payload']['name']
                this.topics = decoded['payload']['topics']
                this.characters = decoded['payload']['characters']
            }
        },
        hasPassword(code: string) {
            return JSON.parse(atob(code))['pwd'] !== ""
        }
    }
})