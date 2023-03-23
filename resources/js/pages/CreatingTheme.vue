<template>
    <div class="card">
        <h4 class="mt-2">Название темы:</h4>
        <b-form-input v-model="theme.title"/>

        <h4 class="mt-2">Теория:</h4>
        <b-form-textarea rows="8" v-model="theme.description"/>

        <h4 class="mt-2" v-model="">Кол-во вопросов:</h4>
        <b-form-input type="number" v-model="count"/>

        <template v-if="count">
            <h4 class="mt-2">Вопросы:</h4>

            <b-form-input
                v-for="(_, idx) in +count"
                :key="idx"
                @input="setContent($event, idx)"
            />
        </template>
        <b-button
            style="margin-left: auto;"
            variant="success"
            @click="addTheme"
        >Добавить</b-button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CreatingTheme",
    data() {
        return {
            count: null,
            content: [],

            theme: {
                title: '',
                description: '',
            }
        }
    },
    methods: {
        setContent(value, idx) {
            this.content[idx] = { id: idx, question: value }
        },

        async addTheme() {
            if (this.getTheme.title && this.getTheme.description) {
                try {
                    const {data} = await axios.post('/api/quiz', this.getTheme)
                    console.log(data)
                    this.clear()
                } catch (e) {
                    console.error(e)
                }
            }
        },
        clear() {
            this.count = null
            this.content = []
            this.theme = {
                title: '',
                description: ''
            }
        }
    },
    computed: {
        getContent() {
            return this.content.filter(item => item)
        },
        getTheme() {
            return { ...this.theme, content: this.getContent.length ? this.getContent : [null] }
        }
    },
    watch: {
        count() {
            this.content.length = this.count
        }
    }
}
</script>

<style scoped>

</style>
