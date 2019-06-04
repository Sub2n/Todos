# Todos-1.0
## 기능들
- Enter키로 Todo 추가
- Todo 삭제
- 완료된 Todo와 완료 안 된 Todo 관리
- 전체 선택 완료 / 해제
- 완료된 Todo 삭제
## 190527 (월)
Todos-1.0 버전
- IIFE로 감싸서 그냥 만들었음
- Event Listener를 Class의 method로 만들었을 때 해당 메소드의 this는 class의 instance가 아니라 event를 바인딩한 DOM객체가 되는 문제
  - bind로 event listener method에 this를 binding
  - this가 없는 Arrow function을 사용해서 상위 lexical scope, 즉 class의 this를 바인딩하게 하는 방법
  
## 190604 (화)
Todos-3.0 버전
