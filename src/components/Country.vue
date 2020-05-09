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
        <b-card-text><span class="negrito">{{ formatar(summaryStat.totalCasesMS) }}</span></b-card-text>
      </b-card>

      <b-card
        border-variant="danger"
        header="Óbitos"
        header-bg-variant="danger"
        header-text-variant="white"
        align="center"
      >
        <b-card-text><span class="negrito">{{ formatar(summaryStat.deathsMS) }}</span></b-card-text>
      </b-card>

      <b-card
        border-variant="success"
        header="Recuperados"
        header-bg-variant="success"
        header-border-variant="success"
        header-text-variant="white"
        align="center"
      >
        <b-card-text><span class="negrito">{{ formatar(summaryStat.recovered) }}</span></b-card-text>
      </b-card>
     </b-card-group>
     <br>
     
     <span class="negrito">Evolução da doença no País</span>
     <b-card-group deck class="country" v-if="loaded">
       
      <b-card
        border-variant="black"
        header="Acumulado de casos e óbitos"
        header-class="negrito"
        header-bg-variant="transparent"
        header-border-variant="black"
        header-text-variant="black"
        align="center">
        <ProgressLineChart :chart-data="datacollection" :options="options"/>
      </b-card>
      <b-card
        border-variant="black"
        header="Notificação de novos casos e óbitos a cada dia"
        header-class="negrito"
        header-bg-variant="transparent"
        header-border-variant="black"
        header-text-variant="black"
        align="center">
        <ProgressLineChart :chart-data="datacollectionnovocaso" :options="options"/>
      </b-card>
     </b-card-group>    
    </div> 
    
    <div class="content-table">
    
       
   <span class="negrito">Números acumulados por Estado</span>
    <br>
    <table class="table table-hover" >
        <thead>
          <th scope="col">Estado</th>
          <th scope="col">Confirmados</th>
          <th scope="col">Óbitos</th>
          <th scope="col">Recuperados</th>
          <th scope="col">Casos por 100k hab.</th>
        </thead>
        <tbody>
        <tr 
            v-for="(estadoStat, index) in estadoStats" :key="index">
          <th scope="row">{{ estadoStat.state }}</th>
          <td class="colnum">{{ formatar(estadoStat.totalCasesMS) }}</td>
          <td class="colnum">{{ formatar(estadoStat.deathsMS) }}</td>
          <td class="colnum">{{ formatar(estadoStat.recovered) }}</td>
          <td class="colnum">{{ estadoStat.totalCasesPer100kInhabitants }}</td>
        </tr>
        
        <tr>
          <td colspan="5" class="content-table-footer">Fonte: Secretarias Estaduais de Saúde. Brasil, 2020</td>
        </tr>
        </tbody>
      </table>
   
    
    </div>
  </div>
    

</template>
<script>
import axios from 'axios'
import { separateByThousands } from '../utils/number.js'
import { chartCountryData, options } from '@/data/chartCountryData';
import ProgressLineChart from '@/components/ProgressLineChart.vue';

export default {
    components: {
      ProgressLineChart
    },
    data() {
        return {
            estadoStats: [],
            summaryStat: {},
            chartCountry: [],
            datacollection: null,
            datacollectionnovocaso: null,
            options: options,
            loaded: false
        }
    },
    mounted() {
        this.chartCountry = chartCountryData;
        //console.log(chartCountryData);
        //console.log(this.chartCountry.map(stats => stats.death));
        

        axios.get('/cases/country/local/states')
         .then(response => this.estadoStats = response.data);
        axios.get('/cases/country/local/summary')
         .then(response => this.summaryStat = response.data); 
        axios.get('/cases/country/local/history')
          .then(response => {
            this.chartCountry = response.data;
            this.fillData();
            this.fillDataNovoCaso();
            console.log(this.chartCountry);
            this.loaded = true;    
          })
         
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
      },
      fillData () {
        this.datacollection = {
          labels: this.chartCountry.map(stats => stats.date),
          datasets: [
            {
              label: 'Confirmados',
              //backgroundColor: '#f87979',
              borderColor: '#033C73',
              pointBackgroundColor: '#033C73',
              borderWidth: 1,
              pointBorderColor: '#033C73',
              backgroundColor: 'transparent',
              data: this.chartCountry.map(stats => stats.totalCases)
            }, {
              label: 'Óbitos',
              //backgroundColor: '#f87979',
              borderColor: '#C71C22',
              pointBackgroundColor: '#C71C22',
              borderWidth: 1,
              pointBorderColor: '#C71C22',
              backgroundColor: 'transparent',
              data: this.chartCountry.map(stats => stats.deaths)
            }
          ]
        }
      },

      fillDataNovoCaso () {
        this.datacollectionnovocaso = {
          labels: this.chartCountry.map(stats => stats.date),
          datasets: [
            {
              label: 'Confirmados por dia',
              //backgroundColor: '#f87979',
              borderColor: '#033C73',
              pointBackgroundColor: '#033C73',
              borderWidth: 1,
              pointBorderColor: '#033C73',
              backgroundColor: 'transparent',
              data: this.chartCountry.map(stats => stats.newCases)
            }, {
              label: 'Óbitos por dia',
              //backgroundColor: '#f87979',
              borderColor: '#C71C22',
              pointBackgroundColor: '#C71C22',
              borderWidth: 1,
              pointBorderColor: '#C71C22',
              backgroundColor: 'transparent',
              data: this.chartCountry.map(stats => stats.newDeaths)
            }
          ]
        }
      }
    }

}
</script>
<style lang="css" scoped>
 .country {
    padding-top: 30px;
 }

 

 td, th {
   padding: 0;
 }

 
</style>
