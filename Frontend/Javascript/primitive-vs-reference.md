# 원시값 vs 참조값

## 원시값의 6가지 타입들

1. Number
2. String
3. Boolean
4. null
5. undefined
6. Symbol

- 원시값 *primitive* 는 불변이다. 숫자 5는 항상 5고 문자열 "alpha"도 항상 문자열 "alpha"다. 다만 불변성이라는 말이 변수의 값이 바뀔 수 없다는 뜻은 아니다. 예제는 아래와 같다.
```javascript
var num = 20;
var count = 20;
num === count // true
num = 19;
num === count // false
```
- 변수 num은 먼저 불변인 값 20으로 초기화됐고, 다시 새로운 불변값 19를 할당 받았다. 중요한 것은 20과 19는 서로 다른 숫자라는 것이다. 바뀐 것은 num이 저장하는 값뿐이다.

## null과 undefined
- null과 undefined는 자바스크립트의 특별한 타입이다. null이 가질 수 있는 값은 null 하나뿐이며, undefined가 가질 수 있는 값도 undefined 하나 뿐입니다.
- 일반적인 규칙을 제시한다면, null은 프로그래머에게 허용된 데이터 타입이며 undefined는 자바스크립트 자체에서 사용한다고 기억하자.
```javascript
var x; // var x = undefined
var y = null; // 아직 모르는 값을 의미
x = 20; // x에 값을 할당
x = undefined; // 이런 패턴은 자바스크립트에서 권장하지 않습니다.
```
## 참조값

- 자바스크립트에서 단순한 데이터 타입은 Number, String, Boolean, null, undefined가 있다. 이들은 제외한 다른 값들은 모두 객체이다.
- 참조값 *reference type* 은 변수를 할당할 때 자바스크립트 엔진은 값이 원시 값인지 기준 값인지를 결정해야 한다.
- 변수가 원시 값을 저장하는 경우 해당 값을 조작하면 해당 변수에 저장된 실제 값으로 처리된다. 원시 값을 저장하는 변수의 값으로 액세스(primitive value is accessed by value.) 한다.

```javascript
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
list1 === list2; // false -> 객체에 대한 참조값만 들어있기 때문에 저장되어 있는 위치가 다르다.

var list3 = [1, 2, 3];
var list4 = list3;
list3 === list4; // true

var obj1 = { num : 1 };
var obj2 = obj1;
obj1.num++;
console.log(obj2); // num : 2

var c1 = {age : 3};
var c2 = {age : 5};
var mother = {
  age : 55,
	children: [c1, c2];
};
c1.age++;
c2.age++;
console.log(mother.children); // [4, 6]
```
