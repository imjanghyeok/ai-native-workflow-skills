# 스킬별 단계 실행과 재개

통합 실행이 기본이며, 사용자가 한 단계만 요청하거나 중간부터 재개할 때 이 가이드를 적용한다. 아래 경로는 준비물 기본 clone 위치다. 다르면 실제 경로로 바꾼다. 실제 과제 폴더에서 제공 Codex와 허용 모델을 확인한 뒤 사용한다. 설치/슬래시 명령 지원을 가정하지 않고 SKILL.md 파일을 읽혀 실행한다. 자동 인식되는 환경에서는 해당 스킬을 선택해 같은 범위를 요청해도 된다.

## 공통 진행 규칙

기존 설계/보드/검증 문서가 있으면 재사용한다. 단계별로 새 관리 파일이나 제품 골격을 중복 생성하지 않는다. 현재 단계·적용 스킬·확인한 완료 조건·다음 행동·사용자 판단/직접 확인을 기존 인계 문서나 짧은 응답에 남긴다. 문서 존재만으로 완료 처리하지 않고 원문/코드/실행 근거를 확인한다.

단계는 작업 순서를 돕는 경계이며 상태 머신/자동 런처가 아니다. 통합 요청은 사소한 승인 없이 이어가고, 한 단계만 요청하면 해당 범위 후 멈춘다. 앞 단계가 실제로 완료됐다면 다시 수행하지 말고 근거와 변경 여부만 확인한다. 선행 계약이 없으면 필요한 부분만 보완하고 미정 정책을 지어내지 않는다. 설계 변경/결함이 생기면 영향받는 단계와 카드만 갱신한다. 실제 사용자 답이 필요한 부분만 대기한다.

| 단계 | 주담당·스킬 | 완료를 판단할 근거 |
| --- | --- | --- |
| 0 시작/경계 | Sol · task-triage | 실제 과제 경로·최신 제한·제출물·기존 구조 확인, 필요시 최소 구조/기록 준비 |
| 1 요구/데이터 | Sol · readme-to-requirements, 필요시 data-to-validated-dataset | 원문 R-ID·완료 기준·출처·업무 질문, 데이터 계약과 가공 위험 |
| 2 설계/컨벤션 | Sol · requirements-to-design | 책임·입출력/오류·권한/저장·의존성·전역 규칙·검증 계획 |
| 3 구현 준비/분담 | Sol · coordinate-workstreams | 요구별 TODO·쓰기 소유·정상/실패/경계 기대값, 준비된 Terra 카드·Sol 독립 작업 |
| 4 구현/단위 검증 | Terra · implement-and-verify, 웹이면 functional-web-delivery | 실제 구현·관련 테스트·출력/종료·고유 인계. 미정 계약은 Sol로 인계 |
| 5 통합/흐름 지도 | Sol · implement-and-verify, code-to-system-map | 실제 통합 실행·데이터/권한 흐름·출력 재읽기·모듈/API/의존성 지도 |
| 6 별도 리뷰/수정 | 별도 허용 세션 · review-and-explain; 수용 판단 Sol | 고정 기준/독립 보고·수용 기록·담당 수정·관련 재검증/필요시 재리뷰 |
| 7 본인 확인 준비 | Sol · review-and-explain, code-to-system-map | 최종 요구 추적·실제 수치·선택/거절·한계·사용자가 직접 확인할 입력/질문 |

## 0. Sol: 시작/경계만

```text
/home/user/exam-kit/.agents/skills/task-triage/SKILL.md와 references/stage-execution.md를 읽어 단계0만 실행해 줘. 실제 과제 폴더·최신 운영 제한·README/AGENTS·제출물·기존 구조를 확인하고 필요한 최소 준비와 요청 기록을 해 줘. 기존 파일과 원본을 보존해. 제품 구현은 하지 말고 현재 단계·완료 근거·다음 행동·내 판단/확인 항목을 알려줘.
```

## 1. Sol: 요구사항/데이터만

```text
/home/user/exam-kit/.agents/skills/readme-to-requirements/SKILL.md를 적용해 단계1만 실행해 줘. 기존 분석은 재사용하고 원문 요구ID·완료 기준·제출물·가정/미정·현업 질문·내 판단 사항을 정리해. 데이터가 핵심이면 /home/user/exam-kit/.agents/skills/data-to-validated-dataset/SKILL.md로 스키마/키/단위/결합/중복/출처·가공 검증 기준도 확인해. 기존 오류는 debug-and-repair, 문서 중심은 document-to-evidence를 실제 필요 범위만 적용해. 제품 구현 전에 완료 근거와 다음 설계에 필요한 사항을 알려줘.
```

## 2. Sol: 설계/전역 컨벤션만

```text
/home/user/exam-kit/.agents/skills/requirements-to-design/SKILL.md를 적용해 단계2만 실행해 줘. 확정 요구/현재 코드에서 최소 아키텍처·모듈 책임·API/데이터 입출력·오류/권한/저장 경계·의존성과 전역 컨벤션·검증 계획을 정리해. 기존 스택/계약을 우선하고 핵심 미정만 질문해. 제품 구현으로 넘어가지 말고 실제 결정/제안/미정과 다음 구현 준비 항목을 알려줘.
```

