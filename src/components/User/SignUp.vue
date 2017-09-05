<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm6, md4, lg3)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Sign Up
          tbd-form-alert(:error="error")
          v-card-text
            v-text-field(label="First Name", hide-details, v-model="firstname")
            v-text-field(label="Last Name", hide-details, v-model="lastname")
            v-text-field(label="Email", type="email", hide-details, v-model="email")
            v-text-field(label="Password", type="password" hide-details, v-model="password")
            v-text-field(label="Verify Password", type="password" hide-details, v-model="vpassword")
            v-card-actions(justify-center)
              v-spacer
              v-btn(primary, @click.prevent="signUp")
                div(v-if="loading")
                  v-progress-circular(indeterminate, :width="6" style="margin-top:2px")
                span(v-else) Sign In
              v-spacer
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        password: '',
        vpassword: '',
        firstname: '',
        lastname: ''
      }
    },
    computed:{
      error(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods: {
      signUp(){
        if(this.password === this.vpassword){
          this.$store.dispatch('signUp', { email:this.email, password: this.password, firstname: this.firstname, lastname: this.lastname })
        } else {
          this.$store.dispatch('setError', 'Username and password do not match')
        }
      }
    }
  }
</script>

<style>

</style>
