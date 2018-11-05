# React & Redux Testing

## 테스트를 위한 간단한 리액트 애플리케이션 설정하기

우선 `React`에서 테스트하는 방법부터 살펴보자.

테스트에 앞서, 테스트가 실행 될 간단한 리액트 애플리케이션이 필요하다. 예제로 버튼에 따라 숫자가 변경되는 애플리케이션을 만들자.

`src/App.js:`

    import React, { Component } from 'react';
    
    class App extends Component {
      constructor() {
        super();
    
        this.state = {
          counter: 0,
        };
    
      }
    
      onIncrement() {
        this.setState((prevState) => ({
          counter: prevState.counter + 1,
        }));
      }
    
      onDecrement() {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
      }
    
      render() {
        const { counter } = this.state;
    
        return (
          <div>
            <h1>My Counter</h1>
            <p>{counter}</p>
    
            <button
              type="button"
              onClick={this.onIncrement.bind(this)}
            >
              Increment
            </button>
    
            <button
              type="button"
              onClick={this.onDecrement.bind(this)}
            >
              Decrement
            </button>
          </div>
        );
      }
    }
    
    export default App;

분리된 테스트를 하기 위해 `onClick`이벤트를 `class`밖으로 빼내는 작업을 한다.

`this.setState`에 객체를 안 넘기고 함수를 넘긴 이유는 함수 안에서 현재 상태 값을 접근을 하기 때문이다.

나중에 테스트 파일에서 이 함수들을 불러오기 위해 컴포넌트에서 `export`를 설정하여 **단위 테스트(Unit Test)**를 만들자.

`Export Functions:`

    export const doIncrement = {...}
    export const doDecrement = {...}
    
    class App extends Component {
      constructor() {
        super();
    
        this.state = {
          counter: 0
        };
      }
    
      onIncrementClick() {
        this.setState(doIncrement);
      }
    
      onDecrementClick() {
        this.setState(doDecrement);
      }
    
      render() {...}
    }
    
    export default App;

이제 컴포넌트의 상태 값을 변경하기 위해 사용되는 함수들이 컴포넌트와 분리 되었기 때문에 별도로 테스트를 할 수 있게 되었다.

*이러한 테스트를 **단위 테스트(Unit Test)**라고 부른다.* 

`export`한 함수들은 `순수함수(Fure Function)`이기 때문에 부수 효과가 없고 결과 값을 단언한다.

이제 `App`컴포넌트에서 자식 컴포넌트를 추가하고 `export`해보자. 나중에 자식 컴포넌트를 활용하여 **통합 테스트(Integration Test)**를 할 수 있다.

`Add children Component:`

    export const doIncrement = {...}
    export const doDecrement = {...}
    
    export const Counter = ({ counter }) => (
      <p>{counter}</p>
    );
    
    class App extends Component {
      constructor() {...}
    
      onIncrementClick() {...}
    
      onDecrementClic() {...}
    
      render() {
    		return (
          <div className="App">
            <h1>react TDD</h1>
            <Counter counter={this.state.counter} />
            <button onClick={this.onIncrementClick.bind(this)}>더하기</button>
            <button onClick={this.onDecrementClick.bind(this)}>빼기</button>
          </div>
        );
    	}
    }
    
    export default App;

개별 컴포넌트를 각자 테스트한다면 **단위 테스트**를 하는 것이고, 두 컴포넌트를 아우르는 환경을 테스트를 하게 된다면 **통합 테스트**이다. 

*참고로 enzyme 라이브러리의 shallow함수도 통합 테스트에 포함된다.*

