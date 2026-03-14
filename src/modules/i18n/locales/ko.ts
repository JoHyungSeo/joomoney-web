export default {
  auth: {
    common: {
      userIdOrEmail: "아이디/이메일",
      userId: "아이디",
      name: "이름",
      email: "이메일",
      verificationCode: "인증 코드",
      resendCode: "코드 재전송",
      codeSent: "코드 전송됨",
      codeSentTooltip: "{seconds}초 후에 새 코드를 요청할 수 있습니다. 코드는 5분 후에 만료됩니다.",
      didNotReceiveTheCode: "코드를 받지 못하셨나요?",
      password: "패스워드",
      birthday: "생일",
      gender: "성별",
      optional: "(선택)",

      termsOfService: "서비스 이용약관",
      privacyNote: "개인정보 처리방침",
    },

    logIn: {
      title: "로그인",
      continueWithGoogle: "Google 계정으로 계속하기",
      continueWithApple: "Apple 계정으로 계속하기",
      continueWithKakao: "Kakao 계정으로 계속하기"
    },

    forgotAccount: {
      title: "로그인에 도움이 필요하신가요?",
      rememberAccount: {
        title: "계정이 기억나요",
        description: "비밀번호 재설정을 시작하려면 여기를 클릭하세요",
      },
      forgotMyAccount: {
        title: "계정을 잊어버렸어요",
        description: "Joomoney 계정에 사용한 이메일 또는 전화번호가 기억나지 않습니다. 이의 신청을 하려면 여기를 클릭하세요.",
      },
    },
    resetPassword: {
      title: "패스워드 재설정",
      newPassword: {
        title: "새 비밀번호 입력",
      },
      complete: {
        title: "패스워드 재설정 완료",
        description: "패스워드가 성공적으로 변경되었습니다. 새 패스워드로 로그인해 주세요.",
      },
    },
    findId: {
      title: "아이디 찾기",
      description: "가입 시 사용한 이메일을 입력해 주세요.",
      result: {
        title: "아이디 찾기 결과",
        description: "회원님의 아이디 정보입니다.",
      },
    },
    findAccount: {
      title: "계정 찾는 방법",
      description: "수행할 작업을 선택하세요.",
      emailVerification: {
        title: "이메일로 계정찾기",
        description: "가입 시 사용한 이메일로 인증한 뒤 계정 아이디를 확인할 수 있어요.",
      },
      customerService: {
        title: "고객센터에 문의하기",
        description: "가입한 이메일에 접근할 수 없거나 계정을 찾을 수 없다면 고객센터로 문의하세요.",
      },
    },

    signUp: {
      userId: {
        title: "기억하기 쉬운 아이디"
      },
      name: {
        title: "멋진 이름"
      },
      email: {
        title: "고유한 이메일",
        agree: {
          text: `계정을 생성함으로써, Joomoney의 {privacy}에 동의합니다.`
        }
      },
      emailVerification: {
        title: "이메일 인증",
        description: "6자리 인증 코드가 {email}로 전송되었습니다. 5분 이내에 입력해 주세요.",
        modal: {
          title: "이메일 인증 코드를 받지 못하셨나요?",
          description: "이메일 인증 코드가 이메일로 전송되었습니다. 여러 번 시도했지만 코드를 받지 못한 경우 다음을 시도해 보세요:",
          tips: {
            checkSpam: "스팸/정크 메일함을 확인해 보세요.",
            verifyEmail: "이메일 주소가 {email}인지 확인하세요.",
            useLatestCode: "코드를 여러 번 요청한 경우, 가장 최근에 받은 코드를 입력해 주세요.",
            delayed: "메시지가 몇 분 지연될 수 있습니다. 5분 후에 다시 시도해 보세요.",
          },
        },
      },
      password: {
        title: "강력한 비밀번호",
        rules: {
          length: "8자 이상 128자 이하",
          upperCase: "대문자 1자 이상 포함",
          number: "숫자 1자 이상 포함",
          special: "특수문자 1자 이상 포함"
        }
      },
      birthdayGender: {
        title: "생일과 성별을 알려주세요",
        male: "남성",
        female: "여성",
        other: "기타",
        modal: {
          title: "회원가입 실패"
        }
      },
      complete: {
        title: "Joomoney에 오신 것을 \n환영합니다",
        description: "계정이 생성되었으며 이제 사용하실 수 있습니다"
      }
    },

    success: {
      userId: {
        available: "사용할 수 있는 아이디입니다"
      }
    },

    error: {
      userId: {
        required: "아이디를 입력해 주세요",
        length: "아이디는 2글자 이상 50글자 이하로 입력해 주세요",
        invalid: "잘못된 아이디 형식입니다. 영문, 숫자 또는 . - _ 문자만 사용할 수 있습니다",
        duplicate: "이미 사용 중인 아이디입니다"
      },
      name: {
        required: "이름을 입력해 주세요",
        invalid: "잘못된 이름 형식입니다. 문자, 공백 또는 . ' - 문자만 사용할 수 있습니다"
      },
      email: {
        required: "이메일을 입력해 주세요",
        invalid: "잘못된 이메일 형식입니다. 영문, 숫자 또는 - _ 문자만 사용할 수 있습니다",
        agreePolicy: "계정을 생성하려면 이용약관 및 개인정보 처리방침에 동의해야 합니다",
        duplicate: "이미 가입된 이메일입니다",
        codeLocked: "인증 실패 횟수 초과로 잠금 상태입니다. 잠시 후 다시 시도해 주세요",
        alreadyVerified: "이미 인증이 완료된 이메일입니다",
        cooldown: "잠시 후 다시 시도해 주세요. 1분 후에 재요청할 수 있습니다",
        sendFailed: "이메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요"
      },
      verificationCode: {
        required: "인증 코드를 입력해 주세요",
        notFound: "인증 요청을 찾을 수 없습니다",
        alreadyVerified: "이미 인증이 완료된 이메일입니다",
        expired: "인증 코드가 만료되었습니다. 새 코드를 요청해 주세요",
        locked: "인증 실패 횟수 초과로 잠금 상태입니다. 잠시 후 다시 시도해 주세요",
        failLimitExceeded: "인증 실패 횟수를 초과했습니다. 15분 후에 다시 시도해 주세요",
        invalid: "잘못된 인증 코드입니다. 확인 후 다시 시도해 주세요"
      },
      password: {
        required: "패스워드를 입력해 주세요",
        rule: "비밀번호가 모든 요구사항을 충족하지 않습니다"
      },
      birthday: {
        required: "생년월일을 입력해 주세요",
        invalid: "유효한 날짜를 입력해 주세요",
        rule: "생년월일은 미래일 수 없습니다"
      },
      resetPassword: {
        userNotFound: "존재하지 않는 아이디입니다",
        verifyRequired: "이메일 인증이 필요합니다. 다시 시도해 주세요",
        tokenExpired: "인증이 만료되었습니다. 처음부터 다시 시도해 주세요",
        tokenInvalid: "유효하지 않은 인증입니다. 처음부터 다시 시도해 주세요",
        tokenConsumed: "이미 사용된 인증입니다. 처음부터 다시 시도해 주세요",
        failed: "패스워드 재설정에 실패했습니다. 잠시 후 다시 시도해 주세요",
      },
      findId: {
        failed: "아이디 찾기에 실패했습니다. 잠시 후 다시 시도해 주세요",
      },
      signUp: {
        userAlreadyExists: "이미 사용 중인 아이디입니다",
        emailAlreadyExists: "이미 가입된 이메일입니다",
        invalidVerificationToken: "이메일 인증이 만료되었습니다. 다시 시도해 주세요",
        failed: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요",
      },
      login: {
        failed: "아이디 또는 패스워드가 일치하지 않습니다",
        banned: "이용이 제한된 계정입니다",
        dormant: "휴면 상태의 계정입니다",
        suspended: "정지된 계정입니다",
      },
    },
    
    button: {
      login: "로그인",
      logIn: "로그인",
      signUp: "회원가입",
      continue: "계속하기",
      next: "계속하기",
      needHelp: "도움이 필요하신가요?",
      ok: "확인",
    },
  },
  footer: {
    common: {
      language: "언어",
      cookie: "쿠키",
      privacy: "개인정보 처리방침"
    },
  }
}
