# JavaScript/TypeScript 기본 작업 프로필

사용자의 준비 방향은 JavaScript/TypeScript 중심이다. **기존 과제 스택과 원문 요구가 이 기본값보다 우선**한다. Python 등 다른 프로젝트가 주어졌다고 JS로 전환하지 않는다.

## 새 과제 기본값

먼저 실제 Node 버전·기존 파일·실행 설정을 확인한다. 작은 새 도구는 Node.js와 브라우저의 HTML/CSS/JavaScript 기본 기능을 우선 검토한다. 이 묶음의 [JS 시작본](../assets/js-starter/README.md)은 패키지 설치 없이 실행할 CLI·HTTP API·화면의 연결 예제다. core.cjs의 예제 업무 규칙은 records 개수 세기뿐이며 실제 과제에 맞게 바꿔야 한다.

- CLI/JSON 처리: Node 표준 fs·JSON·Map/Set·명시적 정렬. CSV는 quoted comma·BOM·내부 줄바꿈 계약을 확인하며 단순 split을 범용 CSV 파서로 쓰지 않는다. 복잡한 CSV가 필요하면 기존 파서나 허용된 작은 의존성을 검토한다.
- 작은 웹: 단일 Node 서버 + 정적 HTML/CSS/JS, 같은 출처 API로 먼저 동작시킨다. 별도 빌드·CORS·프로세스를 늘릴 필요가 있는지 판단한다.
- TypeScript/React/Vite 등 이미 설정된 과제: 기존 버전·스크립트·잠금 파일·타입/빌드/테스트 규칙을 그대로 사용한다. 문법만 TS로 바꿔 실행 가능하다고 주장하지 않는다.
- 새 복잡한 UI에 React/TS가 실제로 유리하면 사용자의 익숙함·설치 시간·현재 환경과 요구를 근거로 선택한다. 이 저장소에 React/Vite 의존성이나 잠금 파일이 준비되어 있다고 가정하지 않는다.

## 공통 작성 규칙

입력 경계에서 타입·숫자/날짜·0/null·ID 문자열을 확인한다. Number 정수 정밀도와 부동소수점 한계를 업무 계약과 대조한다. 함수의 입력을 불필요하게 변형하지 않고 순수 계산과 I/O를 가능한 만큼 분리한다. 비동기 완료를 기다린 뒤 성공을 표시하며 오류를 무시하지 않는다. HTML에 입력값을 표시할 때 텍스트로 처리한다.

새 시작본은 CommonJS .cjs와 브라우저 JS이며 타입 검사 설정은 없다. 실제 TS 프로젝트의 import/tsconfig 규칙과 섞지 않는다. 새 추상화·라이브러리를 늘리기보다 작은 기능→실제 검증을 반복한다.

## 명령과 검증

시작본은 Node 18+를 전제로 하며 Node 22.14.0에서 실행 검증했다. `node cli.cjs input.example.json`, `node --test test.cjs`, `node server.cjs`를 사용한다. 시험장의 실제 런타임은 별도 확인한다. [Node 테스트 실행기 공식 문서](https://nodejs.org/api/test.html)를 참고할 수 있다.

기존 프로젝트가 있으면 위 명령을 강제하지 않고 실제 package.json/설정의 명령을 따른다. 브라우저 화면은 허용된 수동 미리보기에서 확인하며 HTTP 테스트와 화면 검증을 구분한다.
