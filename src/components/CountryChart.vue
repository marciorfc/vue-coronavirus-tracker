<template>
    <div>
        <h1>Country</h1>

        <ProgressLineChart :chartData="datacollection"/>
        <button @click="fillData()">Randomize</button>
    </div>
    

</template>
<script>
import ProgressLineChart from '@/components/ProgressLineChart.vue';
import chartModel from '@/data/chartmodel';

export default {
    components: {
        ProgressLineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }

    }

}
</script>