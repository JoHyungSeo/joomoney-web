export default {
  auth: {
    common: {
      userIdOrEmail: "ID/Email",
      userId: "ID",
      name: "Name",
      email: "Email",
      verificationCode: "Verification Code",
      resendCode: "Resend Code",
      codeSent: "Code Sent",
      codeSentTooltip: "You can request a new code in {seconds} seconds. The code will expire in 5 minutes.",
      didNotReceiveTheCode: "Didn't receive the code?",
      password: "Password",
      birthday: "Birthday",
      gender: "Gender",
      optional: "(optional)",

      termsOfService: "Terms of Service",
      privacyNote: "Privacy Note",
    },

    logIn: {
      title: "Log in",
      continueWithGoogle: "Continue with Google",
      continueWithApple: "Continue with Apple",
      continueWithKakao: "Continue with Kakao"
    },

    forgotAccount: {
      title: "Need help to log in?",
      rememberAccount: {
        title: "I Remember My Account",
        description: "Click here to start resetting your password",
      },
      forgotMyAccount: {
        title: "I Forgot My Account",
        description: "I don't remember the email or phone number I used for my Joomoney account. Click here to submit an appeal.",
      },
    },
    resetPassword: {
      title: "Reset Password",
      newPassword: {
        title: "Create new password",
      },
      complete: {
        title: "Password Reset Complete",
        description: "Your password has been successfully changed. Please log in with your new password.",
      },
    },
    findId: {
      title: "Find Your ID",
      description: "Enter the email you used when signing up.",
      result: {
        title: "ID Found",
        description: "Here is your account ID.",
      },
    },
    findAccount: {
      title: "How to Find Your Account",
      description: "Choose what you'd like to do.",
      emailVerification: {
        title: "Find Account by Email",
        description: "You can verify with your registration email to find your account ID.",
      },
      customerService: {
        title: "Contact Customer Service",
        description: "If you can't access your registered email or find your account, please contact customer service.",
      },
    },

    signUp: {
      userId: {
        title: "Enter your ID"
      },
      name: {
        title: "Enter your name"
      },
      email: {
        title: "Enter your email",
        agree: {
          text: "By creating an account, I agree to Joomoney's {privacy}."
        }
      },
      emailVerification: {
        title: "Verify your email",
        description: "A 6-digit code has been sent to {email}. Please enter it within the next 5 minutes.",
        modal: {
          title: "Didn't Receive the Email Verification Code?",
          description: "The email verification code has been sent to your email. If you have not received the code after several attempts, please try the following:",
          tips: {
            checkSpam: "Check if it is in your junk/spam mail.",
            verifyEmail: "Make sure your email address is {email}.",
            useLatestCode: "If you have requested the code multiple times, please enter the most recent code.",
            delayed: "The message may be delayed for a few minutes. Try again after 5 minutes.",
          },
        },
      },
      password: {
        title: "Create a password",
        rules: {
          length: "8 to 128 characters",
          upperCase: "At least 1 uppercase",
          number: "At least 1 number",
          special: "At least 1 special character"
        }
      },
      birthdayGender: {
        title: "Enter your birthday & gender",
        male: "Male",
        female: "Female",
        other: "Other",
        modal: {
          title: "Sign Up Failed"
        }
      },
      complete: {
        title: "Welcome to Joomoney",
        description: "Your account has been created and is ready to use"
      }
    },

    success: {
      userId: {
        available: "This user ID is available"
      }
    },

    error: {
      userId: {
        required: "Please enter your ID",
        length: "Please enter an ID between 2 and 50 characters",
        invalid: "Invalid user ID. Only use letters, numbers, or . - _ characters",
        duplicate: "This user ID is already taken"
      },
      name: {
        required: "Please enter your name",
        invalid: "Invalid user name. Only use letters, space, or . ' - characters"
      },
      email: {
        required: "Please enter your email",
        invalid: "Invalid email address. Only use letters, numbers, or - _ characters",
        agreePolicy: "You need to accept our terms and privacy policy to create an account",
        duplicate: "This email is already registered",
        codeLocked: "Too many failed attempts. Please try again later",
        alreadyVerified: "This email has already been verified",
        cooldown: "Please try again later. You can request a new code after 1 minute",
        sendFailed: "Failed to send the email. Please try again later"
      },
      verificationCode: {
        required: "Please enter the verification code",
        notFound: "No verification request found",
        alreadyVerified: "This email has already been verified",
        expired: "Verification code has expired. Please request a new code",
        locked: "Too many failed attempts. Please try again later",
        failLimitExceeded: "Too many failed attempts. Please try again in 15 minutes",
        invalid: "Invalid verification code. Please check and try again"
      },
      password: {
        required: "Please enter your password",
        rule: "Password does not meet all requirements"
      },
      birthday: {
        required: "Please complete your birthday",
        invalid: "Please enter a valid date",
        rule: "Birthday cannot be in the future"
      },
      resetPassword: {
        userNotFound: "User ID not found",
        verifyRequired: "Email verification is required. Please try again",
        tokenExpired: "Verification has expired. Please start over",
        tokenInvalid: "Invalid verification. Please start over",
        tokenConsumed: "Verification has already been used. Please start over",
        failed: "Failed to reset password. Please try again later",
      },
      findId: {
        failed: "Failed to find ID. Please try again later",
      },
      signUp: {
        userAlreadyExists: "This user ID is already taken",
        emailAlreadyExists: "This email is already registered",
        invalidVerificationToken: "Email verification has expired. Please try again",
        failed: "Sign up failed. Please try again later",
      },
      login: {
        failed: "Incorrect ID or password",
        banned: "This account has been banned",
        dormant: "This account is dormant",
        suspended: "This account has been suspended",
      },
    },

    button: {
      login: "Login",
      logIn: "Log in",
      signUp: "Create a Account",
      continue: "Continue",
      next: "Next",
      needHelp: "Need help?",
      ok: "OK",
    }
  },
  footer: {
    common: {
      language: "Language",
      cookie: "Cookie",
      privacy: "Privacy",
    },
  }
}
