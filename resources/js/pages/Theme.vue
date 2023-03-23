<template>
    <div class="card">
        <h1 v-html="theme?.title"/>
        <br>
        <p v-html="theme?.description"/>
        <br>
        <b-button
            style="margin-left: auto;"
            variant="outline-primary"
            @click="$router.push(`/test/${theme.id}`)"
        >Пройти тест</b-button>
    </div>
</template>

<script>
export default {
    name: "Theme",
    data() {
        return {
            theme: null
        }
    },
    methods: {
        async getTheme() {
            try {
                const {data} = await axios.get(`/api/quiz/${this.getThemeId}`)
                this.theme = data.data
            } catch (e) {
                console.error(e)
            }
        }
    },
    computed: {
        getThemeId() {
            return +this.$route.params.id
        }
    },
    mounted() {
        this.getTheme()
    }
}
</script>

<style scoped>

</style>
