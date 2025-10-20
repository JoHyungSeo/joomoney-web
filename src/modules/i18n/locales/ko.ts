export default {
  auth: {
    common: {
      name: "이름",
      email: "이메일",
      password: "패스워드",
      birthday: "생일",
      gender: "성별",
      payday: "월급날",
      currency: "통화",

      optional: "(선택)",
    },

    logIn: {
      title: "로그인",
      continueWithGoogle: "Google 계정으로 계속하기",
      continueWithApple: "Apple 계정으로 계속하기",
    },

    signUp: {
      name: {
        title: "멋진 이름",
      },
      email: {
        title: "고유한 이메일",
      },
      password: {
        title: "강력한 비밀번호",
        rules: {
          length: "8자 이상 128자 이하",
          upperCase: "대문자 1자 이상 포함",
          number: "숫자 1자 이상 포함",
          special: "특수문자 1자 이상 포함",
        },
      },
      birthday_gender: {
        title: "생일과 성별을 알려주세요",
        male: "남성",
        female: "여성",
        other: "기타",
      },
      payday_currency: {
        title: "월급날과 통화를 \n알려주세요",
      },
      complete: {
        title: "Joomoney에 오신 것을 \n환영합니다",
        description: "계정이 생성되었으며 이제 사용하실 수 있습니다",
      },
    },

    error: {
      name: {
        required: "이름을 입력해 주세요",
      },
      email: {
        required: "이메일을 입력해 주세요",
        invalid: "잘못된 이메일 형식입니다. 숫자, 영문자 또는 -_ 문자만 사용할 수 있습니다",
      },
      password: {
        required: "패스워드를 입력해 주세요",
        rule: "비밀번호가 모든 요구사항을 충족하지 않습니다",
      },
      birthday: {
        required: "생년월일을 입력해 주세요",
        invalid: "유효한 날짜를 입력해 주세요",
        rule: "생년월일은 미래일 수 없습니다",
      },
      payday: {
        required: "월급날을 입력해 주세요",
      },
    },
    
    button: {
      login: "로그인",
      logIn: "로그인",
      signUp: "회원가입",
      continue: "계속하기",
      next: "계속하기",
    },
  }
}
