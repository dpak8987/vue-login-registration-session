<template lang="html">
  <span>
    <span
      v-if="hasInvalidInput"
      :class="displayClasses"
      id="general-input-validation">
      <i :class="displayedFontAwesomeIcon"></i>
      {{ errorForDisplay }}
    </span>
  </span>
</template>
<script>
export default {
    props: {
        inputValue: {
            required: true
        },
        targetName: {
            type: String,
            default: ""
        },
        fontAwesomeIcon: {
            type: String,
            default: "fa fa-exclamation-circle"
        },
        displayBlock: {
            type: Boolean,
            default: false
        },
        checkFor: {
            type: Array,
            default: function () {
                return ['whitespace']
            }
        },
        hasError: {
            default: true
        }
    },
    data () {
        return {
            errorForDisplay: '',
            displayedFontAwesomeIcon: this.fontAwesomeIcon,
        }
    },
    mounted: function () {
        this.$emit('update:hasError', this.hasInvalidInput);
    },
    computed: {
        // Check if a non-object variable has any space because you should not check if an object has any spaces
        hasWhiteSpace () {
            let whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/;
            if (!(this.inputValue instanceof Object) ) {
                return !whiteSpaceRegex.test(this.inputValue);
            }
            return false;
        },
        // Check if a variable is empty, for example, object with no keys, array with length 0, null, undefined or empty string.
        hasEmptyValue () {
            if (this.inputValue instanceof Array) {
                return !( this.inputValue.length > 0 );
            } else if (this.inputValue instanceof Object) {
                return !( Object.keys(this.inputValue).length > 0 );
            } else {
                return this.inputValue === null || this.inputValue === undefined || this.inputValue === '';
            }
        },
        // Check if there are any special charaters
        hasSpecialChars () {
            let specialCharRegex = /^[0-9a-zA-Z\-\_\ ]+$/;
            if (!(this.inputValue instanceof Object)) {
                if(this.inputValue != '') {
                    return !specialCharRegex.test(this.inputValue);
                }
            }
            return false;
        },
        // Check if there are any special charaters or numbers in first name
        hasValidName () {
            let validName = /^[a-zA-Z ]*$/;
            if (!(this.inputValue instanceof Object)) {
                return !validName.test(this.inputValue);
            }
            return false;
        },
        // Check if there are any special charaters or numbers
        hasvalidPasword () {
            if (!(this.inputValue instanceof Object) && this.inputValue !== undefined) {
                if(this.inputValue.length < 6) {
                    return true;
                }
            }
            return false;
        },
        // Check if a non-object varaible has uppercase
        hasUppercase () {
            let uppercaseRegex = /[A-Z]+/;
            if (!(this.inputValue instanceof Object)) {
                return uppercaseRegex.test(this.inputValue);
            }
            return false;
        },
        // Check if input is valid email
        hasValidEmail () {
            let emailRegex = /^\S+@\S+\.\S+$/;
            if (!(this.inputValue instanceof Object) && this.inputValue !== undefined) {
                return !emailRegex.test(this.inputValue);
            }
            return false;
        },
        // Check if input has any error
        hasInvalidInput () {
            let errorInfo = '';
            let whitespaceError = false;
            let emptyError = false;
            let uppercaseError = false;
            let specialCharsError = false;
            let nameHasError = false;
            let emailHasError = false;
            let passwordHasError = false;
            const hasEmpty = this.hasEmptyValue;
            const hasSpace = this.hasWhiteSpace;
            const hasUpper = this.hasUppercase;
            const hasSplChars = this.hasSpecialChars;
            const hasValidName = this.hasValidName;
            const hasValidEmail = this.hasValidEmail;
            const hasvalidPasword = this.hasvalidPasword;

            if (this.checkFor.includes('empty')) {
                if (hasEmpty) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + 'required ');
                    emptyError = true;
                    this.displayedFontAwesomeIcon = "fa fa-info-circle";
                }
            }

            if (this.checkFor.includes('validname')) {
                if (hasValidName) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + 'please enter valid name ');
                    nameHasError = true;
                    this.displayedFontAwesomeIcon = "fa fa-info-circle";
                }
            }

            if (this.checkFor.includes('validemail')) {
                if (hasValidEmail) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + 'please provide valid email ');
                    emailHasError = true;
                    this.displayedFontAwesomeIcon = "fa fa-info-circle";
                }
            }

            if (this.checkFor.includes('validpassword')) {
                if (hasvalidPasword) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + 'minimum 6 characters ');
                    passwordHasError = true;
                    this.displayedFontAwesomeIcon = "fa fa-info-circle";
                }
            }

            if (this.checkFor.includes('whitespace')) {
                if (hasSpace) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + ' should not start/end with whitespaces');
                    whitespaceError = true;
                    this.displayedFontAwesomeIcon = this.fontAwesomeIcon;
                }
            }
            if (this.checkFor.includes('specialchars')) {
                if (hasSplChars) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + ' cannot have special characters ');
                    specialCharsError = true;
                    this.displayedFontAwesomeIcon = this.fontAwesomeIcon;
                }
            }
            if (this.checkFor.includes('uppercase')) {
                if (hasUpper) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += (this.targetName + ' cannot have uppercase ');
                    uppercaseError = true;
                    this.displayedFontAwesomeIcon = this.fontAwesomeIcon;
                }
            }

            this.errorForDisplay = errorInfo;
            return whitespaceError || emptyError || uppercaseError  || specialCharsError || nameHasError || emailHasError || passwordHasError;
        },
        // Display the classes accordingly
        displayClasses () {
            let spanDisplay = this.displayBlock ? 'span-display-block' : '';
            let infoMessage = this.hasEmptyValue ? 'color-info--blue' : '';
            let isErrorMessage = this.hasWhiteSpace ? 'color-error--red' : '';
            let isUppercaseMessage = this.hasUppercase ? 'color-error--red' : '';
            let ishasSpecialCharsMessage = this.hasSpecialChars ? 'color-error--red' : '';

            return [
                        'span-message__tag',
                        'error-message--padding-right',
                        spanDisplay,
                        infoMessage,
                        isErrorMessage,
                        isUppercaseMessage,
                        ishasSpecialCharsMessage
                   ];
        }
    },
    watch: {
        hasInvalidInput: function (val) {
            this.$emit('update:hasError', val);
        }
    }
}
</script>

<style lang="css" scoped>
.span-display-block {
    display: block;
}
.error-message--padding-right {
    padding-right: 6px;
}
#general-input-validation {
    font-size: 13px;
}
#general-input-validation i {
    width: auto;
}
.input--display-none {
    display: none;
}
</style>