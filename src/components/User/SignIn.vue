<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm6, md4, lg3)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Sign In
          tbd-form-alert(:error="error")
          v-card-text
            v-text-field(label="Email", hide-details, v-model="email", type="email")
            v-text-field(label="Password", type="password" hide-details, v-model="password")
            v-card-actions(justify-center)
              v-spacer
              v-btn(primary, @click.prevent="signIn") Sign In
              v-spacer
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        password: ''
      }
    },
    computed:{
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      signIn(){
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      }
    }
  }
</script>

<style>

</style>
