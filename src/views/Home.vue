<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Simulator msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Simulator from '@/components/Simulator.vue'

export default {
  name: 'Home',
  components: {
    Simulator
  }
}
</script>