[https://github.com/nhnent/fe.javascript/wiki/내가-절대로-얕은(shallow)-렌더링을-하지-않는-이유](https://github.com/nhnent/fe.javascript/wiki/%EB%82%B4%EA%B0%80-%EC%A0%88%EB%8C%80%EB%A1%9C-%EC%96%95%EC%9D%80(shallow)-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%84-%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0)

[https://airbnb.io/enzyme/docs/api/shallow.html](https://airbnb.io/enzyme/docs/api/shallow.html)

## 리액트에서 Mocha와 Chai 테스트 설정하기

우리는 모든 테스트를 실행 시키는 `Mocha`와 단언을 작성하기 위해 필요한 `Chai`를 설치해야 한다. 단언을 작성한다는 의미는 누군가에게 "X는 Y와 같아야 한다"라고 알려주는 것을 말한다.

만약 `@babel/register`가 없으면 같이 설치해주자.

    npm i mocha
    npm i chai
    npm i @babel/register.

리액트 컴포넌트를 테스트 할 때 가상의 브라우저 환경을 만들어줘야 할 필요가 있다.

왜냐하면 컴포넌트들은 실제로 HTML로 그려지면서 브라우저의 DOM이 되는데 테스트 코드를 노드로 실행하면 실제 브라우저가 실행이 안되기 때문이다.

`jsdom`를 설치하여 최소한의 브라우저 환경을 갖춰주자.

    npm i jsdom

테스트를 실제로 실행하기 위해 라이브러리를 설정하는 법은 아래와 같다.

`../src`:

    test
     ㄴ helper.js
     ㄴ dom.js

`helpers.js`:

    import { expect } from 'chai';
    
    global.expect = expect;

이 함수는 향 후 테스트 할 때 "X는 Y와 같아야 한다" 는 단언을 작성할 때 사용한다. 또한 `expect` 함수는 이 파일(`helpers.js`)를 사용하는 모든 테스트 파일의 전역 함수로 할당된다.

그러면

매번 `expect`함수를 직접 가져오지 않아도 바로 사용할 수 있다.

`dom.js`:

    import { JSDOM } from 'jsdom';
    
    const { window } = new JSDOM('<!doctype html><html><body></body></html>');
    
    function copyProps(src, target) {
      const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
          ...result,
          [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
      Object.defineProperties(target, props);
    }
    
    global.window = window;
    global.document = window.document;
    global.navigator = {
      userAgent: 'node.js',
    };
    
    copyProps(window, global);

위 코드는 기본적으로 리액트 컴포넌트 테스트를 위해 브라우저의 동작을 흉내낸다고 생각만 하면 된다.

**해당 예제에서 위 파일을 건드릴 일은 거의 없기 때문에 코드 자체를 깊게 설명하지 않는다.*

이제 테스트를 위해 스크립트를 작성해보자.

`package.json`:

    "scripts": {
      "start": "webpack-dev-server --config ./webpack.config.js",
      "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js 'src/**/*.spec.js'"
    },

스크립트는 설정 파일을 `require`로 가져오고 `*.spec.js`의 형태로 되어 있는 파일을 모두 실행한다.

기본적으로 테스트 파일 이름은 `App.spec.js`와 같은 형태일꺼고 `src` 폴더 아래라면 어디든지 상관 없다.

**물론 정해진 규칙은 없다.*

이제 바로 전에 작성한 스크립트를 실행하지만, 관찰(`watch`)모드로 실행하는 스크립트를 작성해보자.

    "scripts": {
     ...,
     "test:unit:watch": "npm run test:unit -- --watch"
    },

관찰 모드에서는 테스트가 한번 실행되고 난 뒤 유지되다가 소스 코드나 테스트에 변경이 일어나면 바로 다시 실행된다. 

## 리액트 state 변경을 단위 테스트하기

단위 테스트를 만들어 보자.

단위 테스트는 애플리케이션에서 작은 부분을 독립적으로 테스트한다.

보통 `순수 함수(Pure Function)`이 테스트 대상이 된다. 순수 함수를 실행할 때 입력 값이 같다면 출력 값은 언제나 동일하다. 따라서 단위 테스트로 애플리케이션의 특정 동작을 확인해 볼 수 있다.

우리는 이미 `App` 컴포넌트에서 `this.setState()`안에서 동작하는 상태 변경 함수들을 클래스 밖으로 빼두었기 때문에 테스트 파일에서 불러와서(`import`) 실행만 하면 된다.

`/src/App.spec.js`:

    describe('Local State', () => {
      it('state의 counter를 하나 올릴 수 있다', () => {
    
      });
    
      it('state의 counter를 하나 줄일 수 있다', () => {
    
      });
    });

`describe`

테스트 묶음 정의

`it`

테스트 케이스 정의

테스트를 작성할 때는 보통 세 단계를 거친다.

1. 값을 정의하고
2. 실행하고
3. 단언한다

`/src/App.spec.js`:

    import { doIncrement, doDecrement } from './App';
    
    describe('Local State', () => {
        it('state의 counter를 하나 올릴 수 있다', () => {
            const state = { counter: 0 }; // 함수에서 설정한 초기 값
            const newState = doIncrement(state);
    
            expect(newState.counter).to.equal(1);
        });
    
        it('state의 counter를 하나 줄일 수 있다', () => {
            const state = { counter: 0 }; // 함수에서 설정한 초기 값
            const newState = doDecrement(state);
    
            expect(newState.counter).to.equal(-1);
        });
      });

`결과(정상)`:

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/reactReduxTesting(1)-1.png" width="550" height="350" align="center" /></p>

`결과(비정상)`:

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/reactReduxTesting(1)-2.png" width="550" height="350" align="center" /></p>

## 리액트에 Enzyme 테스트 설정하기

`Enzyme`를 사용하여 리액트 컴포넌트의 단위 테스트와 통합 테스트를 설정해보자.

먼저 필요한 모듈을 설치해준다.

    npm i enzyme
    npm i enzyme-adapter-react-16
    

**현재 자신이 사용하고 있는 리액트 버젼에 맞춰서 adapter를 설치해주어야 한다.*

`test/helpers.js`에 `Enzyme`를 설정해준다.

`test/helpers.js`:

    import { expect } from 'chai';
    import { mount, render, shallow, configure } from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';
    
    configure({ adapter: new Adapter() });
    
    global.expect = expect;
    
    global.mount = mount;
    global.render = render;
    global.shallow = shallow;

`Chai`에서 단언을 실행할 때와 같이 `Enzyme`에서 사용하는 `mount`, `render`, `shallow`를 전역 함수로 만든다.

## Enzyme를 사용하여 리액트 컴포넌트를 단위, 통합 테스트하는 방법

Enzyme 설정이 완료되었으니, 컴포넌트 테스트를 진행 해보기 앞서, 리액트 컴포넌트를 테스트하는데 몇 가지 패턴이 있다. 이 패턴들을 잘 따른다면, 매번 리액트 컴포넌트를 테스트할 때 비용을 줄일 수 있다.

이미 `src/App.js`파일에서 `App`컴포넌트를 내보냈으니 바로 `App`컴포넌트를 렌더링할 때 `Counter`컴포넌트도 같이 렌더링 되는지 확인을 해보는 테스트를 작성할 수 있다.

`App.spec.js`:

    // 위 예제와 동일
    {...}
    
    describe('App Component', () => {
        it('Counter 컴포넌트를 그려낸다.', () => {
            const wrapper = shallow(<App />);
            expect(wrapper.find(Counter)).to.have.length(1);
        })
    });

전역으로 선언한 `shallow`함수는 Enzyme에서 가장 단순하게 컴포넌트를 그려내는 함수이다. 딱 해당 컴포넌트만 그려내고 그 컴포넌트의 자식 컴포넌트는 그리지 않는다.

이 함수는 **단위 테스트**에는 제격이다. 왜냐햐면 컴포넌트를 분리해서 테스트 할 수 있게 만들어기 때문이다.

또한

그려진 컴포넌트에서 특정 HTML 태그나 CSS 클래스에 맞는 DOM이 그려졌는지 확인할 수 있다.

    // 위 예제와 동일
    {...}
    
    it('List 래퍼가 list 엘리먼트를 그려낸다', () => {
      const wrapper = shallow(<List items={['a', 'b']} />);
      expect(wrapper.find('li')).to.have.length(2);
      expect(wrapper.find('.list')).to.have.length(1);
    });

어떤 Props를 전달했느냐에 따라 Enzyme의 선택자를 이용하여 그려진 HTML 엘리먼트를 확인해볼 수 있습니다.

또한

컴포넌트에 리액트의 조건부 렌더링을 적용했다면, 선택자로 선택된 요소의 개수가 0개인지 1개인지 확인하는 방식으로 조건에 따라 컴포넌트가 알맞게 그려졌는지 확인이 가능하다.

Enzyme를 이용한 얕은 렌더링 테스트들은 가벼운 **통합 테스트**에서 사용되곤 한다.

예를 들어, 단순히 HTML 태그가 렌더링된 것을 확인할 뿐만 아니라, 올바른 props가 컴포넌트에 전달됐는지 확인할 수 있다.

`shallow rendering`:

    // 위 예제와 동일
    {...}
    
    describe('App Component', () => {
      it('Counter 래퍼를 그려낸다', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Counter)).to.have.length(1);
      });
    
      it('Counter 래퍼에 모든 Prop이 전달되었다', () => {
        const wrapper = shallow(<App />);
        let counterWrapper = wrapper.find(Counter);
    
        expect(counterWrapper.props().counter).to.equal(0);
    
        wrapper.setState({ counter: -1 });
    
        counterWrapper = wrapper.find(Counter);
    	    expect(counterWrapper.props().counter).to.equal(-1);
      });
    });

