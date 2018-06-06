# Promise
- 비동기를 객체지향화해서 쓴다는게 프로미스*promise*의 포인트이다.
- 면접에서 프로미스 질문시 일반적으로 프로미스를 사용하면 콜백 헬*Callback Hell* 를 탈피할 수 있다고 얘기하는데 그 대답은 깔끔한 대답이 아니다.
- 주된 포인트는 *객체지향프로그래밍* 을 접목해서 비동기를 다뤄 콜백 헬을 탈피할 수 있다는게 메인 포인트이다.
- 객체지향이란 객체를 인자로 줄 수도 있고, 리턴값으로 줄 수도 있고, 메서드도 쓸 수 있다.
- 자주 쓰는 메소드
	1. promise.then()
	2. promise.catch()
	3. promise.all()

#### none promise
```javascript
$.get({
  url : "WEBSITE",
	success: function(data) {
	  console.log(data.items.length);
	},
	error: function(error) {
	  console.error(error);
	}
});
```

#### with promise
```javascript
// 객체안 인자값으로 함수 통으로 넣어준다.
var youtubePromise = new Promise(function(resolve, reject)) {
	$.get({
		url : "WEBSITE",
		success: function(data) {
			resolve(data);
		},
		error: function(error) {
			reject(error);
		}
	});
}

// 사용
youtubePromise.then(function(data) {
console.log('Success');
}).catch(function(err) {
console.log(err);
});
```