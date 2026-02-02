const SourcePage = {
    template: `
        <section class="page">
            <h1><br><br>
                SOURCE
            </h1>
            <a class="content">
                HTML of this Website
            </a>
            <pre class="showHtml">{{ source }} </pre>
        </section>
    `,
    data() {
        return {
            source: ''
        }
    },
    mounted() {
        this.source = document.documentElement.outerHTML;
    }
}