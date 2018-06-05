# Prototype
- 프로토타입 *prototype* 이란 클래스의 인스턴스에서 사용할 수 있는 메서드를 말한다.
- 모든 함수에는 .prototype와 .constructor라는 속성을 가진다. 일반적인 함수에서는 프로토타입을 사용할 일이 없지만, 객체 생성자로 동작하는 함수에서는 프로토타입이 대단히 중요하다. (Constructor -> Prototype, Prototype -> Constructor)
- 프로토타입 프로퍼티가 중요해지는 시점은 **new** 키워드로 새 인스턴스르 만들었을 때이다.
- 객체 인스턴스는 생성자의 prototype 프로퍼티를 던더프로토(_ _ proto _ _) 프로퍼티에 저장한다.
```javascript
function Graph() {
  this.vertexes = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertexes.push(v);
  }
};

var g = new Graph(); // Graph {vertexes: Array(0), edges: Array(0)}
// g.__proto__ : {addVertex: ƒ}
```
