import { defineStore } from 'pinia'

interface Store {
  playerCount: number
  players: {
    name?: string
    totals?: number
    currentScore?: number
  }[]
  winScore: number
}

export const useStore = defineStore({
  id: 'store',
  state: (): Store => {
    return {
      playerCount: 0,
      players: [],
      winScore: 0
    }
  },
  getters: {
    getPlayerCount(state: Store) {
      return state.playerCount
    },
    getPlayers(state: Store) {
      return state.players
    },
    getWinScore(state: Store) {
      return state.winScore
    }
  },
  actions: {
    setPlayerCount(count: number) {
      this.playerCount = count
    },
    setWinScore(count: number) {
      this.winScore = count
    },
    addPlayer(player: { name: string; currentScore: number; totals: number }) {
      this.players.push(player)
    }
  }
})
