<template lang="pug">
  v-alert(error dismissible :value="error" @click="dismissError" class="my-0")
    | {{error}}
</template>

<script>
  export default {
    props: ['error'],
    methods: {
      dismissError(){ this.$store.dispatch('unsetError') }
    },
    destroyed(){ this.$store.dispatch('unsetError') }
  }
</script>
