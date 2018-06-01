# call
- call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 값으로 지정할 수 있다.
```javascript
var ggun = {
  age: 28
};

var wook = {
  age: 26
};

function greet () {
  return `My age is ${this.age}`;
}

greet(); // 'My age is undefined'
greet.call(ggun); // 'My age is 28'
greet.call(wook); // 'My age is 26'
```

- call의 첫번째 인자는 this값, 그 뒤 2번째 부터 N번째까지는 매개변수이다.

```javascript
var age = 100;

function foo () {
  console.log(this.age);
  console.log(arguments);
}

var ggun = {
  age: 28
};

foo.call(ggun, 1, 2, 3, 4, 5);
// 28
// Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

- 객체의 생성자 연결에도 call을 사용할 수 있다.
```javascript
function Dog (name, age) {
  this.name = name;
  this.age = age;
}

function French(name, age) {
  Dog.call(this, name, age);
  this.sex = 'man';
}

function Pome(name, age) {
  Dog.call(this, name, age);
  this.sex = 'woman';
}

var thor = new French('thor', 3);
var kong = new Pome('kong', 10);
```

# apply
- apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 일치한다.
- apply는 매개변수를 배열로 받는다.
```javascript
var age = 100;

function foo () {
  console.log(this.age);
  console.log(arguments);
}

var ggun = {
  age: 28
};

foo.call(ggun, [1, 2, 3, 4, 5]);
// 28
// Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

# bind
- bind의 리턴값은 <b>함수</b>라는것을 기억하자.
```javascript
var age = 100;

function foo () {
  console.log(this.age);
}

var ggun = {
  age: 28
};

var bar = foo.bind(ggun);

bar(); // 28
```
- bind를 사용하면 함수의 this값을 영구적으로 바꿀 수 있다. 