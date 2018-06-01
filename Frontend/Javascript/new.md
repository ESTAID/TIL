# new 연산자
- new 연산자는 사용자 정의 객체 타입 또는 내장 객체 타입의 인스턴스를 생성한다.
- 사용자 정의 객체 생성의 조건
  1. 함수를 작성하여 객체 타입을 정의한다.
  2. new 연산자로 객체 인스턴스를 생성한다.
- new로 함수를 실행하면 this의 값은 빈객체이다.
```javascript
function Person () {
  console.log(this); // {}
}

new Person();
```
- 생성자 함수에 의해 리턴된 객체는 전체 new호출 결과가 된다.
```javascript
function Person () {
  this.name = 'ggun';
  console.log(this); // {name: 'ggun'}
}

var ggun = new Person();
```
- 인자값을 가진 생성자 함수는 다음과 같다.
- 생성자 용도로 만든함수는 대부분이 첫글자가 대문자로 시작한다.
```javascript
function Car(make) {
  this.make = make;
}

var myCar = new Car('Nissan'); // {make: 'Nissan'}
```

- Number랑 String은 new로 만들면 type이 무조건 object로 이상하게 생성이 된다.
```javascript
var s1 = new String('hello');
var s2 = 'hello';
console.log(s1 === s2); // false

var n1 = new Number('1');
var n2 = 1;
console.log(n1 === n2) // false
```
