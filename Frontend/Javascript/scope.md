# scope
- 유효범위 *scope*는 이름들이 충돌하는 문제를 덜어주고 자동으로 메모리를 관리하기 때문에 프로그래머에게는 중요한 개념이다.
- 자바스크립트는 블록 유효범위는 없지만 함수 유효범위는 있다.
```javascript
var a = 1;

function foo () {
  var b = 2;

  console.log(b);
  console.log(a);
}

foo();
console.log(b); // 외부함수에서 내부함수로 접근하지 못한다.
```
```javascript
function foo() {
  var a = 10;

  for(var i = 0; i < a; i++) {
    console.log(i);
  }

  console.log(i); // 10
}

foo();
```
