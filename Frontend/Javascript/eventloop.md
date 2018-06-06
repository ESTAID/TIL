# Event loop
- 자바스크립트 엔진의 큰 특징 중 하나는 '단일 스레드'기반의 언어라는 점이다.
- 하지만 실제로 웹 브라우저 상에서는 애니메이션 효과와 함께 다양한 이벤트 처리를 하고, Node.js는 동시에 여러개의 HTTP 요청을 처리한다.
- 이때 등장한 개념이 이벤트 루프 *event loop*이다.
- 이벤트 루프 영역은 다음과 같다.
  1. Javascript Engine(Heap, CallStack)
  2. Web APIs(DOM Events, AJAX, Timer, ...)
  3. Callback Queue(Callback1, Callback2, ...)
  4. Event Loop
- 1 -> 2 -> 3 -> 4 -> 1 -> 2 -> 3 -> 4 -> 1...

### 콜스택(CallStack)
- 현재 실행되는 프로그램들이 스택 구조에 저장 된다.
  1. 함수가 실행되면 스택에 들어간다.
  2. 함수가 종료되면 스택에서 빠져나온다.
- Last In First Out(LIFO)

### 콜백 큐(Callback Queue)
- 콜스택이 비면 이벤트 루프가 돌면서 콜백 큐를 체크한 후 콜스택으로 밀어준다.
- First In First Out(FIFO)

### 이벤트 루프(Event Loop)
- 이벤트 루프는 콜백큐와 콜스택을 확인하는 일을 한다.

*좀 더 자세한 내용은 [Philip Loop YOUTUBE](http://latentflip.com/loupe)를 참고하자.*