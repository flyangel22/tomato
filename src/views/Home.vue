<template>
  <v-container>
    <v-row class="text-center">
      <v-card class="card pa-md-4 mt-10 " color="tomato" theme="dark">
        <v-col cols="12">
          <h1 class="currentext mb-4">{{ currentText }}</h1>
          <v-divider :thickness="2" class="border-opacity-75"></v-divider>
          <h1 class="currentime">{{ currentTime }}</h1>
        </v-col>
        <v-col cols="12">
          <v-btn class="mr-10" variant="outlined" prepend-icon="mdi-play" v-if="status !== STATUS.COUNTING"
            @click="startTimer">開始</v-btn>
          <v-btn class="mr-10" variant="outlined" prepend-icon="mdi-pause" v-if="status === STATUS.COUNTING"
            @click="pauseTimer">暫停</v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-skip-next" v-if="currentItem.length > 0"
            @click="finishTimer">跳過</v-btn>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/store/list'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/settings'
import { ref, computed } from 'vue'
import { useWebNotification } from '@vueuse/core'

const list = useListStore()
const { items, currentItem, timeleft } = storeToRefs(list)
const { countdown, setCurrentItem, setFinishItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

// 0 = 停止中
// 1 = 倒數中
// 2 = 暫停
const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
const status = ref(STATUS.STOP)

// 倒數計時器
let timer = 0

const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  if (currentItem.value.length === 0) return

  status.value = STATUS.COUNTING
  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  if (notify.value) {
    const { show } = useWebNotification({
      title: '事項完成!',
      body: currentText.value,
      icon: 'https://github.com/wdaweb.png'
    })
    show()
  }

  setFinishItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始!' : '沒有事項!'
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>

<style>
.card {
  width: 50%;
  height: 500px;
  position: relative;
  left: 50%;
  transform: translateX(-50%)
}



.currentime {
  margin-top: 50px;
  font-size: 150px;
}
</style>
