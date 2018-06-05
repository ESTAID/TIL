# Object Oriented Programming(OOP)
- 객체 지향 프로그래밍 *Object Oriented Programming*는 컴퓨터 과학에서 전통적인 패러다임이다.
- OOP는 우리가 사물을 이해하는 자연스러운 방식을 반영하도록 설계되었다.
- 만약 전등이 객체라면 그 데이터는 밝기가 있을 것이다. 그리고 그 기능으로는 전원ON, 전원OFF, 등이 있을 것이다.
- 또한, OOP는 사물에 관해 추상적으로(어떤 전등), 구체적으로(특정 전등 브랜드), 내부 정보 보호(밝기 정보)를 생각할 수 있게 한다.
```javascript
var lamp = {
  brightness: 0,
    turnOn: fucntion() {
      this.brightness= 100;
    },
    turnOff: function() {
    this.brightness = 0;
    }
};

lamp.turnOn();
lamp.turnOff();
```
- 외부에서 함부로 접근하지 못하도록 내부 정보를 보호하는 방식을 캡슐화 *encapsulation*이라 한다.
```javascript
var lamp = (function() {
  var brightness =  0;

    return {
        turnOn: function() {
            brightness = 100;
        },
        turnOff: function() {
          brightness = 0;
        }
    }
})();
```
- 복잡한 원리나 구동 방식을 추상화시켜주는 작업을 추상화 *abstraction*이라 한다.
```javascript
var lamp = (function() {
  var brightness =  0;

    return {
        turnOn: fucntion() {
            brightness = 100;
        },
        turnOff: function() {
          brightness = 0;
        },
        autoOnAndOff: function() {
          brightness = 100;

            setTimeout(function() {
              brightness = 0
            }, 5000);
        }
    }
})();

lamp.autoOnAndOff();
```
- 객체를 여러개 만드는 경우는 다음과 같다.
#### 예제1
```javascript
function lampFactory() {
  var brightness =  0;

    return {
        turnOn: fucntion() {
            brightness = 100;
        },
        turnOff: function() {
          brightness = 0;
        },
        autoOnAndOff: function() {
          brightness = 100;

            setTimeout(function() {
              brightness = 0
            }, 5000);
        }
    }
};
var lamp1 = lampFactory();
var lamp2 = lampFactory();
var lamp3 = lampFactory();
```
#### 예제2
```javascript
function Factory() {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        employee.say = function () {
            log.add(this.type + ": rate " + this.hourly + "/hour");
        }

        return employee;
    }
}

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

// log helper
var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("parttime"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }

    log.show();
}
```