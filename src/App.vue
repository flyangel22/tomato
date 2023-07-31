<template>
  <v-app class="bgimg">
    <v-app-bar color="tomato">
      <v-container class="d-flex align-center">
        <v-app-bar-title>番茄鐘 Pomodoro</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <!-- Component 是目前頁面該顯示的元件 -->
      <router-view v-slot="{ Component }">
        <!-- keep-alive 讓路由切換時不會銷毀元件，用 include 指定只有 Home 不會被銷毀 -->
        <!-- component 動態元件，顯示 is 綁定的元件 -->
        <keep-alive include="Home">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style>
.bgimg {
  background: url('./assets/tomato4.jpg') !important;
  background-size: contain;
}
</style>
