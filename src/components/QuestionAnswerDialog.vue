<template>
  <div class="question-answer-dialog">
    <p class="ques-text">{{ questionText }}</p>
    <form @submit.stop="$emit('addAnswer', answer, isRare)">
      <input name="ques-text-input" type="text" v-model="answer">
      <input name="ques-is-rare" type="checkbox" v-model="isRare">Редкий
      <button type="submit">Сохранить</button>
    </form>
    <button @click.stop="$emit('close')">Закрыть</button>
  </div>
</template>

<script>
export default {
  name: "QuestionAnswerDialog",
  data () {
    return {
      answer: '',
      isRare: false
    }
  },
  props: {
    questionText: {
      type: String,
      required: true
    },
    questionPk: {
      type: String,
      required: true
    }
  },
  methods: {
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.$emit('close')
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.close)
  }
}
</script>

<style scoped>

</style>