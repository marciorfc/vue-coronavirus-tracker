<template>
    <div>
        <h1>{{ state.id }}</h1>
        <span class="negrito">Evolução da doença no Estado: {{ state.nome }}</span>
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
</template>

<script>
    import axios from 'axios'
    import { separateByThousands } from '../utils/number.js'
    import { formatDate } from '../utils/dateutil.js'
    import { options } from '@/data/chartCountryData';
    import ProgressLineChart from '@/components/ProgressLineChart.vue';

    export default {
        components: {
            ProgressLineChart
        },
        props: {
            state: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                chartStateData: [],
                datacollection: null,
                datacollectionnovocaso: null,
                dataCollectionNovoObito: null,
                options,
                loaded: false
            }
        },
        mounted() {
            axios.get(`/cases/country/local/history/${this.state.id}`)
                .then(response => {
                        this.chartStateData = response.data;
                        this.fillData();
                        this.fillDataNovoCaso();
                        this.loaded = true;
            });
        },
        methods: {
            formatar(valor) {
                return valor ? separateByThousands(valor.toString()): 0;
            },
            fillData () {
                this.datacollection = {
                labels: this.chartStateData.map(stats => formatDate(stats.date)),
                datasets: [
                    {
                    label: 'Confirmados',
                    //backgroundColor: '#f87979',
                    borderColor: '#033C73',
                    pointBackgroundColor: '#033C73',
                    borderWidth: 1,
                    pointBorderColor: '#033C73',
                    backgroundColor: 'transparent',
                    data: this.chartStateData.map(stats => stats.totalCases)
                    }, {
                    label: 'Óbitos',
                    //backgroundColor: '#f87979',
                    borderColor: '#C71C22',
                    pointBackgroundColor: '#C71C22',
                    borderWidth: 1,
                    pointBorderColor: '#C71C22',
                    backgroundColor: 'transparent',
                    data: this.chartStateData.map(stats => stats.deaths)
                    }
                ]
                }
            },

            fillDataNovoCaso () {
                this.datacollectionnovocaso = {
                labels: this.chartStateData.map(stats => formatDate(stats.date)),
                datasets: [
                    {
                    label: 'Confirmados por dia',
                    //backgroundColor: '#f87979',
                    borderColor: '#033C73',
                    pointBackgroundColor: '#033C73',
                    borderWidth: 1,
                    pointBorderColor: '#033C73',
                    backgroundColor: 'transparent',
                    data: this.chartStateData.map(stats => stats.newCases)
                    }, {
                    label: 'Óbitos por dia',
                    //backgroundColor: '#f87979',
                    borderColor: '#C71C22',
                    pointBackgroundColor: '#C71C22',
                    borderWidth: 1,
                    pointBorderColor: '#C71C22',
                    backgroundColor: 'transparent',
                    data: this.chartStateData.map(stats => stats.newDeaths)
                    }
                ]
                };
                
                this.dataCollectionNovoObito = {
                      labels: this.chartStateData.map(stats => formatDate(stats.date)),
                    datasets: [
                        {
                        label: 'Óbitos por dia',
                        borderColor: '#C71C22',
                        pointBackgroundColor: '#C71C22',
                        borderWidth: 1,
                        pointBorderColor: '#C71C22',
                        backgroundColor: 'transparent',
                        data: this.chartStateData.map(stats => stats.newDeaths)
                        }
                    ]
                }
         },

        }
    }
</script>

<style scoped>

</style>