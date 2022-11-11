<template>
  <div class="card">
    <!---->
    <div v-if="fullName.length > 5 && testStart">
      <item-test-component
          :question="randomArr[selectedQuestion]"
          :selectedQuestion="selectedQuestion"
          @check-answer="checkAnswer"
      />
      <button
          class="btn primary"
          :disabled="selectedQuestion > 9"
          @click="nextQuestion"
      >Продолжить
      </button>
    </div>

    <!-- -------------------------- -->

    <div class="form-control" v-else>
      <label for="">
        <h3>Введите Имя и Фамилию</h3>
        <input type="text" v-model="fullName">
      </label>
      <label for="">
        <h3>Введите группу</h3>
        <input type="text" v-model="group">
      </label>
      <button
          class="btn primary"
          :disabled="fullName.length <= 5 || group.length <= 2"
          @click="testStart = fullName.length > 5 && group.length >= 2"
      >Начать тест
      </button>
    </div>
    <!---->
  </div>
</template>

<script>
import ItemTestComponent from "./components/ItemTestComponent";

export default {
  name: 'App',
  components: { ItemTestComponent },
  data() {
    return {
      questions: [
        {id: 0, question: 'Напишите "Человек"', answer: 'Человек'},
        {id: 1, question: 'Напишите "Чупа-чупс".', answer: 'Чупа-чупс'},
        {id: 2, question: 'Напишите "Слово"', answer: 'Слово'},
        {id: 3, question: 'Напишите "Как дела?"', answer: 'Как дела?'},
        {id: 4, question: 'Напишите "Чупапи-муняню"', answer: 'Чупапи-муняню'},
        {id: 5, question: 'Напишите "Honda CBR600RR"', answer: 'Honda CBR600RR'},
        {id: 6, question: 'Напишите "Yamaha R1"', answer: 'Yamaha R1'},
        {id: 7, question: 'Напишите "Джиксер"', answer: 'Джиксер'},
        {id: 8, question: 'Напишите "Мустанг"', answer: 'Мустанг'},
        {id: 9, question: 'Напишите "Додж"', answer: 'Додж'},
      ],
      selectedQuestion: 0,
      answerCheck: '',
      answersOnQuestions: {
        correct: [],
        wrong: []
      },
      fullName: '',
      group: '',
      testStart: false,
    }
  },
  methods: {
    checkAnswer(answer) {
      this.answerCheck = answer
    },
    nextQuestion() {
      if (this.randomArr[this.selectedQuestion].answer.toLowerCase().trim() === this.answerCheck.toLowerCase().trim()) {
        this.answersOnQuestions.correct.push(this.randomArr[this.selectedQuestion])
        alert('Верно!')
      } else {
        this.answersOnQuestions.wrong.push(this.randomArr[this.selectedQuestion])
        alert('Неверно!')
      }

      this.selectedQuestion++
    }
  },
  computed: {
    randomArr() {
      const arr = this.questions

      return arr.sort(() => Math.round(Math.random() * 100) - 50)
    }
  },
}
</script>

<style>

</style>
