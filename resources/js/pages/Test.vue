<template>
    <RegistrationForm @set-user="setUser" v-if="!user"/>
    <form class="card" v-else>
        <h1>Тест на тему: {{ theme?.title }}</h1>
        <br>
        <h4 v-html="getQuestionText"/>
        <b-form-input
            class="mt-2"
            ref="input"
            v-model="answer"
            v-if="examination"
        />
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
</template>

<script>
import RegistrationForm from "../components/RegistrationForm.vue";

export default {
    name: "Test",
    components: {RegistrationForm},
    data() {
        return {
            user: null,
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
                this.questions = data.data.content.sort(() => Math.round(Math.random() * 100) - 50)
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
        nextQuestion(answer) {
            if (this.examination) {
                this.answers.push({ id: this.questions[this.selectedQuestion].id, answer })
                this.selectedQuestion++
                this.answer = ''
            } else {
                this.$router.push('/themes')
            }
        },
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
        getQuestionText() {
            return this.examination ? this.questions[this.selectedQuestion]?.question : 'Тест пройден!'
        }
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
