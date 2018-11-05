# Prototype

### *Object are built by constructor calls*

- 여기서 컨트스럭터 호출이란 다음과 같다
```js
function Foo() {};
var a1 = new Foo();
```
- 컨스트럭터 호출이란 new 생성자가 앞에 있는 함수를 말한다.

### *A constructor makes an object ~~based on~~ its own prototype*

- **자바스크립트에는 상속이 없다!!**
- 만약 자바스크립트에 상속을 나의 자식과 비교한다면 자식은 나의 DNA를 통해 서로 연결된 아이다. 복사를 하거나 상속받지않는다.
- 예를 들어, 내가 다리가 뿌러진다고해서 내 자식의 다리도 같이 뿌러지진 않는다고 생각하면 좀 더 쉽다.
- 이걸 *retroactive inheritance* 라고한다.

### *A constructor makes an object linked to its own prototype*

- 이러한 부분들은 일반적인 C++이나 자바에서의 상속과는 다른 개념이다.
- 자바스크립트에서는 상속이 아니라 서로 연결되어 있다고 볼 수 있다.
- 예제는 다음과 같다.

```js
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return "I am " + this.me;
}

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function () {
  alert("hello, " + this.identify());
};

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto___ === Foo.prototype;
a1.__proto__ === a2.__proto__;
```
- 위와 같은 예제를 쉽게 그림으로 설명하면

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/prototype1.png" width="550" height="350" align="center" /></p>

- 항상 생성한 객체의 상단에는 Object가 있다.
- 직접적으로 접근을 하기 위해서는 던더프로토(_ _ proto _ _) or Object.getPrototypeOf(variable)를 사용하면 된다.

```js
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return "I am " + this.me;
}

var a1 = new Foo('a1');
a1.identify(); // I am a1

a1.identify = function () { // shadowing
  alert("Hello, " + this.identify());
};

a1.identify(); // Error : infinite recursion
```
- 두번째 ```a1.identify();```가 에러나는 이유는 this값이 본인(a1)이기 때문에 무한 재귀에 빠지게 된다.
- 이를 해결하기위해선
```js
...

a1.identify = function () { // shadowing
  alert("Hello, " + this.__proto__.identify());
};

a1.identify(); // alert: "Hello a1"
```
- 던더프로토를 이용하면 해결할 수 있다.(a1 -> Foo)
- 하지만 이것도 문제가 있다.
- 몇 개의 객체는 던더프로토를 이용하면 되지만, 연결된 객체의 개수가 늘어나면 아래와 같은 상황이 발생한다.
```js
...

x.identify = function () { // shadowing
  alert("Hello, " + this.__proto__.__proto__.__proto__ ... .identify());
};
```
- 가독성이 굉장히 떨어진다. 그래서 자바스크립트에는 call이라는 메서드가 있다.
```js
...

a1.identify = function () { // shadowing
  alert("Hello, " + Foo.prototype.identify.call(this));
};

a1.identify(); // alert: "Hello a1"
```
- call 메서드를 이용하면 binding rule로 인해 프로토타입 체이닝이 가능하다.
- 이는 자바스크립트에 굉장한 장점이다.
- 이를 학문적으로는 explicit pseudopolymorphism라고 한다.

### *프로토타입 함수 정의와 객체안에 함수 정의의 차이*

- 위 둘의 차이는 메모리 할당량이다.
- 프로토타입으로 함수를 선언하면 메모리 할당량을 줄일 수 있다.
- 그림으로 설명하면 아래와 같다.

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/prototype2.png" width="550" height="350" align="center" /></p>

- 객체를 생성할때마다 함수를 정의하면 그 공간 계속 차지하고 있어야하지만, 프로토타입에 선언해서 공유하면 메모리 할당량을 줄일 수 있다.