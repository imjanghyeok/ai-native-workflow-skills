# AI가 작업 구조를 준비하고 기록을 연결하기

## 사용자의 수작업을 줄이는 기본값

사용자가 IDE에서 파일 생성·이동·삭제를 직접 하기 불편한 상황을 전제로 한다. **Codex가 파일을 만들거나 필요한 이동·삭제를 수행하는 것을 금지한다는 뜻은 아니다.** 실제 과제 지침·권한 범위에서 Codex가 구조와 파일을 준비한다. 기존 계약·사용자 변경·원본 데이터와 관리 영역을 보호하며 필요한 변경은 수행한다. 삭제/이동 자체가 제한되면 우회하지 않고 안내를 따른다.

## 자동 준비 도구

[prepare-workspace.cjs](../scripts/prepare-workspace.cjs)는 표준 Node 기능만 사용한다. 실제 과제 위치를 확인한 뒤 `--target`을 지정한다. 기본은 기존 프로젝트용 문서/기록 도구만 추가하는 `--starter none`이다. 새 JS 과제라면 `--starter js`로 예제 앱도 만든다.

```sh
node /home/user/exam-kit/.agents/skills/task-triage/scripts/prepare-workspace.cjs --target /실제/과제/경로 --starter js
```

경로를 예측해서 쓰지 않는다. 위의 `/실제/과제/경로`는 실제 확인한 경로로 바꿔야 한다. 참고 스킬 저장소 안에는 생성하지 않는다. 기존 README·AGENTS·문서는 보존한다. 같은 앱/도구 파일의 내용이 다르면 자동 덮어쓰기 대신 충돌을 보고한다. 이 경우 Codex가 실제 코드를 읽고 필요한 부분을 병합하거나 별도 위치를 정한다. 하네스가 모든 파일 변경을 막는 정책은 아니다.

생기는 구조:

```text
실제과제/
  README.md                 # 원래 과제 안내 유지
  app/                      # --starter js일 때만: core/cli/server/UI/예제 테스트
  docs/
    requirements.md
    design.md
    decisions.md
    verification.md
    WORKFLOW.md             # 생성된 도구 사용법
  data/raw/                 # 원본 보관 후보; 제공 원본은 임의 이동하지 않음
  data/processed/
  tools/worklog.cjs
  worklog/
    README.md
    requests/               # 요청 원문
    runs/                   # 명령·Codex 실행별 stdout/stderr/result
    handoffs/
    events.jsonl            # 첫 기록 시 생성
```

기존 src/tests/data 구조가 있으면 그대로 쓰고 app을 의무적으로 추가하지 않는다. 기본 문서는 ‘미작성’ 상태이며 실제 결과를 채워야 완료 근거가 된다. 이 파일 구조도 실제 제출 양식에 맞게 조정할 수 있다.

## 기록 방식 선택

### 일반 Codex 대화 + AI 기록

Codex에게 각 요청 시작 시 원문을 기록하고 `requestId`를 발급받도록 지시한다. 계획·판단·예상·관찰·검증을 그 ID에 연결한다. 이는 AI의 전사/기록이며 모든 사용자 키 입력을 독립적으로 포착하는 기능이 아니다. 빠뜨린 요청이나 전사 정확성은 실제 대화와 대조한다.

### 기록기를 거친 원문 선저장

생성한 과제 폴더에서 `node tools/worklog.cjs chat`을 실행한다. 요청을 여러 줄 입력한 뒤 `/send`를 쓰면 원문을 먼저 저장하고 **현재 제공 codex 실행 파일**의 exec로 전달한다. 다음 요청은 반환된 세션 ID로 resume한다. `/exit` 또는 전송 전 종료 시 남은 글은 미전송 초안으로 구분한다.

모델·계정·MCP·업데이트·버전은 설정하지 않는다. exec/resume/--json의 실제 지원을 확인한다. 기본 권한을 상속하며 허용된 쓰기가 필요하면 지원 환경에서 `--workspace-write`를 명시할 수 있다. 관리 정책·승인·시험 제한을 우회하지 않는다. 제공 환경에서 지원되지 않거나 승인이 필요하면 일반 Codex와 AI 기록 방식으로 진행한다. 로컬에서 실험한 명령을 그대로 시험 환경에 강제하지 않는다.

이 기록기는 동시 세션 런처가 아니다. 하네스 밖의 일반 TUI·다른 창·다른 세션을 감시하거나 대회 공식 기록을 대체하지 않는다.

## 판단과 근거의 형식

`request`는 원문 파일·해시·입력 경로(capture), `note`는 actor와 요약, `run`은 실제 명령·종료 상태·출력 경로를 남긴다. 상세 명령은 생성된 docs/WORKFLOW.md에 있다.

- plan: 이번 요청에서 처리할 요구와 파일/검증 계획.
- decision: 선택·이유·대안·근거·한계.
- expectation: 실행 전에 예상한 값과 이유.
- observation: 실제 결과·파일·검증 명령과 기대값의 차이.
- reflection: 다음 개선과 미확인 범위.
- handoff: 리뷰 발견과 필요한 후속 작업.

actor=user는 본인이 직접 남긴 생각, actor=ai는 AI의 요약/제안이다. AI가 사용자의 판단을 추측해 기록하지 않는다. 설명 가능한 결정 요약을 남기며 공개되지 않은 내부 사고를 추정해 채우지 않는다. 기록 누락·실패를 완료로 쓰지 않고, 로그의 존재를 이해/정확성 증명으로 삼지 않는다.

## 검증과 범위

[workspace.test.cjs](../scripts/workspace.test.cjs)로 자동 구조 생성·기존 파일 보존·요청 원문 보존·실제 명령 성공/실패·없는 실행 파일·두 요청 resume·미전송 초안을 확인한다. `chat` 프로토콜 검증은 **가짜 CLI 프로세스**를 사용하므로 실제 Codex 모델 응답·시험 환경의 하네스 사용 허용을 검증한 것은 아니다.

로그는 작업 공간 안에만 둔다. 토큰·비밀번호·개인 접속 링크를 입력하지 않는다. push/외부 전송 금지는 계속 적용한다. 기록기의 일부 명령 검사는 보조 장치이며 방화벽·격리 샌드박스가 아니다.
