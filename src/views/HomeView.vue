<template>
  <div class="home-page">
    <div v-if="showGreeting" class="greeting-container">
      <p class="greeting-text">{{ greeting }}</p>
      <button @click="startGame" class="start-button">Start Game</button>
    </div>
    <div v-if="showGame" class="game-container">
      <p class="question-text">{{ question }}</p>
      <div class="wrapper">
        <label for="playerCount" class="label-text">Number of players</label>
        <input type="number" id="playerCount" v-model="playerCount" class="input-field number" />
        <button :disabled="!playerCount" @click="submitPlayerCount" class="submit-button">
          Submit
        </button>
      </div>
    </div>
    <div v-if="addName" class="game-container">
      <div v-if="players.length < playersCount" class="wrapper">
        <label for="newPlayer" class="label-text">Enter player name:</label>
        <input type="text" id="newPlayer" v-model="newPlayer" class="input-field" />
        <button :disabled="!newPlayer" @click="addNewPlayer" class="submit-button">
          Add Player
        </button>
      </div>
      <div v-else class="start-wrapper">
        Winning points
        <input type="number" id="winScore" v-model="winScore" class="input-field" />
        <button @click="playGame" class="submit-button">Start game</button>
      </div>
      <div v-if="players.length" class="name-wrap">
        <p class="player-list-title">Player List:</p>
        <ul>
          <li v-for="(player, index) in players" :key="index">{{ player.name }}</li>
        </ul>
      </div>
    </div>
    <div v-if="running" class="game-container current-form">
      <div class="win-score">Winning points: {{ winScoreStore }}</div>
      <div v-for="(player, index) in players" :key="index" class="current-wrapper">
        <div class="name">{{ player.name }}</div>
        <input v-model="player.currentScore" type="number" id="score" class="input-field" />
        <div class="totals">{{ player.totals }}</div>
      </div>
      <button @click="endRound" class="submit-button end-btn">End Round</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

const showGreeting = ref(true)
const showGame = ref(false)
const addName = ref(false)
const running = ref(false)
const greeting = ref('Welcome to the number counting app!')
const question = ref('How many players do you have?')
const playerCount = ref(0)
const winScore = ref(0)
const newPlayer = ref('')
const players = computed(() => store.getPlayers)
const playersCount = computed(() => store.getPlayerCount)
const winScoreStore = computed(() => store.getWinScore)

const startGame = () => {
  showGreeting.value = false
  showGame.value = true
}

const submitPlayerCount = () => {
  store.setPlayerCount(playerCount.value)
  showGame.value = false
  playerCount.value = 0
  addName.value = true
}

const addNewPlayer = () => {
  store.addPlayer({ name: newPlayer.value, currentScore: 0, totals: 0 })
  newPlayer.value = ''
}

const playGame = () => {
  store.setWinScore(winScore.value)

  addName.value = false
  running.value = true
  winScore.value = 0
}

const endRound = () => {
  players.value.forEach((player) => {
    console.log(player.currentScore)
    player.totals = (player.totals ?? 0) + (player.currentScore ?? 0)

    if (player.totals >= winScoreStore.value) {
      alert('The winner is' + player.name)
    }

    player.currentScore = 0
  })
}
</script>

<style scoped src="@/assets/style.css" />
