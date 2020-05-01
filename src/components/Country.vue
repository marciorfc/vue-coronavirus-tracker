<template>
     <div class="country" v-if="estadoStats && estadoStats.length > 0">
     <div> 
     <b-card-group deck>
      <b-card
        border-variant="info"
        header="Casos"
        header-bg-variant="info"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>{{ formatar(summaryStat.totalCases) }}</b-card-text>
      </b-card>

      <b-card
        border-variant="danger"
        header="Óbitos"
        header-bg-variant="danger"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>{{ formatar(summaryStat.deaths) }}</b-card-text>
      </b-card>

      <b-card
        border-variant="success"
        header="Recuperados"
        header-bg-variant="success"
        header-border-variant="success"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>{{ formatar(summaryStat.recovered) }}</b-card-text>
      </b-card>
     </b-card-group>    
    </div> 
    

    
    <table class="container-sm table table-hover" style="margin-top: 18px">
        <tr>
          <th>Estado</th>
          <th>Casos por 100k hab.</th>
          <th>Total de casos</th>
          <th>Total de óbitos</th>
          <th>Total de recuperados</th>
        </tr>
        <tr v-for="(estadoStat, index) in estadoStats" :key="index">
          <td>{{ estadoStat.state }}</td>
          <td>{{ estadoStat.totalCasesPer100kInhabitants }}</td>
          <td style="text-align: right">{{ formatar(estadoStat.totalCases) }}</td>
          <td style="text-align: right">{{ formatar(estadoStat.deaths) }}</td>
          <td style="text-align: right">{{ formatar(estadoStat.recovered) }}</td>
        </tr>
        <tr></tr>
        <tr>
          <td colspan="3" style="font-size: 11">Fonte: Ministério da Saúde.</td>
        </tr>
      </table>
  </div>
    

</template>
<script>
import axios from 'axios'
import { separateByThousands } from '../utils/number.js'

export default {
    data() {
        return {
            estadoStats: [],
            summaryStat: {}
        }
    },
    mounted() {
        axios.get('/cases/country/local/states')
         .then(response => this.estadoStats = response.data);
        axios.get('/cases/country/local/summary')
         .then(response => this.summaryStat = response.data); 

    },
    computed: {
        totalCases() {
            //const sum = 0
            return separateByThousands(this.estadoStats.reduce((sum, location) => sum + +location.totalCases, 0).toString())
            //return sum
        }
       
    },
    methods: {
      formatar(valor) {
        return valor ? separateByThousands(valor.toString()): 0;
      }
    }

}
</script>
<style lang="css" scoped>
 .country {
    
    padding-top: 10px;
 }
</style>
