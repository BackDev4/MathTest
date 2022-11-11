<template>
  <div class="form-control">
    <h2>Вопрос №{{ selectedQuestion + 1 }}</h2>
    <p>{{ question.question }}</p>
    <input type="text" v-model="answer" @input="$emit('check-answer', answer)">
  </div>
</template>

<script>
export default {
  name: "ItemTestComponent",
  props: {
    question: Object,
    selectedQuestion: Number,
  },
  data() {
    return {
      answer: ''
    }
  },
  watch: {
    selectedQuestion() {
      this.answer = ''
    }
  }
}
</script>

<style scoped>

</style>