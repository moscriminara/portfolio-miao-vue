const ContactPage = {
    template: `
        <section class="page">
            <h1><br><br>CONTACT</h1>

            <a class="content">Suggest anything you like.</a>

            <div v-if="result" v-html="result"></div>

            <form @submit.prevent="submit">
                <div class="vtbox">
                <input
                    v-model="email"
                    class="emailEnter"
                    placeholder="Enter your email"
                >
                </div>

                <div class="vtbox">
                <textarea
                    v-model="content"
                    placeholder="Oh yes, this space is specifically for you, today."
                    rows="10"
                ></textarea>
                </div>

                <div class="vtbox" style="margin:0 0 10% 0;">
                <button class="contactButton">
                    Once you click this button, my best carrier pigeon will convey your words.
                </button>
                </div>
            </form>
        </section>
    `,

    data() {
        return {
            email: '',
            content: '',
            result: ''
        }
    },

    methods: {
        async submit() {
        if (!this.email || !this.content || !this.email.includes('@')) {
            this.result = `
                <a class="notice">
                    ${!this.email || !this.content
                    ? "Come on at least fill one word each."
                    : "No way you have no @ in your email."}
                </a>
            `
            return
        }

        this.result = `<a class="notice">Pigeon is ready to go...</a>`

        const formData = new FormData()
        formData.append('access_key', 'a0473987-3dee-4379-a631-d92429e66dc2')
        formData.append('email', this.email)
        formData.append('message', this.content)

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            if (data.success) {
                this.result = `<a class="notice">Success Yeahhh</a>`
                this.email = ''
                this.content = ''
            } else {
                this.result = `<a class="notice">I feel weird.</a>`
            }
        } catch {
            this.result = `<a class="notice">Hell no I think we're in the worst situation now.</a>`
        }
        }
    }
}