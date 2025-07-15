// Date 객체를 한국어 형식으로 변환하는 함수
export const formatDateTime = (date: Date) => {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// GPS 날짜와 시간을 합치는 함수
export const combineGPSDateTime = (dateStamp: string, timeStamp: string): Date | null => {
  try {
    // GPSDateStamp: "2025:01:16", GPSTimeStamp: "14:16:30"
    const [year, month, day] = dateStamp.split(':');
    const [hour, minute, second] = timeStamp.split(':');
    
    return new Date(
      parseInt(year),
      parseInt(month) - 1, // 월은 0부터 시작
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
  } catch (error) {
    console.log('GPS 날짜/시간 파싱 오류:', error);
    return null;
  }
};