# 디자인 패턴
- 패턴이란
  1. Proven(증명이 되있는)
    - 경험과 통찰력 반영, 이미 검증된 것
  2. Reusable(재사용성)
    - Out of the obx solution 일정한 틀이 짜여있고 도입만 하면된다.
  3. Expressive(표현적인)
    - 어떠한 패턴을 보았을떄 일반적으로 정해진 구조가 있고, 관련된 용어가 있다.
    - 패턴은 솔루션은아니다. 단지 정형화된 틀, 정답에 대한 Blueprint같은것이다.

## Module 패턴
1. Modules
  - 각각의 독립적인 유닛들 ex) 모듈형주택 , 레고? 만드는 방식엔 수십 수백가지가 있다.
```javascript
var module = {
  prop: 'aa',
  someMethod: function() {
    console.log('a');
  }
};
```

2. Privacy Concerns
  - 자바스크립트는 일반적으로 브라우저에서 사용자에게 직접 노출되기 때문에 기본적으로 보안에 취약하다.
  - 가장 간단하게 생각한 방법은 IIFE

```javascript
var bankAccount = (function() {
	var balance = 0;
	return {
		deposit: amount => {
		  balance += amount;
		},
		withdraw: amount => {
		  balance -= amount;
		}
	}
})(); // 화살표 함수 인자가 하나일때는 괄호 생략가능
```
## Revealing Module 패턴
- 모듈 패턴의 업그레이드 버젼이다.
- 이 패턴의 목적은 캡슐화를 유지하고 객체에서 반환된 특정 변수와 메서드들을 잘 나타내기 위한 것이다.
```javascript
var Exposer = (function() {
  var privateVariable = 10;

  var privateMethod = function() {
    console.log('Inside a private method!');
    privateVariable++;
  }

  var methodToExpose = function() {
    console.log('This is a method I want to expose!');
  }

  var otherMethodIWantToExpose = function() {
    privateMethod();
  }

  return {
      first: methodToExpose,
      second: otherMethodIWantToExpose
  };
})();

Exposer.first(); // Output: This is a method I want to expose!
Exposer.second(); // Output: Inside a private method!
Exposer.methodToExpose; // undefined
```
## Prototype 패턴
- 객체를 복제하려면 생성자가 있어야 첫 번째 객체를 인스턴스화 할 수 있다.
- 그런 다음 prototype 키워드를 이용하여 변수와 메소드를 객체의 구조체에 바인딩한다.
```javascript
var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype.go = function() {
  // Rotate wheels
}

TeslaModelS.prototype.stop = function() {
  // Apply brake pads
}
```
- 아래와 같이 사용해도 무방하다.
```javascript
var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype = {
  go: function() {
    // Rotate wheels
  },
  stop: function() {
    // Apply brake pads
  }
}
```
## Revealing Prototype 패턴
- prototype패턴의 업그레이드 버젼이다. 좀 더 private한 패턴을 만들 수 있다.
```javascript
var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype = function() {

  var go = function() {
    // Rotate wheels
  };

  var stop = function() {
    // Apply brake pads
  };

  return {
    pressBrakePedal: stop,
    pressGasPedal: go
  }

}();
```
## Singleton 패턴
- 단일 인스턴스 생성만 허용하지만 동일한 객체의 여러 인스턴스를 허용한다.
- Singleton 패턴은 클라이언트가 여러 객체를 생성하지 못하도록 제한하고, 첫 번째 객체가 생성된 이후에는 첫 번째 객체를 반환한다.
- 예를 들어 무용 프린터를 사용할 경우, 사무실에 10명의 사람이 있고, 그들은 하나의 프린터를 사용한다면, 10개의 컴퓨터가 하나의 프린터를 공유함으로써 동일한 자원을 공유할 수 있다.
```javascript
var printer = (function () {

  var printerInstance;

  function create () {

    function print() {
      // underlying printer mechanics
    }

    function turnOn() {
      // warm up
      // check for paper
    }

    return {
      // public + private states and behaviors
      print: print,
      turnOn: turnOn
    };
  }

  return {
    getInstance: function() {
      if(!printerInstance) {
        printerInstance = create();
      }
      return printerInstance;
    }
  };

  function Singleton () {
    if(!printerInstance) {
      printerInstance = intialize();
    }
  };

})();
```