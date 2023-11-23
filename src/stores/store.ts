import { defineStore } from 'pinia'

interface Store {
  playerCount: number
  players: string[]
}

export const useStore = defineStore({
  id: 'store',
  state: (): Store => {
    return {
      playerCount: 0,
      players: []
    }
  },
  getters: {
    getPlayerCount(state: Store) {
      return state.playerCount
    },
    getPlayers(state: Store) {
      return state.players
    }
  },
  actions: {
    setPlayerCount(count: number) {
      this.playerCount = count
    },
    addPlayer(player: string) {
      this.players.push(player)
    }
  }
})
