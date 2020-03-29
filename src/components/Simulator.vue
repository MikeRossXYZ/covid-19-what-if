<template>
  <div class="container">
    <h1>COVID-19 Infection Simulation</h1>
    <p>Use the parameters under the chart to visualize how infection growth rate and intervention measures can impact the number of COVID-19 cases.</p>
    <highcharts :options="chartOptions"></highcharts>
    <button class="btn btn-success" @click="updateChart">Re-generate chart</button>
    <h2 style="margin-top: 1.25rem">Parameters</h2>
    <div class="form-group">
      <label>Initial number of cases</label>
      <input class="form-control" type="number" v-model="startInfected" step=1 min=0 width=20 />
    </div>
    <div class="form-group">
      <label>Projection length (days)</label>
      <input class="form-control" type="number" v-model="projectionLengthInDays" step=1 min=0 width=20 />
    </div>
    <h3>Scenarios</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Growth rate</th>
          <th scope="col">Scale of intervention</th>
          <th scope="col">Intervention start day</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(scenario, idx) in scenarioOptions" v-bind:key="idx">
          <td><input type="number" v-model="scenario.startGrowthRate" step=0.01 max=1 min=0 /></td>
          <td>
            <select v-model="scenario.interventionType">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </td>
          <td>
            <input type="number" v-model="scenario.interventionStartDay" step=1 />
          </td>
          <td>
            <button class="btn btn-warning" @click="removeScenario(idx)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="scenario-btns">
      <button class="btn btn-primary" @click="addScenario">Add Scenario</button>
    </div>
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

  projectionLengthInDays = 45;
  startInfected = 100;

  scenarioOptions = [
    {
      startGrowthRate: 0.40,
      startDecayRate: 1,
      interventionStartDay: 7,
      interventionType: "Medium",
    },
    {
      startGrowthRate: 0.50,
      startDecayRate: 1,
      interventionStartDay: 14,
      interventionType: "High",
    },
  ];

  chartOptions: any = {
    title: null,
    xAxis:{
      title: {
        text: "Day number",
      },
    },
    yAxis: {
      title: {
        text: "Number of infected",
      },
    },
    series: [],
  };

  mounted() {
    this.updateChart();
  }
  
  addScenario() {
    const lastScenario = this.scenarioOptions[this.scenarioOptions.length-1];
    const newScenario = {
      startGrowthRate: Number(lastScenario.startGrowthRate),
      startDecayRate: Number(lastScenario.startDecayRate),
      interventionStartDay: Number(lastScenario.interventionStartDay),
      interventionType: lastScenario.interventionType,
    }
    this.scenarioOptions.push(newScenario);
  }

  interventionToDecayRate(interventionType: string) {
    if (interventionType == "High") {
      return 0.87;
    } else if (interventionType == "Medium") {
      return 0.91;
    } else {
      return 0.95;
    }
  }

  removeScenario(idx: number) {
    if (this.scenarioOptions.length == 1) {
      window.alert("Cannot delete if only one scenario.");
      return;
    }
    this.scenarioOptions.splice(idx);
  }

  updateChart() {
    this.chartOptions.series = [];
    this.scenarioOptions.forEach((scenario) => {
      this.chartOptions.series.push({
        name: "Growth " + String(scenario.startGrowthRate) + ", with " + scenario.interventionType + " intervention on day " + scenario.interventionStartDay,
        data: calcTimeSeries(
          Number(this.startInfected),
          Number(this.projectionLengthInDays),
          Number(scenario.startGrowthRate),
          Number(scenario.startDecayRate),
          [[Number(scenario.interventionStartDay), 'decay', this.interventionToDecayRate(scenario.interventionType)]])
      })
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scenario-btns {
  margin-bottom: 2rem;
}
</style>
