<template>
    <Header/>
    <div class="container">
        <RegistrationForm @set-user="setUser" v-if="!user"/>
        <form class="card" v-else>
            <h1>{{ theme?.title }}:</h1>
            <br>
<!--            <h4 v-html="getQuestionText"/>-->

<!--            v-model="answer"-->
            <b-form-input
                class="mt-2"
                ref="input"
                v-if="examination"
            />
            <template>

            </template>
            <div style="margin-left: auto;" class="d-flex">
                <b-button
                    variant="outline-primary"
                    v-if="!examination"
                >Пройти повторно</b-button>
                <b-button
                    class="mt-1"
                    type="submit"
                    variant="success"
                    v-html="getButtonText"
                    @click.prevent="nextQuestion(answer)"
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
        }
    },
    methods: {
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
            return this.examination ? 'Далее' : 'Перейти к списку тем'
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
    watch: {
        selectedQuestion() {
            if (this.selectedQuestion === this.questions.length) this.sendForm()
        }
    },
    mounted() {
        this.getTheme()
    }
}
</script>

<style scoped>

</style>
