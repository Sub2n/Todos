# Todo List
## 기능들

- Input 창에서 Enter키로 Todo 추가
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

- MongoDB 서버 연동
- server에 요청하는 fetch와 cient view 담당하는 render 분리
- spinner

## 190613 (목)

Todos-4.0 버전

- Angular로 다시 구현
- Class화

## 190621 (금)

Todos-5.0 버전

- Component 분리

## 190628 (금)

Todos-6.0 버전

- MongoDB 서버 연동

## 190701 (월)

Todos-7.0 버전

- Angular Service를 이용해서 Http Request와 Component 기능 분리
- removeCompletedTodos에서 forEach 쓰지 않고 delete에 /completed 사용
- getter, setter 접근자 사용
