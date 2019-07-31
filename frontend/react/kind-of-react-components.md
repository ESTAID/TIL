# React Component의 종류

1. React.Component(C)
2. React.PureComponent(PC)
3. Functional Component(FC)

`React.Component`는 컴포넌트의 라이프 사이클을 전부 위임받는다. 별도의 `shouldComponentUpdate`선언하지 않았다면 상태 값 변경시 항상 리렌더링이 일어난다.

`React.PurComponent`는 `React.Compnent`와 동일하지만 `shouldComponentUpdate`가 이미 적용된 컴포넌트다. `shouldComponentUpdate` 안에서 상태 값들이 얕은 비교를 통해 리렌더링을 결정한다.

`Function Component` 는 `React.Component`를 `extends` 하지 않기 때문에 해당 메서드를 위임 받을 수 없다.

성능면에서 당연히 `FC`가 빠를거 같지만 실제로는 그렇지 않다. 그 이유는 `FC`도 결국에 클래스 기반의 `React.C`로 래핑되기 때문이다.

그럼 항상 `React.C` 대신 `React.PC`를 사용하는게 좋을까? 그건 아니다. `React.PC는` 얕은 비교를 하기 때문에 중첩된 객체는 변경에 대한 감지를 하지 못한다. 그리고 모든 컴포넌트에서 `shouldComponentUpdate` 을 사용하는 건 앱이 더 느려지게 할 수 도 있다.
