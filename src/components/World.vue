<template>
  <div class="world" v-if="locationStats && locationStats.length > 0">
    <div> 
     <b-card-group deck>
      <b-card
        border-variant="info"
        header="Casos"
        header-bg-variant="info"
        header-text-variant="white"
        align="center"
      >
        <b-card-text><span class="negrito">{{ totalCases }}</span></b-card-text>
      </b-card>

      <b-card
        border-variant="danger"
        header="Óbitos"
        header-bg-variant="danger"
        header-text-variant="white"
        align="center"
      >
        <b-card-text><span class="negrito">{{ totalDeaths }}</span></b-card-text>
      </b-card>

     
     </b-card-group>    
    </div> 
          
     
   

    
    <table class="container-sm table table-hover" style="margin-top: 18px">
        <tr>
          <th>Estado/Província</th>
          <th>País</th>
          <th>Total de casos</th>
          <th>Total de óbitos</th>
        </tr>
        <tr v-for="(locationStat, index) in locationStats" :key="index">
          <td>{{ locationStat.state }}</td>
          <td>{{ locationStat.country }}</td>
          <td style="text-align: right">{{ formatar(locationStat.latestTotalCases) }}</td>
          <td style="text-align: right">{{ formatar(locationStat.latestTotalDeaths) }}</td>
        </tr>
        <tr></tr>
        <tr>
          <td colspan="3" style="font-size: 11">Fonte: Centro de Ciência e Engenharia de Sistemas da Universidade Johns Hopkins, Maryland, Estados Unidos.</td>
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
            locationStats: []
        }
    },
    mounted() {
        axios.get('/cases')
         .then(response => {
             //console.log({response})
             this.locationStats = response.data
          })
    },
    computed: {
        totalCases() {
            //const sum = 0
            return separateByThousands(this.locationStats.reduce((sum, location) => sum + location.latestTotalCases, 0).toString())
            //return sum
        },
        totalDeaths() {
            //const sum = 0
            return separateByThousands(this.locationStats.reduce((sum, location) => sum + location.latestTotalDeaths, 0).toString())
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
 .world {
    
    padding-top: 30px;
 }
</style>
