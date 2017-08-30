<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm6, md4, lg3)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Sign In
          v-alert(error dismissible :value="error" @click="dismissError" class="my-0")
            | {{error}}
          v-card-text
            v-text-field(name="input-1",
              label="Email",
              id="email",
              hide-details,
              v-model="email")
            v-text-field(name="input-1",
              label="Password",
              id="password", type="password"
              hide-details,
              v-model="password")
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
      },
      dismissError(){
        this.$store.dispatch('unsetError')
      }
    }
  }
</script>

<style>

</style>
