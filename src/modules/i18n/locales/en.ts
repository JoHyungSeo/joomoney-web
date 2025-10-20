export default {
  auth: {
    common: {
      name: "Name",
      email: "Email",
      password: "Password",
      birthday: "Birthday",
      gender: "Gender",
      payday: "Payday",
      currency: "Currency",

      optional: "(optional)",
    },

    logIn: {
      title: "Log in",
      continueWithGoogle: "Continue with Google",
      continueWithApple: "Continue with Apple",
    },

    signUp: {
      name: {
        title: "Enter your name",
      },
      email: {
        title: "Enter your email",
      },
      password: {
        title: "Create a password",
        rules: {
          length: "8 to 128 characters",
          upperCase: "At least 1 uppercase",
          number: "At least 1 number",
          special: "At least 1 special character",
        },
      },
      birthday_gender: {
        title: "Enter your birthday & gender",
        male: "Male",
        female: "Female",
        other: "Other",
      },
      payday_currency: {
        title: "Enter your payday & currency",
      },
      complete: {
        title: "Welcome to Joomoney",
        description: "Your account has been created and is ready to use",
      },
    },

    error: {
      name: {
        required: "Please enter your name",
      },
      email: {
        required: "Please enter your email",
        invalid: "Invalid email address. Only use numbers, letters, or -_ characters",
      },
      password: {
        required: "Please enter your password",
        rule: "Password does not meet all requirements",
      },
      birthday: {
        required: "Please complete your birthday",
        invalid: "Please enter a valid date",
        rule: "Birthday cannot be in the future",
      },
      payday: {
        required: "Please enter your payday",
      }
    },

    button: {
      login: "Login",
      logIn: "Log in",
      signUp: "Create a Joomoney Account",
      continue: "Continue",
      next: "Next"
    }
  }
}
