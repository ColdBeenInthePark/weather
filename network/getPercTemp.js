 /**
   * 여름철 체감온도 (5월 ~ 9월)
   *
   * @param {number} ta 기온
   * @param {number} rh 상대습도
   * @return {number} 체감온도
   */
  function getInSummer(ta, rh) {
    const tw = getTw(ta, rh);
    return -0.2442 + (0.55399 * tw) + (0.45535 * ta) - (0.0022 * Math.pow(tw, 2.0)) + (0.00278 * tw * ta) + 3.0;
  }

  /**
   * 겨울철 체감온도 (10월 ~ 익년 4월)
   *
   * @param {number} ta 기온
   * @param {number} v 10분 평균 풍속
   * @return {number} 체감온도
   */
  function getInWinter(ta, v) {
    return 13.12 + (0.6215 * ta) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * Math.pow(v, 0.16) * ta);
  }

  /**
   * 지금이 몇월인지에 따라 여름 및 겨울 계산공식 적용
   *
   * @param {number} ta 기온
   * @param {number} rh 상대습도
   * @param {number} v 10분 평균 풍속
   * @return {number} 체감온도
   */
  function getSensibleTemp(ta, rh, v) {
    const season = getCurrentSeason();
    return (season >= 5 && season <= 9) ? getInSummer(parseInt(ta), parseInt(rh)).toFixed(1) : getInWinter(parseInt(ta), parseInt(v)).toFixed(1)
  }

  /**
   * 습구온도 계산공식
   *
   * @param {number} ta 온도
   * @param {number} rh 상대습도
   * @return {number} 습구온도
   */
  function getTw(ta, rh) {
    return ta * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) +
      Math.atan(ta + rh) - Math.atan(rh - 1.67633) +
      (0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh)) - 4.686035;
  }

  /**
   * 현재 월수 출력
   * @return {number} 현재 월 (1 ~ 12)
   */
  function getCurrentSeason() {
    return new Date().getMonth() + 1;
  }

  export {getSensibleTemp}

