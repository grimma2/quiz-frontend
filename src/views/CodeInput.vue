<template>
  <div class="code-input">
    <form @submit.stop="submitCode">
      <input v-model="code" type="text" placeholder="Введите код команды">
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "CodeInput",
  data () {
    return {
      code: '',
      error: ''
    }
  },
  methods: {
    validateCode() {
      const SYMBOLS_IN_CODE = 5
      if (this.code.length !== SYMBOLS_IN_CODE) {
        this.error = `Код должен состоять из ${SYMBOLS_IN_CODE} символов`
      }
    },
    async submitCode() {
      this.validateCode()
      this.$router.push({path: `/play/team/${this.code}`})
    }
  }
}
</script>

<style scoped>

</style>