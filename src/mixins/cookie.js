export default {
  methods: {
    cookiesIsExists (name) {
      let cookies = document.cookie

      let firstCondition = cookies.includes(`; ${name}=`)
      let secondCondition = cookies.match(/inGame=(.*); /)

      if (firstCondition || secondCondition) return true
    }
  }
}