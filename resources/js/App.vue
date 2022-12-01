<template>
    <div class="card">
        <!---->
        <form
            v-if="testStart && answersOnQuestions.length !== questions.length"
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
        <!-- -------------------------- -->

        <form
            v-if="answersOnQuestions.length === questions.length"
            @submit.prevent="startAgain"
        >
            <h1>Конец!</h1>
            <button class="btn primary">Пройти повторно</button>
        </form>

        <form
            class="form-control"
            v-if="!testStart"
            @submit.prevent="startTest"
        >
            <label for="">
                <h3>Введите Имя и Фамилию</h3>
                <input type="text" v-model="user.fullName">
            </label>
            <label for="">
                <h3>Введите группу</h3>
                <input type="text" v-model="user.group">
            </label>
            <button
                class="btn primary"
                :disabled="user.fullName.length <= 5 || user.group.length <= 2"
            >Начать тест
            </button>
        </form>
        <!---->
    </div>
</template>

<script>
import ItemTestComponent from "./components/ItemTestComponent";

export default {
    name: 'App',
    components: {ItemTestComponent},
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
            user: {
                fullName: '',
                group: '',
            },
            testStart: false,
        }
    },
    methods: {
        startTest() {
            this.testStart = this.user.fullName.length > 5 && this.user.group.length >= 2
        },
        checkAnswer(answer, answerId) {
            this.answerCheck = { id: answerId, answer: answer }
        },
        nextQuestion() {
            if (this.answerCheck.answer !== '') {
                this.answersOnQuestions.push(this.answerCheck)
                this.selectedQuestion++
            }
        },
        startAgain() {
            this.answersOnQuestions = []
            this.answerCheck = {}
            this.selectedQuestion = 0
            this.setRandomQuestions()
        },
        setRandomQuestions() {
            this.questions = this.questions.sort(() => Math.round(Math.random() * 100) - 50)
        }
    },
    mounted() {
        this.setRandomQuestions()
    }
}
</script>

<style>

</style>
