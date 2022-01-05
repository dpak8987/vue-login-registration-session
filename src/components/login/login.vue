<template>
  <div id="content" class="flex">
    <div class="alert alert-warning" role="alert">
      (Not used any encryption for password. Please use only dummy username/email and password.)
    </div>
    <div class="center">
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row">
            <div class="col-md-9 col-sm-7 col-lg-4 col-xl-5 col-8 mx-auto">
              <div class="card text-left">
                <div class="card-header">
                  <strong>Login to your account</strong>
                </div>
                <div class="card-body">
                  <form onsubmit="return false">
                    <div class="form-group">
                      <label class="text-muted" for="exampleInputEmail1"
                        >Email address</label
                      ><input
                        type="email"
                        v-model="username"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div class="form-group">
                      <label class="text-muted" for="exampleInputPassword1"
                        >Password</label
                      ><input
                        type="password"
                        v-model="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <router-link to="/register" class="signup-link"
                        >Register here</router-link
                      >
                    </div>
                    <span v-if="loadingProcess"><i class="fa fa-spinner fa-spin"> </i></span>
                    <button type="submit" class="btn btn-primary" :disabled="loadingProcess" @click="checkLogin">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data () {
    return {
      username: undefined,
      password: undefined,
      loadingProcess: false
    }
  },
  methods: {
    checkLogin: function () {
      this.loadingProcess = true;
      let url = this.$store.state.baseUrl;
      axios.post(url+"users/login", {"login":this.username,"password":this.password})
      .then((result) => {
        this.$session.start();
        this.$session.set("user",result.data.name);
        this.$router.push({"name":"dashboard"})
      })
      .catch((error) => {
        console.log("failure");
        this.loadingProcess = false;
      });      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
