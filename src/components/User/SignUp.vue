<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm6, md4, lg3)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Sign Up
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
            v-text-field(name="input-1",
              label="Verify Password",
              id="vpassword", type="password"
              hide-details,
              v-model="vpassword")
            v-card-actions(justify-center)
              v-spacer
              v-btn(primary, @click.prevent="signUp") Sign Up
              v-spacer
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        password: '',
        vpassword: ''
      }
    },
    computed:{
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      signUp(){
        if(this.password === this.vpassword){
          this.$store.dispatch('signUp', { email:this.email, password: this.password })
        } else {
          this.$store.dispatch('setError', 'Username and password do not match')
        }
      },
      dismissError(){
        this.$store.dispatch('unsetError')
      }
    }
  }
</script>

<style>

</style>
