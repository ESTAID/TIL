# this

this.. this란 무엇일까?

**this를 어떻게 사용하는가?** 를 생각하기 전에 **this를 왜 사용하는가?** 부터 생각해보자.

## 왜왜왜? = 재사용성

this를 사용하면 재사용성이 가능하다.

아래의 코드를 보자.

`예제1(identify(), speak())`:
```
    function identify() {
      return this.name.toUpperCase();
    }
    
    function speak() {
      const greeting = `hello I'm ${identify.call(this)}`;
      console.log(greeting);
    }
    
    const me = {
      name: 'geonwoo'
    };
    
    const you = {
      name: 'woo'
    };
    
    identify.call(me);
    identify.call(you);
    
    speak.call(me);
    speak.call(you);
```
this를 안쓰고 명시적인 인자로 콘텍스트(객체)를 넘겨서 사용도 가능하다.

`예제2(객체를 넘겨서 사용함)`:
```
    function identify(obj) {
      return obj.name.toUpperCase();
    }
    
    function speak(obj) {
      const greeting = `hello I'm ${identify(obj)}`;
      console.log(greeting);
    }
    
    identify(me);
    identify(you);
```
하지만

암시적인 객체 레퍼런스를 함께 넘기는 this 체계가 좀 더 API 설계상 깔끔하고 명확하며 재사용하기 쉽다.

사용 패턴이 복잡해질수록 보통 명시적인 인자로 콘텍스트(객체)를 넘기는 방법이 this 콘텍스트를 사용하는 것보다 코드가 더 지저분해진다.

또한,

프로토타입을 배우고 나면 this를 통해 여러 함수가 적절한 콘텍스트 객체를 자동 참조하는 구조를 더욱 편리하게 만들어 준다.

## **어떻게?**

어떻게 사용하기 앞서 this라는 이름 자체에서 오는 혼란이 몇 가지 있다. 그래서 이 부분부터 이해하고 가자.

1. 자기자신
this가 함수 그 자체를 가리킨다는 것은 오해다. this로는 자기 참조를 할 수 없다. 
이를 증명하기 위해 아래 코드를 보자.
`예제3(this의 오해)`:
```
    function foo(num) {
      console.log(`foo: ${num}`);
    
      this.count++;
    }
    
    foo.count = 0;
    
    for (let i = 0; i < 10; i++) {
      if (i > 5) {
        foo(i);
      }
    }
```
`foo`는 몇 번 호출됐을까?

`console.log(foo.count); // 0`

정답은 `0`이다. `this.count++`에서 `this`를 글자 그대로 해석하면 헷갈릴 수 있다.

`foo.count = 0;`을 하면 `foo`라는 함수 객체 안에 `count` 프로퍼티가 추가된다. 하지만 `this.count`는 함수 객체를 바라보는 것이 아니고 `전역 객체(window)`를 바라본다.

많은 개발자들은 `this`참조가 이상하다고 생각하여 우회책을 떠올린다.

- `예제5 (렉시컬 스코프(Lexical Scope))`:
```
    function foo(num) {
      console.log(`foo: ${num}`);
    
      data.count++;
    }
    
    const data = {
      count: 0
    };
    
    for (let i = 0; i < 10; i++) {
      if (i > 5) {
        foo(i);
      }
    }
```
`console.log(data.count) // 4`

`렉시컬 스코프`가 나쁘다는 것은 아니다. 함수가 내부에서 자신을 참조할 때 일반적으로 this만으로는 부족하여 렉시컬 식별자를 거쳐 함수 객체를 참조한다.

이 부분에서 문제는 `익명함수`이다. `익명함수`에서는 함수 자신을 참조할 방법이 마땅치 않다.

`예제6` :
```
    function foo() {
      foo.count = 4;
    }
    
    setTimeout(function () {
      // 익명 함수는 자기 자신을 가리킬 방법이 없다.
    }, 10);
```
- `예제7 (함수 객체를 직접 가르키는 방법)` :
```
    function foo(num) {
      console.log(`foo: ${num}`);
    
      this.count++;
    }
    
    foo.count = 0;
    
    for (let i = 0; i < 10; i++) {
      if (i > 5) {
        foo.call(foo, i);
      }
    }
```
`console.log(data.count) // 4`

1. 자신의 스코프
this가 바로 함수의 스코프를 가리킨다는 말은 흔한 오해이다. 

**this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다는 사실!!!!!**

내부적으로 `스코프`는 별개의 식별자가 달린 프로퍼티로 구성된 객체의 일종이나 `스코프 객체`는 자바스크립트 구현체인 엔진 내부 부품이기 때문에 일반 자바스크립트 코드로는 접근하지 못한다.
실패하는 경우를 보자.