위 예제는 단위 테스트와 통합 테스트의 경계가 애매하게 보일 수 있다. 하지만, 이 것은 두 컴포넌트 사이의 간단한 부분이 기대한 대로 작동하는지 확인하는 정도이기 때문에 가벼운 통합 테스트정도로 생각할 수 있다.

이 테스트에서 컴포넌트가 `Porps`에 어떻게 접근하고 확인하는지, 어떻게 컴포넌트의 지역 상태를 변경했는지 목적에 맞게 결과를 보여준다. 이런 방식으로 컴포넌트의 지역 상태 변화를 테스트할 수 있다.

예를 들어, 컴포넌트 안에 있는 상태에 따라 특정 요소가 나타났다 사라졌다 하는 토글이 있다고 가정해보자. 테스트 코드를 작성하며 임의로 상태를 변경하여 정확한 HTML요소들이 렌더링됐는지 확인할 수 있다.

`Enzyme`를 활용하여 가상으로 클릭 이벤트를 활성화 할 수도 있다.

현재 `App`컴포넌트는 클릭 이벤트를 테스트를 해보기에 적합한 2개의 버튼을 가지고 있다. 어떻게 `onClick`핸들러를 포함한 버튼을 가진 HTML 요소들 안에서 이벤트들을 테스트 하는지 확인해보자.

    {...}
    
    describe('App Component', () => {
      it('Counter 래퍼를 그려낸다', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Counter)).to.have.length(1);
      });
    
      it('Counter 래퍼에 모든 Prop이 전달되었다', () => {
        const wrapper = shallow(<App />);
        let counterWrapper = wrapper.find(Counter);
    
        expect(counterWrapper.props().counter).to.equal(0);
    
        wrapper.setState({ counter: -1 });
    
        counterWrapper = wrapper.find(Counter);
        expect(counterWrapper.props().counter).to.equal(-1);
      });
    
      it('counter를 하나 올린다', () => {
        const wrapper = shallow(<App />);
    
        wrapper.setState({ counter: 0 });
        wrapper.find('button').at(0).simulate('click');
    
        expect(wrapper.state().counter).to.equal(1);
      });
    
      it('counter를 하나 내린다', () => {
        const wrapper = shallow(<App />);
    
        wrapper.setState({ counter: 0 });
        wrapper.find('button').at(1).simulate('click');
    
        expect(wrapper.state().counter).to.equal(-1);
      });
    });

