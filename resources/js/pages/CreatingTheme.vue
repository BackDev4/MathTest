<template>
    <Header/>
    <div class="container">
        <div class="card">
            <h4 class="mt-2">Название темы:</h4>
            <b-form-input v-model="theme.title"/>

            <h4 class="mt-2">Теория:</h4>
            <b-form-textarea rows="8" v-model="theme.description"/>

            <div class="d-flex justify-content-end flex-wrap gap-2">
                <b-button
                    variant="primary"
                    @click="withNoOptions.showModal = !withNoOptions.showModal"
                >Вопросы без варианта ответа</b-button>
                <b-button
                    variant="primary"
                    @click="withOneAnswer.showModal = !withOneAnswer.showModal"
                >Вопросы с одним верным ответом</b-button>
                <b-button
                    variant="primary"
                    @click="withMultipleAnswers.showModal = !withMultipleAnswers.showModal"
                >Вопросы с несколькими вариантами ответа</b-button>
            </div>
            <br>

            <b-modal v-model="withNoOptions.showModal" hide-footer>
                <template #title>
                    <b-form-input
                        class="mb-0"
                        type="number"
                        placeholder="Кол-во вопросов:"
                        v-model="withNoOptions.count"
                    />
                </template>

                <template v-if="withNoOptions.count">
                    <h4 class="mt-2">Вопросы:</h4>

                    <b-form-input
                        v-for="(_, idx) in +withNoOptions.count"
                        :key="idx"
                        @input="setQuestionsWithNoOptions($event, idx)"
                    />
                </template>
            </b-modal>
            <b-modal v-model="withOneAnswer.showModal" hide-footer>
                <template #title>
                    <b-form-input
                        class="mb-0"
                        type="number"
                        placeholder="Кол-во вопросов:"
                        v-model="withOneAnswer.countQuestions"
                    />
                </template>

                <div
                    v-for="(_, idx) in +withOneAnswer.countQuestions"
                    :key="idx"
                >
                    <h5>Кол-во вариантов ответа для {{ idx + 1 }} вопроса</h5>
                    <b-form-input
                        type="number"
                        @input="setWithOneAnswerNumberOfOptions($event, idx)"
                    />

                    <div class="ps-3" v-if="withOneAnswer.numberOfAnswerOptions[idx]">
                        <h6>Варианты ответа</h6>
                        <b-form-input
                            v-for="(_, idx1) in +withOneAnswer.numberOfAnswerOptions[idx]"
                            :key="idx1"
                            @input="setContentWithOneAnswer($event, idx, idx1)"
                        />
                    </div>

                </div>

                <template v-if="withOneAnswer.count">
                    <h4 class="mt-2">Вопросы:</h4>

                    <b-form-input
                        v-for="(_, idx) in +withOneAnswer.count"
                        :key="idx"
                        @input="setQuestionsWithOneAnswer($event, idx)"
                    />
                </template>
            </b-modal>
            <b-modal v-model="withMultipleAnswers.showModal" hide-footer>
                <h4 class="mt-2">Кол-во вопросов:</h4>
                <b-form-input type="number" v-model="count"/>

                <template v-if="count">
                    <h4 class="mt-2">Вопросы:</h4>

                    <b-form-input
                        v-for="(_, idx) in +count"
                        :key="idx"
                        @input="setContent($event, idx)"
                    />
                </template>
            </b-modal>

            <b-button
                style="margin-left: auto;"
                variant="success"
                @click="addTheme"
            >Добавить</b-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
    name: "CreatingTheme",
    components: {Header},
    data() {
        return {
            showSidebar: false,

            count: null,
            content: [],
            withNoOptions: {
                count: null,
                showModal: false,
                content: []
            },
            withOneAnswer: {
                count: null,
                countQuestions: null,
                showModal: false,
                content: [],
                numberOfAnswerOptions: [],

            },
            withMultipleAnswers: {
                count: null,
                showModal: false,
                content: []
            },

            theme: {
                title: '',
                description: '',
            },
        }
    },
    methods: {
        setWithOneAnswerNumberOfOptions(e, idx) {
            this.withOneAnswer.numberOfAnswerOptions[idx] = e
            this.withOneAnswer.content[idx] = []
        },
        setQuestionsWithOneAnswer(value, idx) {
            this.withOneAnswer.content[idx] = { id: idx, question: value }
        },
        setContentWithOneAnswer(e, idx, idx1) {
            this.withOneAnswer.content[idx][idx1] = { id: idx1, question: e }
            if (!e) this.withOneAnswer.content[idx].splice(idx1, 1)
        },

        setQuestionsWithNoOptions(value, idx) {
            this.withNoOptions.content[idx] = { id: idx, question: value }
            if (!value) this.withNoOptions.content.splice(idx, 1)
        },
        setQuestionsWithMultipleAnswers(value, idx) {
            this.withMultipleAnswers.content[idx] = { id: idx, question: value }
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
        },
    },
    computed: {
        getContent() {
            return this.content.filter(item => item)
        },
        getQuestionsWithNoOptions() {
            return this.questionsWithNoOptions.filter(question => question)
        },
        getQuestionsWithOneAnswer() {
            return []
        },
        getQuestionsWithMultipleAnswers() {
            return []
        },
        getTheme() {
            return {
                ...this.theme,
                // content: this.getContent.length ? this.getContent : [null]
                content: {
                    noOptions: this.getQuestionsWithNoOptions,
                    oneAnswer: this.getQuestionsWithOneAnswer,
                    multipleAnswers: this.getQuestionsWithMultipleAnswers,
                }
            }
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
