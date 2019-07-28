# 브라우저 동작 원리와 Virtual DOM의 관계

브라우저의 렌더링 엔진은 다음과 같이 파싱을 합니다.

1. HTML 문서 파싱
2. `<head>` 태그에 있는 외부 자원(CSS, JS) 로드
3. DOM Tree 생성
4. CSSOM 생성
5. Render Tree 생성
6. Render Tree 구축
7. Render Tree 배치 (Layout)
8. Render Tree 그리기 (Painting)

<p align="center"><img src="https://github.com/Geon-wooBryanKim/TIL/blob/master/images/browser-workflow-with-virtual-dom.png" align="center" /></p>

1.HTML 문서 파싱

간단히 말해 HTML 파서는 HTML 마크업을 파싱 트리로 변환하는 작업을 합니다.

2.`<head>` 태그에 있는 외부 자원(CSS, JS) 로드

외부 자원을 로드합니다. 이때 스크립트를 로드할할 때, 특별한 옵션을 주지 않을 경우 문서의 파싱은 중단됩니다. 왜냐하면 스크립트가 DOM을 간접적으로 조작할 수 있기 때문입니다.

3.DOM Tree 생성

DOM Tree란 HTML 문서를 객체(Node)로 표현한 트리들의 집합입니다. 각 Node들은 각 html 엘리먼트들과 연관되어 있습니다.

4.CSSOM 생성

CSSOM은 CSS 객체 모델(CSS Object Model)을 말합니다. DOM Tree를 생성하는 동안 `link` 태그와 같이 외부 CSS 스타일 시트를 만나면 해당 작업을 진행합니다.

5.Render Tree 생성

Render Tree란 CSS와 함께 html을 시각적으로 표현한 것을 말합니다. CSSOM을 통해 외부 CSS파일을 파싱하고 각 엘리먼트의 `inline` 스타일도 파싱하여 Render Tree를 생성합니다.

6.Render Tree 구축

Render Tree 구축하기 위해 브라우저는 DOM의 Root 트리에서 부터 노드들을 순회합니다. 순회하면서 CSSOM과 inline 스타일로 박힌 노드들의 스타일 정보를 계산해서 객체형태로 반환합니다.(이때 display:none 같은 속성을 설정한 노드는 렌더 트리에서 보이질 않습니다.)

해당 작업은 동기적으로 일어나고, DOM 트리에 새로운 노드가 추가되면 그 노드의 attach 함수가 실행됩니다.(이는 Webkit 기준입니다.)

7.Render Tree 배치(Layout)

노드가 화면 어디에 표시되어야 하는지 좌표를 전달하고 위치를 잡는 작업을 진행합니다.

8.Render Tree 그리기(Paint)

DOM 트리의 각 노드들을 순회하면서 paint()함수를 호출합니다.

우리는 이제 브라우저의 렌더링 엔진이 어떻게 DOM을 그리는지 알 수 있습니다. 만약 DOM이 추가되거나 삭제되면 어떤 현상이 일어날까요? 그러면 모든 요소들의 스타일이 다시 계산되고 레이아웃을 맞추고 그리는 작업을 반복할 것입니다.

```
Render Tree 생성 → Render Tree 구축 → Render Tree 배치(Layout) → Render Tree 그리기(Paint) → Render Tree 생성 → Render Tree 구축 → ...
```

만약 코인 그래프와 같이 실시간으로 값이 변하고 레이아웃을 다시 잡아주는 작업을 한다면 그만큼 브라우저의 연산이 많아진다는 뜻이고, 프로세스가 느려지고 화면이 버벅이는 현상이 발생할 수 도 있습니다.

이 부분을 Virtual DOM을 사용하면 어떨까요 ?
만약 뷰에 변화가 있다면, 그 변화는 실제 DOM으로 적용하기 전에 domNode 객체를 활용하여 가상의 DOM에 먼저 적용시키고 결과물을 실제 DOM에 전달해줍니다. 이는 실제 DOM이 아닌 메모리에 있기 때문에 DOM의 연산 비용을 최소화할 수 있습니다. 위의 설명을 간단한 예제를 통해 살펴보겠습니다.

```
    <div id="root">
    	<p>foo</p>
    	<p>bar</p>
    </div>
```

위와 같은 html 코드에서 `div` 태그 자식 요소로 `<p>baz</p>`태그를 추가하고 싶다고 가정하면 아래와 같이 작성할 수 있습니다.

```
    var domNode = {
    	tag: 'div',
    	attribute: { id: 'foot' },
    	children: [ { tag: 'p', attribute: {}, children: 'baz'} ]
    };
```

다시말해, 실제 DOM이 아닌 Virtual DOM에 먼저 변경된 작업을 다 해준 뒤 최종 변화를 실제 DOM에 던져주기 때문에 실제로 다시 Render Tree를 생성하는 작업은 딱 한번만 할 수 있습니다. 이렇게 하나로 묶어서 적용시키는 것이 많은 연산의 양를 줄이는 방법입니다.
