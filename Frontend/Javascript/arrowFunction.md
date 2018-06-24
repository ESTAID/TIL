# 화살표 함수
- 화살표 함수 *arrow function*의 this는 일반 함수와 다르다.
- 일반 함수는 모든 새로운 함수가 호출될 당시의 <b>*this값을 정의한다.*</b>
- 일반 함수는 this 바인딩을 아래와 같이 한다.
```js
function Foo() {
  this.count = 0; // this => Foo

  setInterval(function countUp() {
    this.count++; //this => window
  }, 1000);
}

var p = new Foo(); // 0
```
- setInterval 호출될 당시의 this값의 값과 Foo함수 안의 this값은 다르다.
- es5에서는 이러한 문제를 해결하기 위해 this값을 복사하여 사용했었다.
```js
function Foo() {
  var that = this;
  that.count = 0;

  setInterval(function countUp() {
    that.count++;
  }, 1000);
}

var p = new Foo(); // 0 1 2 ...
```
- 화살표 함수는 전역 컨텍스트에서 호출이 되도 <b>*this 값을 새로 정의 하지 않는다.*</b>
- 바깥 코드를 기억하고 있고 그 값을 this값으로 사용한다. 이는 클로져의 개념과 같다.
- 위 Foo함수를 화살표 함수를 사용하여 재정의하면 아래와 같다.
```js
function Foo(){
  this.count = 0;

  setInterval(() => {
    this.count++; // this => Foo
  }, 1000);
}

var p = new Foo();
```
- 화살표 함수를 메소드로 사용될 경우 아래와 같이 에러가 발생한다.
```js
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); // prints undefined, Window
obj.c(); // prints 10, Object {...}
```
- 화살표 함수는 자신의 this가 없다. 때문에 .bind함수를 호출할 수 없다.
- 또한 화살표 함수로 new를 이용한 객체 상속이 불가능하다.
```js
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```