위 예제는 버튼이 2개이기 때문에, `at()`를 사용하여 인덱스로 직접 접근이 가능하다. 하지만 엘리먼트의 순서가 바뀌게 된다면 조심해서 사용해야 한다.

*제대로 된 테스트라면 각각의 엘리먼트들을 명확히 가져올 수 있도록 선택자(`selector`)를 사용하자.*

여기까지 리액트 컴포넌트의 지역 상태를 테스트하는 기본적인 방법이였다. 다른 컴포넌트를 테스트할 때도 무난하게 재사용 가능한 방법이기 때문에 패턴이라고 봐도 무방하다.

## mount()와 render()는 언제 사용할까?

`shallow()`함수가 자식 컴포넌트를 제외한 컴포넌트를 그려내는 반면 `mount()` 함수는 모든 자식 컴포넌트까지 그려낸다. 즉 전체 컴포넌트 계층을 그려낸다.

`shallow()`가 단위 테스트나 얕은 수준의 통합 테스트에 사용된다면,

`mount()`는 진정한 통합 테스트에서 사용된다고 볼 수 있다.

통합 테스트는 특정 컴포넌트 계층에 속한 모든 자손과 로직을 가져오기 때문에 더 깨지기 쉽다. 따라서 통합 테스트의 유지 비용은 단위 테스트보다 높다.

