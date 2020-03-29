<template>
  <div class="hello">
    <highcharts :options="chartOptions"></highcharts>
    {{ calculateTimeSeries() }}
    <button @click="updateChart">Update</button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Chart} from 'highcharts-vue';
import {calculateTimeSeries as calcTimeSeries} from '@/model/calculator';

@Component({
  components: {
    highcharts: Chart,
  }
})
export default class Simulator extends Vue {
  @Prop() private msg!: string;

  projectionLengthInDays = 100;
  startInfected = 100;
  startGrowthRate = 0.50;
  startDecayRate = 0.90;

  calculateTimeSeries() {
    return calcTimeSeries(this.startInfected, this.projectionLengthInDays, this.startGrowthRate, this.startDecayRate, []);
  }

  chartOptions = {
    series: [{
      data: [1,2]
    }]
  }

  updateChart() {
    this.chartOptions.series = [];
    this.chartOptions.series.push({
      data: calcTimeSeries(this.startInfected, this.projectionLengthInDays, this.startGrowthRate, this.startDecayRate, [])
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
