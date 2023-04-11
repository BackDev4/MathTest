<template>
    <Header/>
    <div class="container">
        <RegistrationForm @set-user="setUser" v-if="!user"/>
        <form class="card" @submit.prevent="nextQuestion" v-else>
            <small>
                <template v-if="selectedQuestion < questions.length">
                    {{ selectedQuestion + 1 }} вопрос из {{ questions.length }}
                </template>
                <template v-else>Тест пройден!</template>
            </small>
            <h1>{{ theme?.title }}:</h1>
            <br>
            <template v-if="questions[selectedQuestion]?.question">
                <h4>{{ questions[selectedQuestion].question }}</h4>
                <b-form-input
                    class="mt-2"
                    ref="input"
                    :value="answers[answersLength]?.answer"
                    @input="answers[answersLength] = { ...questions[selectedQuestion], answer: $event }"
                />
<!--                v-if="examination"-->
            </template>
            <template v-if="questions[selectedQuestion]?.content">
                <h4>{{ questions[selectedQuestion].name }}</h4>
                <template
                    v-for="(item, idx) in questions[selectedQuestion].content"
                    :key="idx"
                >
                    <div style="margin-bottom: 5px;" v-if="item.type === 'one-answer'">
                        <b-form-radio
                            :name="`radio${idx}`"
                            :checked="answers.filter(i => i.type === 'one-answer').map(i => `${i.question} | ${i.name}`).indexOf(`${item.question} | ${questions[selectedQuestion].name}`) !== -1"
                            @click="answers[answersLength] = { ...item, name: questions[selectedQuestion].name }"
                        >{{ item.question }}</b-form-radio>
                    </div>
                    <div style="margin-bottom: 5px;" v-if="item.type === 'multiple-answers'">
                        <b-form-checkbox
                            :name="`checkbox${idx}`"
                            :checked="answers.filter(i => i.type === 'multiple-answers').map(i => `${i.question} | ${i.name}`).indexOf(`${item.question} | ${questions[selectedQuestion].name}`) !== -1"
                            @click="setAnswerForQuestionWithMultiple(item, questions[selectedQuestion].name)"
                        >{{ item.question }}</b-form-checkbox>
                    </div>
                </template>
            </template>
            <div style="margin-left: auto;" class="d-flex mt-1 gap-2">
                <b-button
                    variant="outline-primary"
                    @click.prevent="tryAgain"
                    v-if="!examination"
                >Пройти повторно</b-button>
                <b-button
                    type="submit"
                    variant="success"
                    v-html="getButtonText"
                    @click.prevent="nextQuestion"
                />
            </div>
        </form>
    </div>
</template>

<script>
import RegistrationForm from "../components/RegistrationForm.vue";
import Header from "../components/Header.vue";

export default {
    name: "Test",
    components: {Header, RegistrationForm},
    data() {
        return {
            user: {
                fullName: 'Егор Бабашко',
                group: '28П'
            },
            theme: null,
            questions: [],
            selectedQuestion: 0,

            answer: '',

            answers: [],
            answersLength: 0
        }
    },
    methods: {
        tryAgain() {
            this.selectedQuestion = 0
            this.answers = []
            this.getTheme()
        },
        setAnswerForQuestionWithMultiple(question, name) {
            console.log(question, name)
            const index = this.answers
                .filter(answ => answ.type === 'multiple-answers')
                .map(answ => `${answ.question} | ${answ.name}`)
                .indexOf(`${question.question} | ${this.questions[this.selectedQuestion].name}`)

            if (index === -1) {
                this.answers.push({ ...question, name: name })
            } else {
                this.answers.splice(index, 1)
            }
        },

        async getTheme() {
            try {
                const {data} = await axios.get(`/api/quiz/${this.getThemeId}`)
                this.theme = data.data
                const content = data.data.content
                this.questions = [
                    ...content.no_options.flat(1),
                    ...content.one_answer,
                    ...content.multiple_answers
                ].sort(() => Math.round(Math.random() * 100) - 50)
                // this.questions = data.data.content.sort(() => Math.round(Math.random() * 100) - 50)
                console.log('array', [] instanceof Array)
                console.log('object', {} instanceof Object)
            } catch (e) {
                console.error(e)
            }
        },
        async sendForm() {
            try {
                const {data} = await axios.post(`/api/users`, this.getForm)
                console.log(data)
                console.log(this.getForm)
                this.$router.push('/')
            } catch (e) {
                console.error(e)
            }
        },
        // nextQuestion(answer) {
        //     if (this.examination) {
        //         this.answers.push({ id: this.questions[this.selectedQuestion].id, answer })
        //         this.selectedQuestion++
        //         this.answer = ''
        //     } else {
        //         this.$router.push('/themes')
        //     }
        // },
        setUser(user) {
            this.user = user
        },

        nextQuestion() {
            if (this.examination) {
                this.selectedQuestion++
                this.answersLength = this.answers.length
            } else {
                this.sendForm()
            }
            console.log(this.questions.length, this.selectedQuestion)
        }
    },
    computed: {
        getThemeId() {
            return +this.$route.params.id
        },
        examination() {
            return this.questions.length > this.selectedQuestion
        },
        getButtonText() {
            return this.examination ? 'Далее' : 'Сдать тест'
        },
        getForm() {
            return {
                name: this.user.fullName,
                group: this.user.group,
                answers: this.answers,
                themeId: this.getThemeId,
                testId: 0
            }
        },
        // getQuestionText() {
        //     return this.examination ? this.questions[this.selectedQuestion]?.question : 'Тест пройден!'
        // }
    },
    // watch: {
    //     selectedQuestion() {
    //         if (this.selectedQuestion === this.questions.length) this.sendForm()
    //     }
    // },
    mounted() {
        this.getTheme()
    }
}
</script>

<style scoped>

</style>
