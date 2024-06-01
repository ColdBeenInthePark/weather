

function getDate() {
  const result = { date: "",  dayOfWeek: "", hour : "", }
  const localDateTime = new Date();
  const dayOfWeek = localDateTime.getDay();
  const hour = localDateTime.getHours()

  const daysOfWeekInKorean = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  result.date = localDateTime.toLocaleDateString('ko-KR', options);
  result.dayOfWeek = daysOfWeekInKorean[dayOfWeek];
  result.hour = hour + "00"

  return result
}

export default getDate