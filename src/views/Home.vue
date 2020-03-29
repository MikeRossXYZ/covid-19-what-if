<template>
  <div class="home">
    <div class="container">
    </div>
    <Simulator/>
    <div class="container footer">Author: Mike Ross. Source code: <a href="https://github.com/MikeRossXYZ/covid-19-what-if">https://github.com/MikeRossXYZ/covid-19-what-if</a></div>
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

<style>
.footer {
  margin-top: 8rem;
}
</style>
