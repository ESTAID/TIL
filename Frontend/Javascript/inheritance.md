# 상속
- 상속 *inheritance*에 대한 예제는 다음과 같다.
- 사실 자바스크립트에는 상속이라는 개념은 없다. 상속보단 프로토타입 체인을 통해 상속한 것 처럼 흉내를 낸다.
- es6에서 class 메서드도 상속처럼 보이지만 내부적으로 살펴보면 프로토타입 체인으로 이루어져 있다.

### 1-1. 객체 정의
```js
var human = {
  sayName: function () {
    console.log(this.name);
  }
};
```
### 1-2. 객체 상속
```js
var musician = Object.create(human);
musician.getPlayInstrument = function () {
  console.log(`play... ${this.instrument}`);
};
```
### 1-3. 객체 재사용
```js
var kanye = Object.create(musician);
kanye.name = 'kanye west';
kanye.instrument = 'drum';
kanye.sayName();
kanye.getPlayInstrument();
```

### 1-4. 좀 더 깔끔한 방법
```js
var human = {
  create: function (values) {
    var instance = Object.create(this);
    Object.keys(values).forEach(function (key) {
      instance[key] = values[key];
    })
    return instance;
  },
  sayName: function () {
    console.log(this.name);
  }
};

var musician = human.create({
  getPlayInstrument: function () {
    console.log(`play... ${this.instrument}`);
  }
});

var kanye = musician.create({
  name: 'kanye west',
  instrument: 'drum'
});

kanye.sayName();
kanye.getPlayInstrument();
```
### 2-1. 생성자 함수(new) 이용
```js
function Car(owner) {
  this.owner = owner;
}

Car.prototype.soldTo = function(newOwner) {
  this.owner = newOwner;
};

var c1 = new Car('wook ga');
c1.soldTo('geon');
```
### 2-2. 일반 상속
```javascript
function Car(owner) {
  this.owner = owner;
}

Car.prototype.soldTo = function(newOwner) {
  this.owner = newOwner;
};

function ElectricCar(owner) {
  // 이 부분이 상속
  Car.call(this, owner);

	this.power = 0;
}
//prototype 상속. 즉 prototype chain이다.
ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;
```
- constructor를 재할당을 안해줘도 코드에 에러는 없지만 방대한 협업을 할때는 문제가 되기도 한다.

### 2-3. 1개 이상 상속

```javascript
function VW(owner) {
  Car.call(this, owner);

	this.condition = 'so so';
}

VW.prototype = Ojbect.create(Car.prototype);
VW.prototype.constructor = VW;

VW.prototype.manipulate = function() {
  this.condition = 'good';
};
```