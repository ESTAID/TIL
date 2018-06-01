# this
- this는 문멕에 따라 혹은 해당 함수를 어떻게 선언하느냐가 아니라 어떻게 호출하느냐에 따라 의미가 바뀐다.
- 함수를 실행하는 방법(실행하는 방법에 따라 this값 바뀜)
  - 일반 함수 실행방식(Regular function call)
  - 'use strict'(in strict mode)
  - Dot Notation 방식

- Regular function call
```javascript
var name = "geonwoo";
function foo () {
console.log(this.name);
}

foo(); // geonwoo -> this는 Global Ojbect. 브라우저 상에서는 window
```

- use strict
```javascript
'use strict';

function foo () {
console.log(this); // this는 undefined, window가 필요한경우는 window.property
}

foo();
```
- Dot Notation
```javascript
var age = 100;
var geonwoo = {
age: 35,
foo: function () {
  console.log(this.age); // this 호출 시점은 38번 라인에 geonwoo이기때문에 this는 geonwoo
  }
};

geonwoo.foo();
```