`render()`함수는 모든 자식 컴포넌트를 그려낸다는 특징 때문에 `mount()`와 비슷하지만, 퍼포먼스 측면에서 더 좋다. 왜냐하면 리액트의 라이프사이클 메서드를 적용하지 않고 컴포넌트를 그려내기 때문이다.

그러니

**자식 컴포넌트까지 접근하고 싶지만 굳이 라이프사이클 메서드를 확인할 필요가 없다면 `render()`를 사용하자.**

## 단위 테스트와 통합 테스트를 작성해야 할 지 결정할 때 두 가지 중요한 원칙들

일반적인 경우

일반적인 경우 피라미드 원리를 따른다.

`피라미드 원리`:

1. 가능한 많은 단위 테스트를 작성한다.
2. 어느 정도의 통합 테스트, 그리고 아주 적은 수의 전체 테스트를 작성한다.

기본적으로 작은 규모를 차지하면서 유지 보수하기 용이한 단위 테스트를 많이 작성하고, 어느 정도 중요한 부분에 통합 테스트를 적용해야 한다. 이 방식은 스포트웨어 공학 분야에서 일반적으로 생각하는 테스팅 방법이다.

리액트와 같은 라이브러리를 사용할 경우

리액트와 같이 컴포넌트를 테스트를 할 때는 다른 원칙이 존재한다.

1. 통합 테스트를 많이 작성한다.
2. 단위 테스트를 적게 작성한다.

컴포넌트 단위 테스트는 전체 애플리케이션과 비교하면 너무 고립된 데다가 잘 깨질 일도 없다.

그래서

보통 특정 부분의 맥락을 완벽히 분리해서 본 떠놓고 단위 테스트를 수행한다. 많은 사람들이 이 주제를 가지고 컴포넌트가 너무 분리되어 있을 경우 테스트의 실효성에 대해 토론을 한다. 

결과적으로

**통합 테스트를 하면서 서로 다른 컴포넌트의 맥락이 잘 맞아 떨어지는지, 견고하게 구성되었는지 확인하는 테스트를 더 많이 하게 된다.**

실제로 단위 테스트보다 통합 테스트를 더 많이 작성한다면, `mount()`나 `render()`를 더 많이 사용하게 된다. 그렇게 전체 컴포넌트 계층 구조를 그려낸 뒤에 특정 값의 존재 유무나 행동이 잘 맞는지 확인하고, 모든 자손 컴포넌트를 직접 접근할 수 있게 되었으니 더 복잡한 테스트를 작성할 수 있다.

## 리액트에서 sinon 테스트 설정하기

*Jest에서도 비동기 테스트가 가능하기 때문에 생략한다...*

## 리액트에서 Jest 설정하기

`Jest`를 설정하고 리액트 애플리케이션 테스트를 실행하는 방법을 알아보자.

`Jest`는 페이스북에서 공식적으로 사용되는 테스팅 라이브러리이며, **스냅샷(Snapshot, 순간적으로 촬영된 사진)**이라는 개념을 도입하며 `Enzyme`와 함께 리액트 애플리케이션의 단위 테스트와 통합 테스트를 할 때 유용하게 사용되고 있다.

스냅샷 테스트라 하면 테스트를 실행할 때 실제 그려지는 컴포넌트의 결과물을 스냅샷으로 만드는 것을 말한다. 그리고 이 스냅샷은 다음 테스트를 실행할 때 생성되는 스냅샷과 비교하는데 사용된다. 만약 그려진 컴포넌트의 결과물이 바뀌었다면, 두 스냅샷의 차이를 표시되면서 실패합니다. 스냅샷 테스트는 결과물이 바뀌었을때 알려주기때문에 변경된 스냅샷을 받아들이거나 변경된 부분을 무시하고 컴포넌트의 구현부를 수정하여 원래의 결과물이 나오도록 고치면 된다.

`Jest`를 사용함으로써, 가벼운 테스트를 유지할 수 있다. 간단히 설정을 하고 테스트가 실패할때마다 받아들일지 말지 결정하면 된다. 이 것은 비즈니스 로직보다 출력된 결과물을 신경쓰게 된다. 비지니스 로직도 `Enzyme`으로 잘 테스트할 수 있지만, `Jest`로도 테스트할 수 있습니다.