## 3. Sol: TODO/구현 준비/전달 지시만

```text
/home/user/exam-kit/.agents/skills/coordinate-workstreams/SKILL.md와 references/session-packets.md를 적용해 단계3만 실행해 줘. 설계/계약을 바탕으로 요구ID별 TODO·수정 소유 범위·정상/실패/경계 입력과 예상 결과·검증 방법을 정리해. Sol이 어려운 판단/계약/통합을 맡고 Terra에는 추가 판단이 적고 검증하기 쉬운 구현을 넘겨. 모든 테스트 코드의 선완성은 필요 없어. 실제 작업 경로·필요한 스킬·계약·TODO·검증·고유 인계를 채운 Terra 완성 블록과 Sol 독립 작업을 만들어 줘. 미정 정책에 의존하는 일은 발급하지 마. 지금 내 판단/직접 확인/어느 블록을 언제 전달할지도 알려줘. 아직 전달/착수했다고 기록하지 마.
```

## 4. Terra: Sol이 발급한 구현 블록

여기의 일반 안내를 구현 요청 대신 복사하지 않는다. Sol이 실제 과제의 단계3에서 발급한 **현재 Terra 블록 전체**를 해당 작업 경로의 Terra에 전달한다. 블록은 implement-and-verify/SKILL.md와 실제 TODO/계약/검증/쓰기 범위·고유 인계 경로를 포함해야 한다. 웹 과제에 필요한 경우에만 functional-web-delivery를 연결한다. 계약 안의 구현·테스트는 Terra 재량이며 계약/정책 변경은 Sol로 돌려준다. 완료 보고 경로를 Sol에 전달한다.

## 5. Sol: 구현 인계 후 통합/코드맵

```text
/home/user/exam-kit/.agents/skills/implement-and-verify/SKILL.md와 /home/user/exam-kit/.agents/skills/code-to-system-map/SKILL.md로 단계5를 진행해 줘. 실제 도착한 담당 인계와 현재 코드/계약을 대조해 통합하고 정상/실패/경계 및 출력 재읽기를 실제 검증해. 워커 소유 파일 수정은 담당자에게 지시하고 공유 파일은 통합 담당이 관리해. 실제 파일/심볼에 책임·API·데이터/권한·저장·의존성·실패 흐름을 표/필요한 Mermaid로 연결해. 확인 범위·실패·한계를 구분하고 준비되면 고정 기준에 맞는 별도 리뷰 블록을 발급해. 미완료를 완료로 쓰거나 같은 대화의 검토를 독립 리뷰로 부르지 마.
```

## 6. 별도 리뷰와 Sol 수용/수정

Sol이 단계5 이후 발급한 **현재 리뷰 블록 전체**를 별도 허용 모델 세션에 전달한다. review-and-explain/SKILL.md, 원문·고정 코드 상태·고유 보고/검증 경로와 제품 수정 금지가 포함돼야 한다. 별도 리뷰 보고가 실제로 도착한 다음 Sol에 아래 요청을 사용한다.

```text
/home/user/exam-kit/.agents/skills/review-and-explain/SKILL.md와 references/review-reception.md를 적용해 단계6 리뷰 수용을 진행해 줘. 실제 전달받은 리뷰 보고/재현을 원문·현재 코드와 대조해 채택/수정채택/거절/보류와 이유를 기록해. 보고가 아직 없으면 읽었다고 쓰지 말고 받을 경로를 안내해. 수정은 담당 소유자에게 구체적 지시로 넘기고 관련 재검증 후 변경 상태 기준으로 필요시 재리뷰해. 중요한 정책/범위 변경만 내 판단으로 올리고 영향 없는 작업은 이어가. 종료 시 완료/미완료와 다음 확인 조건을 알려줘.
```

## 7. Sol: 본인 확인 자료/최종 상태만

```text
/home/user/exam-kit/.agents/skills/review-and-explain/SKILL.md와 /home/user/exam-kit/.agents/skills/code-to-system-map/SKILL.md로 단계7 최종 확인 자료를 정리해 줘. 현재 코드·요구 추적·최종 실행 수치·인계·리뷰·선택/거절 기록을 맞추고 내가 실행할 입력/기대 결과와 따라 설명할 코드 흐름·한계·미완료를 알려줘. 새 제품 기능을 추가하지 말고 AI 실행과 내 직접 확인/이해는 분리해. 제출 확정과 AI/복사 금지 후속 답변은 내가 직접 하며 이 요청으로 외부 전송하지 마.
```

## 이어가기: 중간부터 재개

```text
/home/user/exam-kit/.agents/skills/task-triage/SKILL.md와 references/stage-execution.md를 적용해 현재 과제 문서·코드·실행 근거에서 마지막으로 확인된 단계와 다음 필요한 스킬을 찾아줘. 완료 단계를 재생성하지 말고 중단/변경된 부분부터 기존 허용 범위 안에서 이어가. 현재 요청이 단계 한정이면 그 범위 후 멈추고, 아니면 구현·검증·최종 확인 자료까지 진행해. 실제 사용자 판단이 필요한 부분만 대기하고 미확인/실패를 완료로 바꾸지 마.
```
