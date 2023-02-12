<template>

    <form
        v-if="answersOnQuestions.length !== questions.length"
        @submit.prevent="nextQuestion"
    >
        <item-test-component
            :question="questions[selectedQuestion]"
            :selectedQuestion="selectedQuestion"
            @check-answer="checkAnswer"
        />
        <p>Если Вы не знаете ответ на вопрос, поставьте "-".</p>
        <button
            class="btn primary"
            :disabled="selectedQuestion > 9"
        >Продолжить
        </button>
    </form>
    <div v-else>
        <h1>Конец!</h1>
        <button class="btn primary" @click="sendForm">Отправить форму</button>
        <button class="btn warning" @click="startAgain">Пройти повторно</button>
    </div>

</template>

<script>
import ItemTestComponent from "../components/ItemTestComponent.vue";

export default {
    name: "QuestionsAnswerComponent",
    components: { ItemTestComponent },
    props: {
      testType: String,
      user: Object,
    },
    data() {
        return {
            questions: [
                {id: 0, question: 'Напишите "Человек"'},
                {id: 1, question: 'Напишите "Чупа-чупс".'},
                {id: 2, question: 'Напишите "Слово"'},
                {id: 3, question: 'Напишите "Как дела?"'},
                {id: 4, question: 'Напишите "Чупапи-муняню"'},
                {id: 5, question: 'Напишите "Honda CBR600RR"'},
                {id: 6, question: 'Напишите "Yamaha R1"'},
                {id: 7, question: 'Напишите "Джиксер"'},
                {id: 8, question: 'Напишите "Мустанг"'},
                {id: 9, question: 'Напишите "Додж"'},
            ],
            selectedQuestion: 0,
            answerCheck: {},
            answersOnQuestions: [],
        }
    },
    methods: {
        checkAnswer(answer, answerId) {
            this.answerCheck = { id: answerId, answer: answer, question: this.questions[this.selectedQuestion].question }
        },
        nextQuestion() {
            if (this.answerCheck.answer !== '') {
                this.answersOnQuestions.push(this.answerCheck)
                // this.answersOnQuestions.push()
                this.selectedQuestion++
            }
        },
        setRandomQuestions() {
            this.questions = this.questions.sort(() => Math.round(Math.random() * 100) - 50)
        },

        startAgain() {
            this.answersOnQuestions = []
            this.answerCheck = {}
            this.selectedQuestion = 0
            this.setRandomQuestions()
        },
        async sendForm() {
            // console.log(this.user, this.answersOnQuestions)
            // this.startAgain()
            // this.$emit('form-sent')
            try {
                const {data} = await axios.post('/api/users', { name: this.user.fullName, group: this.user.group, answers: this.answersOnQuestions } )
                console.log(data)
            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        this.setRandomQuestions()
    }
}
</script>

<style scoped>

</style>
