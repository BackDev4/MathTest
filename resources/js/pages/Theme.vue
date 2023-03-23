<template>
    <div class="card">
        <h1 v-html="theme?.title"/>
        <br>
        <p v-html="theme?.description"/>
        <br>
        <b-button
            style="margin-left: auto;"
            variant="outline-primary"
            v-html="getTextButton"
            @click="buttonAction"
        />
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
        },
        buttonAction() {
            this.theme?.content[0] === null ? this.$router.push(`/themes/change/${this.theme.id}`) : this.$router.push(`/test/${theme.id}`)
        }
    },
    computed: {
        getThemeId() {
            return +this.$route.params.id
        },
        getTextButton() {
            return this.theme?.content[0] === null ? 'Добавить вопросы' : 'Пройти тест'
        }
    },
    mounted() {
        this.getTheme()
    }
}
</script>

<style scoped>

</style>
