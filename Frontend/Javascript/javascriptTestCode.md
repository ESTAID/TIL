# JavaScript Test Code 개념

테스트 코드를 쓰는 이유는 크게 2가지가 있다.

1. 전체 작업 흐름의 속도를 올려서 개발을 빠르게 한다.
2. 변경 사항이 있을 때 기존 코드를 무너트리지 않는다는 확신을 갖도록 도와준다.

하지만,

테스트를 작성을 하는게 좋다는 공감대를 얻었지만 막상 코드를 작성하려고 하면 막막하다. 전부 다 테스트를 하자니 너무 광범위하고, 함수 단위로 유닛 테스트만 작성을 하자니 너무 세세해서 제대로 애플리케이션이 작동을 하는지 파악하기 힘들다. 

대부분의 프로젝트에 **자동화된 테스트** 를 작성을 하는게 바람직하다. 테스트를 작성할 때는 이 테스트가 프로젝트의 버그를 얼마나 줄여줄 수 있는지 신경을 써야한다. (정적인 타이밍이나 린트는 `Flow`, `ESLint`를 사용하자) 또한, 코드를 리팩토링 할 때에는 테스트 코드를 변경해야 하는 경우는 거의 없다.

자동화된 테스트의 종류는 다양하다. 보통 많이 거론되는 테스트는 `단위 테스트(Unit Test)`, `통합 테스트(Integration Test)`, `E2E Test(End to End Test)`가 있다.

많은 시간이 들고, 실행하고 유지보수를 하는데 비용이 많이 드는 순서는 다음과 같다:

![](https://github.com/Geon-wooBryanKim/TIL/blob/master/images/javascriptTestCode.png)

하지만,

**피라미드가 위로 올라갈 수록 테스트의 신뢰성은 증가한다.** 따라서 `E2E Test`가 `Unit Test`보다 느리고 비용이 많이 들지라도, 애플리케이션이 의도대로 동작한다는 자신감은 더 커진다.

생산성과 비용 절감을 위해 `Unit Test`를 작성한다고 생각해보자.

분리된 수 많은 `Unit Test`를 작성하고 그 부분을 통합하지 못한다면 아무 소용이 없다. 만약 버튼 컴포넌트가 `onClick` 함수를 호출할 때 해당 함수가 올바른 데이터를 요청하지 못 할때, 호출이 잘 되는지 확인하는 일은 중요한 부분이 아니다.(코드에서 에러가 나기 때문에)

각 분리 된 부분에서 자신의 역할을 제대로 수행하는지 확인하기 위해 단위 테스트를 작성을 하고 이어서 어느 정도의 통합 테스트를 작성한 뒤에 몇 가지 전체 테스트를 작성한다.

***Integration test는 생산성 / 비용을 부담하는 정도를 아주 균형있게 가지고 있다.***

`Unit Test`와 `Integration test`의 경계는 모호하다. 

*단위테스트(Unit Test)란*

단위 테스트는 일반적으로 애플리케이션 일부(`React`에서는 주로 컴포넌트)를 독립적으로 테스트하는 것을 말한다. 테스트 자체를 단순화하고 빠르게 작성하여 수행해 볼 수 있다는 장점을 갖는다.

이를 통해 수 많은 단위 테스트들을 만들 수 있고, 보다 많은 버그를 잡아 낼 수 있다. **특히 코드를 변경하는 경우 변경과 상관없는 구현 코드들이 이상 없이 동작할 수 있게 도움을 준다.**

Unit Test Sample Code in JavaScript:

    const u1 = {
    	name: 'geonwoo',
    	age: 28
    };
    
    function getName() {
    	return this.name;
    }
    
    function getAge() {
    	return this.age;
    }
    
    // Unit Test 1
    if (getName.call(u1) !== 'geonwoo') {
    	throw new Error('name is different');
    }
    // Unit Test 2
    if (getAge.call(u1) !== 20) {
    	throw new Error('age is different');
    }

기본적으로 단위 테스트는 각각 하나의 행동에 대해서만 테스트를 수행하고, 서로에 대해 독립성을 유지해야 한다. 단순한 형태는 Vanilla JavaScript로 작성이 가능하나 `Mocha`, `Jasmine`과 같은 단위 테스트 라이브러리를 사용해 보다 쉽게 테스트 코드 작성이 가능하다.

*통합 테스트(Integration Test)란*

통합 테스트는 테스트 환경에서 데이터베이스에 대한 접근 코드를 테스트하는 것과 같이 여러 기능들을 함께 테스트 하는 것을 말한다. 예를 들어, Form 태그에서 이메일 주소와 비밀번호를 입력한 뒤에 서버로 데이터를 전송하는 과정 같은 것을 말한다.

** `React`에서는 주로 함수를 사용하기보다는 컴포넌트를 사용하기 때문에 통합 테스트를 주로 작성(Rendering Test)하고 단위 테스트는 그리 많이 작성하지 않는다.*

통합 테스트를 효과적으로 작성하는 방법은 너무 많은 것을 모킹(mocking)하지 않는 것이다. 무언가를 모킹할 때, 테스트하고 하는 것과 모킹된 것 사이의 통합 테스트 신뢰도는 떨어지게 된다.

참고:

[https://adhrinae.github.io/posts/what-is-testing-javascript-kr](https://adhrinae.github.io/posts/what-is-testing-javascript-kr)