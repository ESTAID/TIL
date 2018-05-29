# hoisting
- hoist의 사전적 의미는 '올리다, 끌어올리다'라는 뜻이다.
- 자바스크립트에서 호이스팅 *hoisting* 은 실행 콘텍스트(특히 생성 및 실행 단계)가 어떻게 동작하는가에 대한 일반적인 생각으로 여겨진다.
```javascript
function catName(name) {
  console.log("My cat's name is " + name);
}

catName("Tigger"); // My cat's name is Tigger
```

```javascript
catName("Chloe");

function catName(name) {
  console.log("My cat's name is " + name); // My cat's name is Chloe
}
```
- 자바스크립트는 초기화가 아닌 선언만 것만 끌어올린다. 만약 변수를 선언한 뒤 나중에 초기화 시켜 사용한다면, 그 값은 undefined로 지정된다. 예제는 아래와 같다.
```javascript
var x = 1; // x 선언 후 할당
console.log(x + " " + y); // 1 undefined
var y = 2;


var x = 1; // x 선언 후 할당
var y; // var y = undefined; 와 같다.
console.log(x + " " + y); // 1 undefined
y = 2; // y 할당
```
```javascript
var b = 1;

bar();

function bar () {
  //var b; <-- 실제 구동 자리
  b = 2;
  console.log(b); // 2
  var b; // 이 변수가 호이스팅되서 올라간다. 따라서 밖에 b랑은 관련없다.
}

console.log(b); // 1 내부 스코프에 있는 값은 못쓴다.
```

## 함수 선언식
- 함수 선언 *declaration*은 지정된 매개변수로 함수를 정의합니다.
```javascript
hoisted(); // logs "foo"

function hoisted() {
  console.log('foo');
}

hoisted(); // logs "foo"
```

## 함수 표현식
- 함수 표현 *expression*으로 함수를 정의할 수 있습니다.
```javascript
// var notHoisted --> undefined
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
   console.log('bar');
};

notHoisted();
```