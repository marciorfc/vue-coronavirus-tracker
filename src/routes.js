import Home from './components/Home.vue'
import World from './components/World.vue'
import Country from './components/Country.vue'

export const routes = [
    {path: '/', component: Home },
    {path: '/world', component: World },
    {path: '/country', component: Country }
]