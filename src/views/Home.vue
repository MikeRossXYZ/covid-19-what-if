<template>
  <div class="home">
    <div class="container">
    </div>
    <Simulator/>
    <div class="container footer">Author: Mike Ross. All source code is licenced under the GNU General Public Licence v3.</div>
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