Note:

`Jest`는 테스트 실행기와 단언 함수가 포함되어 있다. `Mocha`와 `Chai`를 테스트 실행기와 단언 라이브러리 사용했지만, `Jest` 하나로 모두 해결할 수 있다.

**약간의 문법 차이는 있다.*

`Jest`를 설정해보자. 먼저 개발 의존성으로 `Jest`와 `react-test-renderer` 라이브러리를 설치해준다. 이 라이브러리는 `Jest` 테스트에서 컴포넌트를 그려낼 때 사용한다.

    npm i jest
    npm i react-test-renderer

`Jest` 실행 환경을 Babel 환경에서 설정을 해주기 위해 `babel-jest`를 설치해보자.

    npm i babel-jest

그리고 `Jest` 설정 파일을 만들어 준다.

`/test/jest.config.json`:

    {
      "testRegex": "((\\.|/*.)(snapshot))\\.js?$",
      "rootDir": "../src"
    }

testRegex:

어디에 있는 스냅샷 테스트 파일을 가지고 테스트를 할 지 지정하는 것이다. 이 튜토리얼에서는 `*.snapshot.js` 파일을 테스트 대상으로 지정하여, `*.spec.js` 파일에 작성된 유닛 테스트 및 통합 테스트와 완전히 분리했다.

rootDir:

`Jest`가 어느 폴더부터 테스트 파일을 탐색해나갈지 지정한다.

마지막으로 package.json 파일에 스냅샷 테스트를 실행하는 스크립트를 추가해주자.

`package.json`:

    "scripts": {
      "start": "webpack-dev-server --config ./webpack.config.js",
      "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
      "test:unit:watch": "npm run test:unit -- --watch",
      "test:snapshot": "jest --config ./test/jest.config.json",
      "test:snapshot:watch": "npm run test:snapshot -- --watch"
    }

`npm run test:snapshot`

`Jest`에게 설정 파일에 따라 테스트가 실행된다.

`npm run test:snapshot:watch`

`Mocha`와 동일하다.

이제 테스트를 위해 터미널 탭을 하나 더 띄워야 할 수도 있다. Mocha로 단위 테스트와 통합 테스트를 워치 모드로 실행하고, 다른 탭을 열어 Jest의 스냅샷 테스트를 워치 모드로 실행하며, `npm start` 로 애플리케이션을 실행해 볼 탭도 필요하다. 만약 `Mocha`와 `Chai`를 사용하지 않는다면 `Jest`만 실행해도 무방하다.

`src/App.snapshot.js`:

    import React from 'react';
    import renderer from 'react-test-renderer';
    
    import App, { Counter } from './App';
    
    describe('App Snapshot', () => {
      test('renders', () => {
        const component = renderer.create(
          <App />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    
    describe('Counter Snapshot', () => {
      test('renders', () => {
        const component = renderer.create(
          <Counter counter={1} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

간단한 예제는 이게 끝이다. 이제 커맨드 라인에서 스냅샷 테스트를 실행해보자. 그 다음에 `App` 컴포넌트의 `render()` 메서드를 조금 수정해보자. 예를 들어 `<h1>` 태그에 몇 마디 넣어서 추가를 해볼 수도 있다.

`결과(정상)`:

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/reactReduxTesting(1)-3.png" width="550" height="350" align="center" /></p>

`결과(비정상)`:

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/reactReduxTesting(1)-4.png" width="550" height="350" align="center" /></p>

다시 스냅샷 테스트를 실행하면 `App` 컴포넌트에 대한 테스트는 실패할 것이다. 그리고 스냅샷을 업데이트를 할지 코드를 고칠지 결정하면 된다.

Jest의 더욱 더 강력한 기능이 궁금하면 아래의 링크를 참조 해보자.

[Getting Started · Jest](https://jestjs.io/docs/en/getting-started)

참조:

[https://adhrinae.github.io/posts/react-testing-tutorial-kr#리액트에서-mocha와-chai-테스트-설정하기](https://adhrinae.github.io/posts/react-testing-tutorial-kr#%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-mocha%EC%99%80-chai-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

[https://adhrinae.github.io/posts/write-mostly-integration-test-kr](https://adhrinae.github.io/posts/write-mostly-integration-test-kr)