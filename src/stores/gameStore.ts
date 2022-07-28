import {defineStore} from "pinia";

export const useGameStore = defineStore('settings', {
    state: () => {
        return {
            name: "",
            topics: [],
            characters: []
        }
    },
    actions: {
        decode(code: string) {
            const decoded = JSON.parse(atob(code))
            this.name = decoded['name']
            this.topics = decoded['topics']
            this.characters = decoded['characters']
        }
    }
})