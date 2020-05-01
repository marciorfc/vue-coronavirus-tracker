<script>
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [ reactiveProp ],
  props: ['chartModel', 'options'],

  
  mounted () {
      
    this.renderChart(this.chartdata, this.options)
    //this.renderChart(...this.prepareData())
  }
}
</script>

<style>
</style>