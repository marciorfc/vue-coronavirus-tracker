import Home from './components/Home.vue'
import World from './components/World.vue'
import Country from './components/Country.vue'
import State from './components/State.vue'

export const routes = [
    {path: '/', component: Home },
    {path: '/world', component: World },
    {path: '/country', component: Country },
    {path: '/state/:id', name: 'state', component: State, props: true}
]