# Attribute
- 속성 *attribute*는 HTML 요소의 추가적인 정보를 전달하고 엘리먼트들이 가지고 있는 것을 의미한다.
- 예를들어 <b>이름 = "값"</b>과 같이 쌍으로 온다.

```HTML
<div id="home" class="home-class">HOME</div> <!-- id, class는 속성 -->
```
# Property
- 프로퍼티 *property*는 HTML DOM 트리안에 객체를 의미한다. 그래서 위 예시에서 attribute값이 'home-class'이며 이름은 'className'인 프로퍼티를 가진다.
```js
document.querySelector('.home-class').className;
```

#이 둘의 차이는 무엇일까?
- 속성은 HTML 텍스트 문서에 있기때문에 변하지 않고 초기값(default)이 유지된다.
- 반면에 프로퍼티는 변할 수 있다. 예를 들어 자바스크립트를 통해 DOM을 조작하면 property값은 변한다.