`예제8(this가 암시적으로 함수의 렉시컬 스코프를 가르키는 경우)` :
```
    function foo() {
      const a = 2;
      this.bar();
    }
    
    function bar() {
      console.log(this.a);
    }
    
    foo();
```
`참조 에러: RefferenceError: a is not defined`

`this`의 부정확한 추측은 여기까지하고, 이제 `this`가 어떻게 작동하는지 보자.

***`this`는 작성 시점이 아닌 런타임 시점에서 바인딩 되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다.***

***함수 선언 위치와 상관없이 `this바인딩`은 오로지 어떻게 함수를 호출했느냐에 따라 정해진다.***

`this바인딩`의 개념을 이해하려면 먼저 호출부, 즉 함수 호출 코드부터 확인하고 `this`가 가리키는 것이 무엇인지 찾아봐야한다.

`예제9(호출부와 호출 스택에 대한 설명)` :
```
    function baz() {
      // 호출 스택: 'baz'. 따라서 호출부는 전역 스코프 내부
      console.log('baz');
      bar();
    }
    
    function bar() {
      // 호출 스택: 'baz' -> 'bar'. 따라서 호출부는 'baz' 내부
      console.log('bar');
      foo();
    }
    
    function foo() {
      // 호출 스택: 'baz' -> 'bar' -> 'foo'. 따라서 호출부는 'bar' 내부
      console.log('foo');
    }
    
    baz(); // 'baz'의 호출부
```
`this바인딩`은 오직 호출부와 연관되기 때문에 호출 스택에서 진짜 호출부를 찾아내려면 코드를 주의 깊게 봐야한다.

`this`가 무엇을 바인딩 할지 정하는 4가지 규칙이 있다. 함수가 실행되는 동안 `this`가 무엇을 참조할지를 호출부가 어떻게 결정하는지 알아보자.

1. 기본 바인딩
2. 암시적 바인딩
ㄴ 암시적 소실
3. 명시적 바인딩
ㄴ 하드 바인딩
ㄴ API 호출 콘텍스트
4. new 바인딩

## 기본 바인딩

기본 바인딩은 가장 평범한 함수 호출인 **'단독 함수 실행'**에 관한 규칙이다.

다음 코드를 보자.

`예제10(기본 바인딩)` :
```
    function foo() {
      console.log(this.a);
    }
    
    const a = 2;
    foo();
```
`전역 스코프(window)`에 변수를 선언하면 변수명과 같은 이름의 전역 객체 프로퍼티가 생성된다. 그리고 `foo()` 함수 호출 시 `this.a`는 전역 객체 `a`이다. 하지만 `엄격 모드(use strict)`에서는 전역 객체가 기본 바인딩 대상에서 제외된다.

`예제11(엄격 모드)` :
```
    function foo() {
      'use strict'
      console.log(this.a);
    }
    
    const a = 2;
    foo();
```
`엄격 모드(use strict)`에서는 `this`가 `undefined`되기 때문에 타입 에러가 난다.

## 암시적 바인딩

암시적 바인딩은 호출부에  콘텍스트 객체가 있는지, 즉 객체의 소유/포함 여부를 확인하는 것이다.

아래의 코드를 보자

`예제12(암시적 바인딩)` :
```
    function foo() {
      console.log(this.a);
    }
    
    const obj = {
      a: 'a',
      foo: foo
    };
    
    obj.foo(); // 2
```
`obj.foo();`의 결과 값은 `2`가 나온다. 

이유는

`foo()` 함수를 `obj`에서 프로퍼티로 **참조**하고 있다. `obj` 객체가 `foo` 함수를 정말 **소유**하거나 **포함**한 것이 아니라 **참조**만 하고 있다. 그러나 호출부인 `obj.foo()`는 `obj` 콘텍스트로 `foo()`를 참조하므로 `obj` 객체는 함수 호출 시점에 함수의 레퍼런스를 **소유**하거나 **포함** 한다고도 볼 수 있다.

아래와 같은 코드는 `foo`함수를 참조하지 않기 때문에 에러가 발생한다.

`예제13(에러코드)` :
```
    function foo() {
      console.log(this.a);
    }
    
    const obj = {
      a: 'a'
    };
    
    obj.foo(); // Type Error
```
함수 레퍼런스에 대한 콘텍스트 객체가 존재할 때 암시적 바인딩 규칙에 따라 이 콘텍스트 객체가 함수 호출 시 `this`에 바인딩된다. 

