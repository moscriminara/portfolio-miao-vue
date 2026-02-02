const WeatherPage = {
    template: `
        <div id="weather" class="page">
            <div class="box">
                <input type="text" v-model="location" placeholder="Enter a location" @keyup.enter="goWeather">
                <button @click="goWeather">o.k.</button>
            </div>

            <transition name="fade" mode="out-in">
                <div v-if="weather">
                    <h1>{{ weather.name }} <span>in</span> {{ weather.country }}</h1>
                    <h2 class="content">Temperature: <span>{{ weather.temperature }} °C</span></h2>
                    <h2 class="content">Wind Speed: <span>{{ weather.windspeed }} km/h</span></h2>
                    <br>
                    <h2 class="content">Latitude: {{ weather.latitude }}</h2>
                    <h2 class="content">Longitude: {{ weather.longitude }}</h2>
                </div>
                <h1 v-else-if="error">{{ error }}</h1>
            </transition>

            <div>
                <a class="content" style="margin-top:5%;">This is a Portfolio Website, very cool, and cool, and cool.</a>
                <a class="content" style="margin:3% auto 10% auto;">"And Cool."</a>
            </div>
        </div>
    `,
    data() {
        return {
            location: '',
            weather: null,
            error: null
        }
    },
    methods: {
        async goWeather() {
            if (!this.location.trim()) {
                this.error = "Enter something bro.";
                this.weather = null;
                return;
            }

            try {
                this.error = null;
                this.weather = null;

                const locUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${this.location}&count=1&language=en&format=json`;
                const locRes = await fetch(locUrl);
                const locData = await locRes.json();

                if (!locData.results || locData.results.length === 0) {
                    this.error = `I can't help you bro.`;
                    return;
                }

                const { latitude, longitude, name, admin1, country } = locData.results[0];

                const wthUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
                const wthRes = await fetch(wthUrl);
                const wthData = await wthRes.json();

                const wth = wthData.current_weather;

                this.weather = {
                    name, admin1, country,
                    temperature: wth.temperature,
                    windspeed: wth.windspeed,
                    latitude,
                    longitude
                };

            } catch (err) {
                console.error(err);
                this.error = "Error fetching weather";
            }
        }
    }
    
}