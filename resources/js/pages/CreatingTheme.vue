<template>
    <div class="card">
        <h4 class="mt-2">Название темы:</h4>
        <b-form-input v-model="theme.title"/>

        <h4 class="mt-2">Теория:</h4>
        <b-form-textarea rows="8" v-model="theme.description"/>

        <div class="d-flex justify-content-end flex-wrap gap-2">
            <b-button
                variant="primary"
                @click="withOneAnswer.showModal = !withOneAnswer.showModal"
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
            <h4 class="mt-2">Кол-во вопросов:</h4>
            <b-form-input type="number" v-model="withNoOptions.count"/>

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
            <h4 class="mt-2">Кол-во вопросов:</h4>
            <b-form-input type="number" v-model="withOneAnswer.countQuestions"/>
            <hr>
<!--            <h4 class="mt-2">Кол-во </h4>-->
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
                        v-for="(_, idx) in +withOneAnswer.numberOfAnswerOptions[idx]"
                        :key="idx"
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
</template>

<script>
import axios from "axios";

export default {
    name: "CreatingTheme",
    data() {
        return {
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
            // console.log(this.$refs[`withOneAnswerNumberOfAnswers${idx}`].input.value)
            this.withOneAnswer.numberOfAnswerOptions[idx] = e
        },

        setQuestionsWithNoOptions(value, idx) {
            this.withNoOptions.content[idx] = { id: idx, question: value }
        },
        setQuestionsWithOneAnswer(value, idx) {
            this.withOneAnswer.content[idx] = { id: idx, question: value }
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
