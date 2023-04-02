<template>
    <Header/>
    <div class="container">
        <div class="card">
            <h4 class="mt-2">Название темы:</h4>
            <b-form-input v-model="theme.title"/>

            <h4 class="mt-2">Теория:</h4>
<!--            <b-form-textarea rows="8" v-model="theme.description"/>-->
            <div
                class="textarea"
                contenteditable="true"
                v-html="theme.description"
                @input="setDescription($event)"
            />

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
                        v-model="withNoOptions.countQuestions"
                    />
                </template>

                <template v-if="withNoOptions.countQuestions">
                    <h4 class="mt-2">Вопросы:</h4>

                    <b-form-input
                        v-for="(_, idx) in +withNoOptions.countQuestions"
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
            </b-modal>
            <b-modal v-model="withMultipleAnswers.showModal" hide-footer>
                <template #title>
                    <b-form-input
                        class="mb-0"
                        type="number"
                        placeholder="Кол-во вопросов:"
                        v-model="withMultipleAnswers.countQuestions"
                    />
                </template>

                <div
                    v-for="(_, idx) in +withMultipleAnswers.countQuestions"
                    :key="idx"
                >
                    <h5>Кол-во вариантов ответа для {{ idx + 1 }} вопроса</h5>
                    <b-form-input
                        type="number"
                        @input="setWithMultipleAnswersNumberOfOptions($event, idx)"
                    />

                    <div class="ps-3" v-if="withMultipleAnswers.numberOfAnswerOptions[idx]">
                        <h6>Варианты ответа</h6>
                        <b-form-input
                            v-for="(_, idx1) in +withMultipleAnswers.numberOfAnswerOptions[idx]"
                            :key="idx1"
                            @input="setContentWithMultipleAnswers($event, idx, idx1)"
                        />
                    </div>

                </div>
            </b-modal>

            <b-button
                style="margin-left: auto;"
                variant="success"
                @click="addTheme"
            >Добавить</b-button>
        </div>
    </div>

    <b-toast
        class="position-fixed fixed-top ms-auto me-2 mt-2"
        id="toast"
        title="Успех!"
        variant="success"
        v-model="toast"
    >Тест добавлен</b-toast>

</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
    name: "CreatingTheme",
    components: {Header},
    data() {
        return {
            toast: false,
            withNoOptions: {
                countQuestions: null,
                showModal: false,
                content: []
            },
            withOneAnswer: {
                countQuestions: null,
                showModal: false,
                content: [],
                numberOfAnswerOptions: [],
            },
            withMultipleAnswers: {
                countQuestions: null,
                showModal: false,
                content: [],
                numberOfAnswerOptions: [],
            },

            theme: {
                title: '',
                description: '',
            },
        }
    },
    methods: {

        setDescription(e) {
            this.theme.description = e.target.innerHTML
        },
        setQuestionsWithNoOptions(value, idx) {
            this.withNoOptions.content[idx] = { id: idx, question: value, type: 'no-options' }
            if (!value) this.withNoOptions.content.splice(idx, 1)
        },
        ////////
        setWithOneAnswerNumberOfOptions(e, idx) {
            this.withOneAnswer.numberOfAnswerOptions[idx] = e
            this.withOneAnswer.content[idx] = []
            if (!e) this.withOneAnswer.content.splice(idx, 1)
        },
        setContentWithOneAnswer(e, idx, idx1) {
            this.withOneAnswer.content[idx][idx1] = { id: idx1, question: e, type: 'one-answer' }
            if (!e) this.withOneAnswer.content[idx].splice(idx1, 1)
        },
        ///////
        setWithMultipleAnswersNumberOfOptions(e, idx) {
            this.withMultipleAnswers.numberOfAnswerOptions[idx] = e
            this.withMultipleAnswers.content[idx] = []
            if (!e) this.withMultipleAnswers.content.splice(idx, 1)
        },
        setContentWithMultipleAnswers(e, idx, idx1) {
            this.withMultipleAnswers.content[idx][idx1] = { id: idx1, question: e, type: 'multiple-answers' }
            if (!e) this.withMultipleAnswers.content[idx].splice(idx1, 1)
        },
        ///////////////////////////////////////////////////////////
        async addTheme() {
            if (this.getTheme.title && this.getTheme.description) {
                try {
                    const {data} = await axios.post('/api/quiz', this.getTheme)
                    console.log(data)
                    this.toast = true
                    this.clear()
                } catch (e) {
                    console.error(e)
                }
            }
        },
        clear() {
            this.theme = {
                title: '',
                description: ''
            }
            // this.withNoOptions = {
            //     countQuestions: null,
            //     showModal: false,
            //     content: []
            // }
            // this.withOneAnswer = {
            //     countQuestions: null,
            //     showModal: false,
            //     content: [],
            //     numberOfAnswerOptions: [],
            // }
            // this.withMultipleAnswers = {
            //     countQuestions: null,
            //     showModal: false,
            //     content: [],
            //     numberOfAnswerOptions: [],
            // }
        },
    },
    computed: {
        getQuestionsWithNoOptions() {
            return this.withNoOptions.content.filter(question => question)
        },
        getQuestionsWithOneAnswer() {
            return this.withOneAnswer.content.filter(question => question)
        },
        getQuestionsWithMultipleAnswers() {
            return this.withMultipleAnswers.content.filter(question => question)
        },
        getTheme() {
            return {
                ...this.theme,
                // content: this.getContent.length ? this.getContent : [null]
                content: {
                    no_options: this.getQuestionsWithNoOptions,
                    one_answer: this.getQuestionsWithOneAnswer,
                    multiple_answers: this.getQuestionsWithMultipleAnswers,
                }
            }
        }
    },
    watch: {
        count() {
            this.content.length = this.count
        }
    },
    mounted() {
        console.log(axios.defaults.headers)
    }
}
</script>

<style scoped lang="scss">
.textarea {
    display: block;
    width: 100%;
    height: 200px;
    overflow-y: auto;
    padding: 0.375rem 0.75rem;
    margin-bottom: .5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: vertical;

    &:focus {
        color: #212529;
        background-color: #fff;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
}
</style>
