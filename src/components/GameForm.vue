<template>
  <question-answer-dialog
    v-if="answerDialog.show"
    :question-pk="answerDialog.questionPk"
    :question-text="answerDialog.questionText"
    @addAnswer="addAnswer"
    @close="clearAnswerDialog"
  />
  <div class="game-form">
    <input type="text" v-model="game.name" placeholder="Название игры">
    <input type="text" v-model="game.users_in_team_lim">
    <input type="time" v-model="game.question_time">
    <div class="teams">
      <div class="team" v-for="team in game.team_set" :key="team.pk">
        <p
          class="team-name"
          v-if="teamInput !== team.pk"
          @click.stop="teamInput = team.pk"
        >{{ team.name }}</p>
        <input type="text" v-else v-model="team.name" @keydown="removeTeamInput">
        <button @click="removeTeam(team)">Удалить команду</button>
      </div>
      <button @click="addItem(game.team_set, {name: 'Новая команда'})">Добавить команду</button>
    </div>
    <div class="questions">
      <div class="question" v-for="ques in game.question_set" :key="ques.pk">
        <p
          class="ques-text"
          v-if="questionInput !== ques.pk"
          @click.stop="questionInput = ques.pk"
        >{{ ques.text }}</p>
        <input type="text" v-else v-model="ques.text" @keydown="removeQuestionInput">
        <div class="ques-correct-answers">
          <div class="ques-answer" v-for="answer in ques.correct_answers">
            <span class="answer-text">{{ answer.text }}</span>
            <button @click="removeAnswer(ques, answer)">Удалить ответ</button>
          </div>
          <button @click.stop="showAnswerDialog(ques)">Добавить ответ</button>
        </div>
        <button @click="removeQuestion(ques)">Удалить вопрос</button>
      </div>
      <button
        @click="addItem(game.question_set, {text: 'Новый вопрос', correct_answers: []})"
      >Добавить вопрос</button>
    </div>
    <button @click="saveGame">Сохранить</button>
    <button @click="$emit('cancel')">Отменить</button>
  </div>
</template>

<script>
import game from '@/mixins/game'
import QuestionAnswerDialog from "@/components/QuestionAnswerDialog";
import {ax} from "@/api/defaults";

export default {
  name: "GameForm",
  components: {QuestionAnswerDialog},
  mixins: [game],
  data () {
    return {
      game: {
        question_set: [],
        team_set: []
      },
      teamInput: '',
      questionInput: '',
      answerDialog: {
        show: false,
        questionPk: '',
        questionText: ''
      }
    }
  },
  methods: {
    removeTeamInput (e) {
      if (e.keyCode === 13) this.teamInput = false
    },
    removeQuestionInput (e) {
      if (e.keyCode === 13) this.questionInput = false
    },
    removeTeam(team) {
      this.game.team_set = this.game.team_set.filter(tm => tm.pk !== team.pk)
    },
    removeQuestion(question) {
      this.game.question_set = this.game.question_set.filter(qs => qs.pk !== question.pk)
    },
    removeAnswer(question, answer) {
      question.correct_answers = question.correct_answers.filter(an => an.pk !== answer.pk)
    },
    addItem (array, fields) {
      array.push({...fields, pk: new Date()})
    },
    showAnswerDialog (question) {
      this.answerDialog.questionPk = question.pk
      this.answerDialog.questionText = question.text
      this.answerDialog.show = true
    },
    addAnswer (answer, isRare) {
      let question = this.game.question_set.filter(
        qs => qs.pk === this.answerDialog.questionPk
      )
      question[0].correct_answers.push({text: answer, rare: isRare})
      this.clearAnswerDialog()
    },
    clearAnswerDialog () {
      this.answerDialog.questionPk = ''
      this.answerDialog.questionText = ''
      this.answerDialog.show = false
    },
    getSaveURL () {
      if (this.$route.params.pk) {
        return 'game/update/'
      } else {
        this.game.question_time = `00:${this.game.question_time}`
        return 'game/create/'
      }
    },
    async saveGame () {
      try {
        const response = await ax.post(this.getSaveURL(), this.game)
        console.log(response.data)
        this.$router.push({path: `/game/${response.data.pk}`})
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    let gamePk = this.$route.params.pk
    if (gamePk) {
      this.game = await this.fetchGame(gamePk)
    }
  }
}
</script>

<style scoped>

</style>