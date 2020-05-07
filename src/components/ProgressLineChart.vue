<script>
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [ reactiveProp ],
  props: ['options'],

  
  mounted () {
      
    this.renderChart(this.chartData, this.options)
    //this.renderChart(...this.prepareData())
  }
}
</script>

<style>
</style>