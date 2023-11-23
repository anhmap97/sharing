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
        <input type="number" id="playerCount" v-model="playerCount" class="input-field" />
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
      <button v-else @click="playGame" class="submit-button">Start game</button>
      <div v-if="players.length" class="name-wrap">
        <p class="player-list-title">Player List:</p>
        <ul>
          <li v-for="(player, index) in players" :key="index">{{ player }}</li>
        </ul>
      </div>
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
const greeting = ref('Welcome to the number counting app!')
const question = ref('How many players do you have?')
const playerCount = ref(0)
const newPlayer = ref('')
const players = computed(() => store.players)
const playersCount = computed(() => store.playerCount)

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
  store.addPlayer(newPlayer.value)
  newPlayer.value = ''
}

const playGame = () => {
  addName.value = false
}
</script>

<style scoped src="@/assets/style.css" />
