# Arguments

- 인수배열 *arguments* 는 함수를 호출할 때 전달된 모든 인자에 접근할 수 있게 한다. 여기에는 매개변수 개수보다 더 많이 전달된 인자들도 모두 포함한다.
- 인수배열을 통해 매개변수는 매개변수의 개수를 정확히 정해놓지 않고, 넘어오는 인자의 개수에 맞춰서 동작하는 함수를 만들 수 있다.
- 반환값은 유사배열형태로 반환한다.
```javascript
function log () {
  console.log(arguments);
}

log(1, 2, 3); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

function say (a, b, c) {
  console.log(arguments);
}

say(1);
say(1, 2);
say(1, 2, 3);
say(1, 2, 3, 4); // 접근 가능
say(1, 2, 3, 4, 5); // 접근 가능
```

````javascript
function speak () {
  var a = Array.isArray(arguments);
  console.log(a); // false , 인수배열에는 배열 메소드 없다(push, pop, ...)
}

function speak () {
  var a = arguments.length; //유사배열이라 인덱스값으로 데이터 접근가능하다 ex) arguments[i]. 또한 Length 메소드도 사용할 수 있다.
  console.log(a); // 5
}

speak(1, 2, 3, 4, 5);

````
