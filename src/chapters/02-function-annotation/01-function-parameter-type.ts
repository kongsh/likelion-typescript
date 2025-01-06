// ---------------------------------------------------------------------------------
// 📌 함수 매개변수 타입(Function Parameter Type)
// ⭐️ URL : https://bit.ly/3UVCUur
// ---------------------------------------------------------------------------------
// - 함수 매개변수 타입을 지정할 수 있습니다.
// - TypeScript는 매개변수 타입 에너테이션을 통해 값의 유형을 이해하고 검사를 수행합니다.
// - 함수의 매개변수에 타입을 지정하는 방법은 변수의 타입을 지정하는 것과 동일합니다.
// ---------------------------------------------------------------------------------

{
  /**
   * 난수를 반환하는 함수
   * ECMAScript(JavaScript) vs. TypeScript
   * @param n number
   */
  function getRandom(n: string | number) {
    if (typeof n !== "number") {
      throw new TypeError(`n 매개변수 타입은 number여야 합니다. (전달 값 타입 ${typeof n})`);
    }
    return Math.floor(Math.random() * n);
  }

  getRandom(101);
  // getRandom("101");
  // getRandom("one zero one");

  /**
   * 최솟값, 최댓값 사이의 난수를 반환하는 함수
   * @param min number
   * @param max number
   */
  function getRandomMinMax(min: number, max: number) {
    // min();
    // max.toLowerCase();
    return getRandom(max - min) + min;
  }

  getRandomMinMax(10_000, 100_000);
}

// ---------------------------------------------------------------------------------

{
  // 함수 매개변수 에너테이션이 설정된 경우
  const sendGreeting = (toName: string, fromName: string, isMorning: boolean, currentYear: number) => {
    let thisTime = isMorning ? "오전" : "오후";
    return `안녕 ${toName}! 좋은 ${thisTime}이 되길 바라. 행복한 ${currentYear} 한 해가 되길! - 당신의 ${fromName}`;
  };

  // 함수 매개변수 영역을 폴딩(folding)한 후, 함수 실행 구문을 작성해봅니다.
  console.log(sendGreeting("se", "he", true, new Date().getFullYear()));
}
