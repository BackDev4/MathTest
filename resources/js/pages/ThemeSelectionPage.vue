<template>
    <Header/>
    <div class="container">
        <div class="card">
            <h1>Темы:</h1>
            <br>
            <h3
                v-for="theme in themes"
                :key="theme.id"
                v-html="theme.title"
                @click="$router.push(`/theme/${theme.id}`)"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
    name: "ThemeSelectionPage",
    components: {Header},
    data() {
        return {
            themes: [],
        }
    },
    methods: {
        async getThemes() {
            try {
                const {data} = await axios.get('/api/quiz')
                this.themes = data.data
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
h3 {
    padding: 5px 0 12px;
    border-bottom: 1px solid gray;
    cursor: pointer;
}
</style>
