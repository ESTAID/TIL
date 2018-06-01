# closure
- 클로져 *closure* 는 함수가 생성될 때 본인 주변에 있는 것들, 다시말해 스코프안에 있는 것들을 기억할 수 있다.
- 내부 함수가 외부 함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것을 이해해야 한다.
- 클로져를 잘못사용하는 경우 메모리 오남용이 올 수 있다.
### 예제1
```javascript
fucntion foo () {
  var a = 2;
  function bar () {
    console.log(a);
  }
  bar();
}

foo();
```
### 예제2
```javascript
function say(){
  var a = 2;

  function log() {
    console.log(a);
  }

  return log;
}

var a =  say();
a(); // 2
```

### 예제3
``` javascript
function doSomething () {
  var a = 1;

  function something () {
    console.log(a);
  }

  foo(something);
}

function foo (fn) {
  fn();
}

doSomething(); // ?
```
- 클로져를 이용하여 프라이빗 메소드를 흉내내는 것이 가능하다. 이러한 방식을 <b>모듈패턴</b>이라고 한다.
```javascript
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```