객체 프로퍼티 참조가 `체이닝(Chaining)`된 형태라면 최상위/최하위 수준의 정보만 호출부와 연관된다.

아래의 코드를 보자.

`예제14(체이닝)` :
```
    function foo() {
      console.log(this.a);
    }
    
    const obj2 = {
      a: 42,
      foo: foo
    };
    
    const obj1 = {
      a: 2,
      obj2: obj2
    };
    
    obj1.obj2.foo(); // 42
```

암시적 소실

암시적으로 바인딩된 함수에서 바인딩이 소실되는 경우가 종종 있는데 이 때문에 `this바인딩`이 헷갈릴 경우가 있다.

엄격 모드 여부에 따라 전역 객체나 `undefined` 중 한 가지로 기본 바인딩 된다.

`예제15(암시적 소실)` :
```
    function foo() {
      console.log(this.a);
    }
    
    const obj = {
      a: 2,
      foo: foo
    };
    
    const bar = obj.foo;
    
    const a = '엥? 전역인디?';
    
    bar(); // 엥? 전역인디?
```
bar는 obj의 foo를 참조하는 변수처럼 보이지만 실은 foo를 직접 가리키는 또 다른 참조 변수이다. 게다가 호출부에서 평험하게 `bar()`를 호출하므로 기본 바인딩이 적용된다. 

콜백 함수를 전달하는 경우엔 좀 더 애매하게 실행되어 예상외의 결과가 나온다.

`예제16(콜백)`:
```
    function foo() {
      console.log(this.a);
    }
    
    function doFoo(fn) {
      fn();
    }
    
    const obj = {
      a: 2,
      foo: foo
    };
    
    const a = '엥? 여긴 전역인디?';
    
    doFoo(obj.foo); // 엥? 여긴 전역인디?
```
인자로 전달하는 건 일종의 암시적인 할당이다.

따라서

예제처럼 함수를 인자로 넘기면 암시적으로 레퍼런스가 할당(다시 말해 `fn`은 `foo`의 또 다른 레퍼런스라는 말!)되어 이전 예제와 같은 결과가 나온다. 이 경우는 내장함수(setTimeout, setInterval, ...)등 을 사용해도 마찬가지다.

이처럼 콜백 과정에서 this 바인딩의 행방이 묘연해지는 경우가 많다. 어떤 까닭으로 예기치 않게 this가 바뀌게 됐든 개발자가 콜백 함수의 레퍼런스를 마음대로 통제할 수 없으니 각자의 입맛에 맞게 호출부를 조정할 수도 없다. 이 부분을 해결하기 위해 `this`를 고정해 문제를 해결한다.

## 명시적 바인딩

암시적 바인딩에선 함수 레퍼런스를 객체에 넣기 위해 객체 자신을 변형해야 했고 함수 레퍼런스 프로퍼티를 이용하여 `this`를 간접적으로 바인딩 했었다. 그 과정은 굉장히 복잡하고 귀찮아서 자바스크립트에서 아주 적당한 유틸리티를 제공한다. 

바로 `call()`과 `apply()`이다.

두 메서드는 `this`에 바인딩 할 객체를 첫째 인자로 받아 함수 호출 시 이 객체를 `this`로 세팅한다. `this`에 지정한 객체로 직접 바인딩하기 때문에 `명시적 바인딩`이라한다.

`예제17(명시적 바인딩)`:
```
    function foo() {
      console.log(this.a);
    }
    
    const obj = {
      a: 2
    };
    
    foo.call(obj); // 2
```
`foo.call()`에서 명시적으로 바인딩 하여 함수를 호출하므로 `this`는 반드시 `obj`가 된다.

하지만

아쉽게도 이렇게 명시적 바인딩을 해도 위에서 언급한 `this` 바인딩이 도중에 소실되는 문제는 해결할 수 없다.

이 문제를 해결하기 위해 약간의 꼼수를 소개한다.

`예제18(하드 바인딩)`:
```
    function foo() {
      console.log(this.a);
    }
    
    const obj = {
      a: 2
    };
    
    const bar = function() {
      foo.call(obj);
    };
    
    bar(); // 2
    setTimeout(bar, 100); // 2
    bar.call(window); // 2
```

`bar()` 내부에서 `foo.call(obj)`로 `foo`를 호출하면서 `obj`를 `this`에 강제로 바인딩하도록 하드 코딩한다. 

따라서

`bar`를 어떻게 호출하든 이 함수는 항상 `obj`를 바인딩 하여 `foo`를 실행하게 된다.

이런 바인딩을 `하드 바인딩`이라 한다.

