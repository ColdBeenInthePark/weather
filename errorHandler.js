const ERROR = Object.freeze({
  PERMISSION_DENIED: "PERMISSION_DENIED",
  POSITION_UNAVAILABLE: "POSITION_UNAVAILABLE",
  TIMEOUT: "TIMEOUT",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
})

function getError(errorType) {
  switch (errorType) {
    case ERROR.PERMISSION_DENIED:
      return "위치 권한을 허용해주세요.";
    case ERROR.POSITION_UNAVAILABLE:
      return "위치를 사용할 수 없습니다.";
    case ERROR.TIMEOUT:
      return "위치 요청이 시간 초과되었습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
}