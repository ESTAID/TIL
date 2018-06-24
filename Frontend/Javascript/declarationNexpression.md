# 함수 선언
- 함수 선언 *function declaration*은 미리 자바스크립트 실행 컨텍스트에 로딩 되어 있으므로, 언제든지 호출 가능한 것을 말한다.
```js
foo(); // hello
function foo() {
  console.log('hello');
}
```

# 함수 표현
- 함수 표현 *function expression*은 인터프리터가 실행라인에 도달하였을때 실행된다.
- 조건에 따라 할당하거나, 괄호 연산자로 그룹핑하여 표현식으로 나타낼 수 있다.
```js
foo(); // 'foo' is not defined.
var foo = function () {
  console.log('hello');
}

foo(); // 'foo' is not defined.
(function () {
  console.log('hello');
});
```

# IFFE
- 즉시 실행 함수 표현 *Immediately Invoked Function Expression*은 정의되자마자 즉시 실행되는 함수를 말한다.
```js
(function () {})();
```
- 첫번째 괄호()로 둘러싸인 함수는 익명함수이다. 이는 전역 범위를 오염시키는 것을 예방할 뿐만 아니라, IIFE 내부의 변수에 접근하는 것을 방지한다.
- 두번째 괄호()는 실행하는 괄호이다.

## IIFE는 어떻게 작동할까?
- 첫번째 괄호쌍이 익명함수를 감싸고 있어서 함수 선언을 함수 표현식으로 대체할 수 있다. 그러므로, 단순한 익명의 함수를 global 스코프에 선언하지 않고 어디서든 익명의 함수 표현식을 가질 수 있다.
```js
(function () {
    var name = "ggun";
})();
// IIFE 내부에서 정의된 변수는 외부 범위에서 접근이 불가능하다.
name // throws "Uncaught ReferenceError: name is not defined"
```
```js
var result = (function () {
    var name = "ggun";
    return name;
})();
// 즉시 결과를 생성한다.
result; // "ggun"
```

## IIFE는 언제 사용 할까?

*전역 스코프를 오염시키지 않기 위해 사용한다*

- IIFE를 사용하는 주된 이유는 변수를 전역으로 선언하는 것을 피하기 위해서이다.
- 아래 예제와 같이 클로져 사용시 IIFE 기법을 사용해 참조에 의한 클로저의 오작동을 해결할 수 있다.
```js
var bank = (function () {
  var account = 0;
  return {
    moneyUp: function () {account= account+1000;},
    showMe: function () { console.log(account)}
  };
})();

bank.moneyUp();
bank.showMe(); // 1000
```