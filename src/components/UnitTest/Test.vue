<template>
  <div>
    <div class="message">
      {{ message }}
    </div>
    Введите имя пользователя: <input v-model="username">
    <div 
      v-if="error"
      class="error"
    >
      Пожалуйста, введите имя пользователя длиной не менее семи символов.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',

  data () {
    return {
      message: 'Добро пожаловать в книгу рецептов Vue.js',
      username: ''
    }
  },

  computed: {
    error () {
      return this.username.trim().length < 7
    }
  }
}
</script>