`하드 바인딩`은 인자를 넘기고 반환 값을 돌려받는 창구가 필요할 때 자주 쓰인다.

`예제19(하드 바인딩 예시)` :
```
    function foo(something) {
       console.log(this.a, something);
    }
    
    const obj = {
      a: 2
    };
    
    const bar = function() {
      return foo.apply(obj, arguments);
    };
    
    const b = bar(3); // 2 3
    console.log(b); // 5
```
이렇게 재사용 가능한 헬퍼 함수를 사용하는 것도 같은 패턴이다.

`하드 바인딩`은 매우 자주 쓰는 패턴이라 ES5 내장 유틸리티에 `bind`라는 메서드로 구현되어 있다.

많은 라이브러리 함수와 자바스크립트 내장함수는 `'콘텍스트'`라고 불리는 선택적인 인자를 제공한다. 이는 `bind()`를 써서 콜백 함수의 `this`를 지정할 수 없는 경우를 대비한 일종의 예비책이다.

예를 들어, 다음과 같은 함수는 편의상 내부적으로 `call()`이나 `apply()`로 명시적 바인딩을 대신해준다.

`예제20(API 호출 컨텍스트)`:
```
    function foo(el) {
    console.log(el, this,id);
    }
    
    const obj = {
      id: 'nice guy'
    };
    
    [1,2,3].forEach(foo, obj);
```
`foo()` 호출 시 `obj`를 `this`로 사용한다. 그래서 결과 값은

`1 nice guy 2 nice guy 3 nice guy`

## new 바인딩

자바스크립트에서 new는 전통적인 클래스 지향 언어의 기능과 아무 상관이 없다.

먼저 자바스크립트에서 **'생성자'**의 정의를 내려보자. 자바스크립트 생성자는 앞에 `new` 연산자가 있을 때 호출되는 일반 함수에 불과하다. 단지 `new`를 사용하고 호출할 때 자동으로 붙들려 실행되는 그저 평범한 함수이다.

함수 앞에 new를 붙여 생성자를 호출하면 다음과 같은 일들이 일어난다.

1. 새로운 객체 생성
2. 새로운 객체의 `[[Prototype]]`이 연결됌
3. 새로 생성된 객체는 해당 함수 호출 시 `this`로 바인딩
4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 `new`와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환

아래 코드를 보자.

`예제21(new 바인딩)`:
```
    function foo(a) {
      this.a = a;
    }
    
    const bar = new foo(2);
    
    console.log(bar.a); // 2
    
```

앞에 `new`를 붙여 `foo()`를 호출했고 새로 생성된 객체는 `foo` 호출 시 `this`에 바인딩 된다.

따라서

결국 `new`는 함수 호출 시 `this`를 새 객체와 바인딩 하는 방법이다.

## 번외(Arrow Function)

일반적인 함수는 4가지 규칙을 준수한다.

그러나 ES6부터는 이 규칙들을 따르지 않는 특별한 함수가 있다. 바로 `화살표 함수(Arrow Function)`이다.이 함수는 `에두른 스코프(Enclosing Scope)`를 보고 `this`를 알아서 바인딩한다.

다음은 화살표 함수의 렉시컬 스코프를 나타낸 예제이다.

`예제22(Arrow Function)`:
```
    function foo() {
      return (a) => {
        console.log(this.a);
      };
    }
    
    const obj1 = {
      a: 2
    };
    
    const obj2 = {
      a: 3
    };
    
    const bar = foo.call(obj1);
    bar.call(obj2); // 2
        
```

`foo()` 내부에서 생성된 화살표 함수는 `foo()` 호출 당시 `this`를 무조건 어휘적(?)으로 포착하기 때문에 절대로 오버라이드할 수 없다. 대표적으로 이벤트 처리기나 타이머 등의 콜백에 널리 쓰인다.

*화살표 함수는 this를 확실히 보장하는 수단으로 bind()를 대체할 수 있고 겉보기에도 끌리는 구석이 있지만, 결과적으로 더 잘 알려진 렉시컬 스코프를 쓰겠다고 기존의 this 체계를 포기하는 형국이란 점을 간과하면 안된다.*

화살표 함수든 어휘적(?) `this`든 꼭 다음 두 가지 중 하나만 선택하자

1. 오직 렉시컬 스코프만 사용하고 가식적인 `this` 스타일의 코드는 쓰지 않는다.
2. 필요하면 `bind()`까지 포함하여 완전한 `this` 스타일의 코드를 구사하되 `self=this;`나 화살표 함수 같은 소위 **'어휘적(?) this'** 꼼수는 삼가한다.
3. 하나의 스타일을 고수한다.