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
        <b-card-text><span class="negrito">{{ formatar(summaryStat.deaths) }}</span></b-card-text>
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
        header="Notificação de novos casos a cada dia"
        header-class="negrito"
        header-bg-variant="transparent"
        header-border-variant="black"
        header-text-variant="black"
        align="center">
        <ProgressLineChart :chart-data="datacollectionnovocaso" :options="options"/>
      </b-card>
      <b-card
        border-variant="black"
        header="Notificação de novos óbitos a cada dia"
        header-class="negrito"
        header-bg-variant="transparent"
        header-border-variant="black"
        header-text-variant="black"
        align="center">
        <ProgressLineChart :chart-data="dataCollectionNovoObito" :options="options"/>
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
          <th scope="row"><router-link :to="{ name: 'state', params: { state : { id: estadoStat.sigla, nome: estadoStat.state }}}">
            {{ estadoStat.state }}
            </router-link></th>
          <td class="colnum">
              <router-link :to="{ name: 'state', params: { state : { id: estadoStat.sigla, nome: estadoStat.state }}}">
                {{ formatar(estadoStat.totalCasesMS) }}
              </router-link>
          </td>
          <td class="colnum">
            <router-link :to="{ name: 'state', params: { state : { id: estadoStat.sigla, nome: estadoStat.state }}}">
              {{ formatar(estadoStat.deaths) }}
            </router-link>  
          </td>
          <td class="colnum">
            <router-link :to="{ name: 'state', params: { state : { id: estadoStat.sigla, nome: estadoStat.state }}}">
              {{ formatar(estadoStat.recovered) }}
            </router-link>
          </td>
          <td class="colnum">
            <router-link :to="{ name: 'state', params: { state : { id: estadoStat.sigla, nome: estadoStat.state }}}">
              {{ estadoStat.totalCasesPer100kInhabitants }}
            </router-link>    
          </td>
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
import { formatDate } from '../utils/dateutil.js'
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
            dataCollectionNovoObito: null,
            options: options,
            loaded: false
        }
    },
    mounted() {
        this.chartCountry = chartCountryData;
          

        axios.get('/cases/country/local/states')
         .then(response => this.estadoStats = response.data);
        axios.get('/cases/country/local/summary')
         .then(response => this.summaryStat = response.data); 
        axios.get('/cases/country/local/history')
          .then(response => {
            this.chartCountry = response.data;
            this.fillData();
            this.fillDataNovoCaso();
            
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
          labels: this.chartCountry.map(stats => formatDate(stats.date)),
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
              labels: this.chartCountry.map(stats => formatDate(stats.date)),
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
                }
              ]
            };
    
            this.dataCollectionNovoObito = {
              labels: this.chartCountry.map(stats => formatDate(stats.date)),
              datasets: [
                {
                  label: 'Óbitos por dia',
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

 

 td, th {
   padding: 0;
 }

 
</style>
