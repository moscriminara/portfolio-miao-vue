const Home = {
    template: "#homeTemplate"
}
const Achievements = {
    template: "#achievementsTemplate"
}
const Products = {
    template: "#productsTemplate"
}
const Creator = {
    template: "#creatorTemplate",
    components: {
        "creator": CreatorPage
    }
}
const Contact = {
    template: "#contactTemplate",
    components: {
        "contact": ContactPage
    }
}
const Source = {
    template: "#sourceTemplate",
    components: {
        "source": SourcePage
    }
}
const Weather = {
    template: "#weatherTemplate",
    components : {
        "weather": WeatherPage
    }
}
const routes = [
    { path: '/', component: Home },
    { path: '/achievements', component: Achievements },
    { path: '/products', component: Products },
    { path: '/products/weather', component: Weather },
    { path: '/creator', component: Creator },
    { path: '/contact', component: Contact },
    { path: '/source', component: Source },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({})
app.use(router)

window.addEventListener("DOMContentLoaded", () => {
    app.mount('#app')
})

