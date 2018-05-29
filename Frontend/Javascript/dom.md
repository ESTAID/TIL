# DOM의 이해

## Node
- DOM, 즉 문서 객체 모델은 HTML 문서의 구조를 나타내는 표기법인 동시에 브라우저가 HTML 문서를 조작하는 핵심이다.
- DOM 트리는 노드 *node* 로 구성된다. 노드는 여러 가지 DOM 타입들이 상속하는 인터페이스이며 그 다양한 타입들을 비슷하게 처리할 수 있게 한다.
- 루트 *root* 노드를 제외한 모든 노드에 부모 *parent* 가 있으며, 자식 *child* 노드는 있어도 되고 없어도 된다.
- 루트 노드는 문서 *document*이며 자식 노드는 html 요소 하나 뿐이다. html 요소에는 자식으로 head요소와 body요소가 있다.
- DOM은 노드로만 구성된다. 하지만 모든 노드가 HTML 요소는 아니다.
```HTML
<p> hello world</p> <!-- p 태그는 HTML 요소지만, 안에 "hello world"는 텍스트 노드이다. -->
```
- 노드 객체에는 트리 구조를 나타내는 parentNode, childNodes, nodeName과 nodeType 프로퍼티가 있다.
- 프라퍼티에 대한 자세한 정보는 아래 MDN문서를 참고하자

- [Node - Web APIs | MDN](https://developer.mozilla.org/ko/docs/Web/API/Node)

## Element
- 엘리먼트 *element* 는 하나의 문서의 하나의 객체를 나타낸다. 엘리먼트는 모든 종류의 엘리먼트에 공통적인 메소드와 속성을 설명한다.

```javascript
<div id="hello"/>
var element = document.getElementById('hello'); // return a single element
var elements = element.getElementsByTagName('div'); //유사배열로 반환 [HTML Collection Elements]
```

```javascript
var elements = document.querySelectorAll('div > ul > li:nth-child('1'));
elements.length;
elements[0];
elements[1];
elements[2];
// querySelector는 element에 있는 메서드
// get 메소드는 document
```

```javascript
var ulElement = document.querySelector('ul');// return a HTML Collection - Elements
```
- 프라퍼티에 대한 자세한 정보는 아래 MDN문서를 참고하자

- [Element - Web APIs | MDN](https://developer.mozilla.org/ko/docs/Web/API/element)