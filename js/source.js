const SourcePage = {
    template: `
        <section class="page">
            <div>
                <h1><br><br>
                    SOURCE
                </h1>
                <a class="content">
                    HTML of this Website
                </a>
            </div>
            <pre class="showHtml">{{ htmlSource }}</pre>
        </section>
    `,
    data() {
        return {
            htmlSource: ''
        }
    },
    mounted() {
        fetch('./index.html')
            .then(r => r.text())
            .then(t => this.htmlSource = t)
    }
}