<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm6, md4, lg3)
        v-card
          div(class="primary white--text mb-0 pa-3 headline") Sign Up
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
              v-btn(primary, @click.prevent="signIn") Sign Up
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
    methods: {
      signIn(){

      }
    }
  }
</script>

<style>

</style>
