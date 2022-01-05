<template>
<div class="container-fluid">
  <nav class="navbar navbar-expand-xl navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Welcome {{username}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link signout-link" @click="signOut">signout</a>
        </li>
      </ul>
    </div>
  </nav>

</div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$session.get('user')
    }
  },
  methods: {
    signOut () {
      this.$session.destroy()
      this.$router.push({"name":"login"})
    }
  }
}
</script>
<style scoped>
.signout-link {
  cursor: pointer;
}
</style>