<template>
    <div class="card">
        <h2>Матрицы</h2>
        <h2>Производные</h2>
        <h2>Интегралы</h2>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ThemeSelectionPage",
    data() {
        return {
            themes: [],
        }
    },
    methods: {
        async getThemes() {
            try {
                const {data} = await axios.get('/api/quiz')
                this.themes = data
            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        this.getThemes()
    }
}
</script>

<style scoped lang="scss">
h2 {
    cursor: pointer;
}
</style>
