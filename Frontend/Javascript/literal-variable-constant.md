# 리터럴과 변수, 상수, 데이터 타입

## 변수와 상수
- 변수 *variable* 란 간단히 말해 이름이 붙은 값으로, 언제든 값이 바뀔 수 있다. 예를 들어 날씨에 관한 프로그램을 만든다면 currentTempC라는 변수를 사용할 수 있다.
- 변수를 선언하고 할당하는 방법은 다음과 같다.
```javascript
let currentTempC = 22; // 변수를 선언하고 초깃값을 할당할 수 있다.
currentTempC = 22; // let은 변수 선언에만 쓰이고, 한 번만 선언할 수 있다.
let currentTempC; // let currentTempC = undefined;와 같다.
let targetTempC, room1 = "conference_room_a", room2 = "lobby"; // let 문 하나에서 변수 여러 개를 선언할 수 있다.
```

- 상수 *constant* 란 변수와 마찬가지로 값을 할당받을 수 있지만, 한 번 할당한 값을 바꿀 수는 없습니다.
```javascript
const ROOM_TEMP_C = 21.5, MAX_TEMP_C = 30;
```
- 절대적인 규칙은 아니지만, 상수 이름에는 보통 대문자와 밑줄만 사용한다. 이런 규칙을 따르면 코드에서 상수를 찾기 쉽고, 상수의 값을 바꾸려 하지도 않게 된다.

## 리터럴
- 리터럴이란 값을 프로그램 안에서 직접 지정한다는 의미를 가지고 있다. 그리고 리터럴은 값을 만드는 방법이다. 자바스크립트는 프로그래머가 제공한 리터럴값을 받아 데이터를 만든다.
- 예를 들어, 위에서 currentTempC에 값을 할당할 때 사용한 22와 21.5는 숫자형 리터럴이고, room1을 초기화 할 때 사용한 "conference_room_a"는 문자열 리터럴이다.
