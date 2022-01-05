<template>
  <div id="content" class="flex">
    <div class="center">
      <div :class="['alert',alertClass,'alert-dismissible','mx-auto']" v-if="registrationError">
        <label>{{alertMessage}}</label>
      </div>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row">
            <div class=" col-8 col-md-12 col-sm-8 col-lg-7 col-xl-7 mx-auto">
              <div class="card text-left">
                <div class="card-header">
                  <strong>Registration form</strong>
                </div>
                <div class="card-body">
                  <form onsubmit="return false">
                    <div class="form-group row">
                      <label for="first_name" class="col-md-4 col-form-label required text-md-right text-muted">First Name</label>
                      <div class="col-md-7 col-lg-6 col-sm-9">
                        <input type="text" id="firstName" class="form-control" name="firstName" v-model="firstName" placeholder="First name">
                        <small id="emailHelp" class="form-text text-muted required-text">
                          <v-input-validation
                            :inputValue="firstName"
                            :checkFor="['whitespace','validname']"
                            :hasError.sync="firstNameHasError"
                          />
                        </small>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="last_name" class="col-md-4 col-form-label text-md-right text-muted">Last Name</label>
                      <div class="col-md-7 col-lg-6 col-sm-9">
                        <input type="text" id="lastName" class="form-control" name="lastName" v-model="lastName" placeholder="Last name">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="email" class="col-md-4 col-form-label required text-md-right text-muted">Email ID</label>
                      <div class="col-md-7 col-lg-6 col-sm-9">
                        <input type="email" id="email" class="form-control" name="email" v-model="email" placeholder="Email">
                        <small id="emailHelp" class="form-text text-muted required-text">
                          <v-input-validation
                            :inputValue="email"
                            :checkFor="['validemail']"
                            :hasError.sync="emailHasError"
                          />
                        </small>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="password" class="col-md-4 col-form-label required text-md-right text-muted">Password</label>
                      <div class="col-md-7 col-lg-6 col-sm-9">
                        <input type="password" id="password" class="form-control" name="password" v-model="password" placeholder="Password">
                        <small id="emailHelp" class="form-text text-muted required-text">
                          <v-input-validation
                            :inputValue="password"
                            :checkFor="['validpassword']"
                            :hasError.sync="passwordHasError"
                          />
                        </small>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="confirm_password" class="col-md-4 col-form-label required text-md-right text-muted">Confirm password</label>
                      <div class="col-md-7 col-lg-6 col-sm-9">
                        <input type="password" id="confirmPassword" class="form-control" name="confirmPassword" v-model="confirmPassword" placeholder="Confirm password">
                        <small v-if="confirmPasswordHasError" class="form-text text-muted required-text">confirm password does not match with password</small>
                      </div>
                    </div>
                    <div class="text-center">
                      <span v-if="loadingProcess"><i class="fa fa-spinner fa-spin"> </i></span>
                      <button type="submit" class="btn btn-primary" @click="submitRegistration" :disabled="!isFormValid || !isValidPassword || loadingProcess">
                        Register
                      </button>
                    </div>
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
import generalMixins from '../mixins/generalMixins.js';
import inputValidation from '../general/input-validation';
import axios from 'axios';
export default {
  mixins:[generalMixins],
  components: {
        'v-input-validation': inputValidation
    },
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      firstNameHasError: true,
      emailHasError: true,
      passwordHasError: true,
      confirmPasswordHasError: false,
      alertClass: "",
      alertMessage: "",
      registrationError: false,
      loadingProcess: false
    }
  },
  watch: {
    confirmPassword () {
      this.confirmPasswordHasError = this.confirmPassword === this.password ? false : true;
    }
  },
  computed: {
    isFormValid () {
      if(this.firstName && this.email && this.password) {
         return (this.firstNameHasError || this.emailHasError || this.passwordHasError) ? false : true;
      } else {
        return false;
      }
    },
    isValidPassword () {
      if(this.confirmPassword) {
        return (this.confirmPassword === this.password) ? true : false;
      } else {
        return false;
      }
    }
  },
  methods: {
    submitRegistration : function () {
      this.loadingProcess = true;
      let url = this.$store.state.baseUrl;
      let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, DELETE',
        'Content-Type': 'text/plain'
      }
      axios.post(url+"users/register", {"name":this.firstName,"password":this.password,"email":this.email, "lastname":this.lastName, "username":this.email},{headers})
      .then((result) => {
        this.registrationError = false;
        this.alertMessage = "";
        this.$swal({
          title: 'Successly registered',
          text: 'You are being redirected to the login page',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        }).then(
            this.$router.push({"name":"login"})
        )
      })
      .catch((error) => {
        this.alertClass = 'alert-danger';
        this.alertMessage = error.response.data.message;
        this.registrationError = true;
        this.loadingProcess = false;
      });      
    },
  }
}
</script>
