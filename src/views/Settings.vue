<template>
  <v-container>
    <v-row><v-col cols="3">
        <v-card class="pa-md-4 mt-10">
          <v-col cols="12">
            <h1 class="text-tomato">通知</h1>
          </v-col>
          <v-col cols="12">
            <v-radio-group inline v-model="notify">
              <v-radio label="開啟" :value="true"></v-radio>
              <v-radio label="關閉" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="pa-md-4 mt-10">
          <v-col cols="12">
            <h1 class="text-tomato">設定</h1>
          </v-col>
          <v-col cols="12">
            <v-table>
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>試聽</th>
                  <th>選擇</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="alarm in settings.alarms" :key="alarm.id"> -->
                <tr v-for="alarm in alarms" :key="alarm.id">
                  <td>{{ alarm.name }}</td>
                  <td>
                    <audio :src="alarm.file" controls></audio>
                  </td>
                  <td>
                    <!-- <v-radio-group v-model="settings.selectedAlarm"> -->
                    <v-radio-group v-model="selectedAlarm">
                      <v-radio :value="alarm.id"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()

// 如果直接解構 pinia store 的 state 出來，會失去響應性
// const { selectedAlarm } = settings
// 必須要使用 storeToRefs 的輔助才能解構
const { selectedAlarm, alarms, notify } = storeToRefs(settings)
</script>
