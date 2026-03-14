/**
 * 인증 관련 상수
 */

/**
 * 사용자 ID 규칙
 */
export const USER_ID_RULE = {
  /** 최소 길이 */
  MIN_LENGTH: 2,
  /** 최대 길이 */
  MAX_LENGTH: 50,
} as const

/**
 * 이름 규칙
 */
export const NAME_RULE = {
  /** 최소 길이 */
  MIN_LENGTH: 1,
  /** 최대 길이 */
  MAX_LENGTH: 100,
} as const

/**
 * 이메일 인증 타입
 */
export const EMAIL_VERIFICATION_TYPE = {
  /** 회원가입 */
  SIGN_UP: "SIGN_UP",
  /** 비밀번호 재설정 */
  RESET_PASSWORD: "RESET_PASSWORD",
  /** 본인 인증 */
  IDENTITY_VERIFICATION: "IDENTITY_VERIFICATION"
} as const

/**
 * 이메일 인증 관련 설정
 */
export const EMAIL_VERIFICATION = {
  /** 인증 코드 길이 */
  CODE_LENGTH: 6,
  /** 인증 코드 만료 시간 (초) */
  CODE_EXPIRY_SECONDS: 300, // 5분
  /** 재전송 대기 시간 (초) */
  RESEND_COOLDOWN_SECONDS: 60, // 1분
} as const

/**
 * 비밀번호 규칙
 */
export const PASSWORD_RULE = {
  /** 최소 길이 */
  MIN_LENGTH: 8,
  /** 최대 길이 */
  MAX_LENGTH: 128,
} as const

/**
 * 성별 타입
 */
export const GENDER_TYPE = {
  /** 남성 */
  MALE: "MALE",
  /** 여성 */
  FEMALE: "FEMALE",
  /** 기타 */
  OTHER: "OTHER",
} as const