// 로그 레벨 정의
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// 현재 환경에 따른 로그 레벨 설정
const currentLogLevel =
  process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG;

// 원격 로깅 서비스 URL (필요한 경우 설정)
const REMOTE_LOGGING_URL = process.env.REMOTE_LOGGING_URL || "";

// 로그 메시지 형식 정의
interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  context?: string;
  userId?: string;
}

// 로그 메시지 포맷팅
const formatLogMessage = (message: LogMessage): string => {
  const levelString = LogLevel[message.level];
  return `[${message.timestamp}] [${levelString}] ${message.context ? `[${message.context}] ` : ""}${message.message}`;
};

// 원격 로깅 서비스로 로그 전송 (실제 구현 필요)
const sendToRemoteLogging = async (message: LogMessage): Promise<void> => {
  if (!REMOTE_LOGGING_URL) return;

  try {
    await fetch(REMOTE_LOGGING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    // 원격 로깅 실패 시 콘솔에만 기록
    console.error("원격 로깅 실패:", error);
  }
};

// 로컬 스토리지에 오류 로그 저장 (최근 10개)
const saveToLocalStorage = (message: LogMessage): void => {
  if (message.level < LogLevel.ERROR) return;

  try {
    const logs = JSON.parse(
      localStorage.getItem("zipcheck_error_logs") || "[]"
    );
    logs.unshift(message);

    // 최대 10개 로그만 유지
    while (logs.length > 10) {
      logs.pop();
    }

    localStorage.setItem("zipcheck_error_logs", JSON.stringify(logs));
  } catch (error) {
    console.error("로컬 스토리지 저장 실패:", error);
  }
};

// 로그 기록 함수
const log = (
  level: LogLevel,
  message: string,
  data?: any,
  context?: string
): void => {
  // 현재 로그 레벨보다 낮은 레벨은 무시
  if (level < currentLogLevel) return;

  const timestamp = new Date().toISOString();
  const logMessage: LogMessage = {
    level,
    message,
    timestamp,
    data,
    context,
    // 사용자 ID가 있는 경우 추가
    userId: localStorage.getItem("user_id") || undefined,
  };

  // 콘솔에 로그 출력
  const formattedMessage = formatLogMessage(logMessage);

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(formattedMessage, data || "");
      break;
    case LogLevel.INFO:
      console.info(formattedMessage, data || "");
      break;
    case LogLevel.WARN:
      console.warn(formattedMessage, data || "");
      break;
    case LogLevel.ERROR:
      console.error(formattedMessage, data || "");
      // 에러 로그는 로컬 스토리지에 저장
      saveToLocalStorage(logMessage);
      // 에러 로그는 원격 서비스로 전송
      sendToRemoteLogging(logMessage);
      break;
  }
};

// 편의 함수들
const debug = (message: string, data?: any, context?: string): void =>
  log(LogLevel.DEBUG, message, data, context);

const info = (message: string, data?: any, context?: string): void =>
  log(LogLevel.INFO, message, data, context);

const warn = (message: string, data?: any, context?: string): void =>
  log(LogLevel.WARN, message, data, context);

const error = (message: string, data?: any, context?: string): void =>
  log(LogLevel.ERROR, message, data, context);

// 에러 객체 로깅을 위한 특수 함수
const logError = (
  error: Error,
  context?: string,
  additionalData?: any
): void => {
  const errorData = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...additionalData,
  };

  log(LogLevel.ERROR, error.message, errorData, context);
};

// 로컬 스토리지에 저장된 에러 로그 가져오기
const getStoredErrorLogs = (): LogMessage[] => {
  try {
    return JSON.parse(localStorage.getItem("zipcheck_error_logs") || "[]");
  } catch (error) {
    console.error("로컬 스토리지 로그 조회 실패:", error);
    return [];
  }
};

// 로컬 스토리지 로그 지우기
const clearStoredErrorLogs = (): void => {
  localStorage.removeItem("zipcheck_error_logs");
};

// 로거 객체 내보내기
const logger = {
  debug,
  info,
  warn,
  error,
  logError,
  getStoredErrorLogs,
  clearStoredErrorLogs,
};

export default logger;
