<template>
  <div class="home">
    <div class="container">
    </div>
    <Simulator/>
    <div class="footer"></div>
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
