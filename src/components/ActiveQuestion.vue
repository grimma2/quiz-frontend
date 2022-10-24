<template>
  <div class="active-question">
    <span>question timer</span>
    <p>{{ question.text }}</p>
    <span>В этом вопросе нужно ввести {{ question.correct_answers.length }} ответов</span>
    <div>
      <div v-for="answer in inputAnswers">
        <div class="answer">
          <span>{{ answer.text }}</span>
          <button @click="deleteAnswer(answer)">del answer</button>
        </div>
      </div>
    </div>
    <input
      type="text"
      placeholder="Ввести ответ"
      v-model="currentInput"
      @keydown="addAnswer"
    >
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "ActiveQuestion",
  data () {
    return {
      inputAnswers: [],
      currentInput: '',
      error: ''
    }
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  methods: {
    addAnswer (e) {
      if (e.keyCode !== 13) return
      let answerText = this.currentInput
      if (!answerText) return

      this.inputAnswers.push(
        {text: answerText, pk: new Date()}
      )

      if (this.inputAnswers.length === this.question.correct_answers.length) {
        this.validateAllAnswers()
      }
    },
    deleteAnswer (answer) {
      this.inputAnswers = this.inputAnswers.filter(an => an.pk !== answer.pk)
    },
    validateAllAnswers () {
      for (let correct of this.question.correct_answers) {
        for (let input of this.inputAnswers) {
          if (correct.text === input.text) {
            input.color = 'green'
          }
        }
      }

      let answerIsValid = true

      for (let input of this.inputAnswers) {
        if (input.color !== 'green') {
          input.color = 'red'
          answerIsValid = false
          this.error = 'Некоторые ответы оказались не верны'
        }
      }
      if (answerIsValid) this.$store.dispatch('team/sendNextQuestion')
    }
  }
}
</script>

<style scoped>

</style>