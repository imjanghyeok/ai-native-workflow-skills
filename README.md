# AI Native Workflow Skills

README 기반 과제를 파악하고, 요구사항·설계·코드·검증 근거를 연결하기 위한 한국어 Codex 스킬 묶음입니다. 특정 언어·프레임워크·MCP·외부 모델을 필수로 사용하지 않습니다.

## 포함된 스킬

| 순서 | 스킬 | 용도 | 기본 산출물 |
| --- | --- | --- | --- |
| 1 | `readme-to-requirements` | README·관련 자료 분석, 필수 조건·출처·완료 기준·가정·질문 정리 | `docs/requirements.md` |
| 2 | `requirements-to-design` | 최소 설계, 필요한 Mermaid 다이어그램, 자료구조·알고리즘 선택, 검증 계획·구현 순서 | `docs/design.md` |
| 3 | `implement-and-verify` | 프로젝트 컨벤션에 맞춘 구현, 실제 실행·검증, 설명 근거와 한계 기록 | 코드와 `docs/verification.md` |

기존 문서와 제출 양식이 있으면 해당 위치·형식을 우선합니다. 분석만 요청했으면 구현까지 진행하지 않고, 구현까지 요청했다면 불필요한 승인 대기 없이 요청 범위에서 이어갑니다.

## 시험 환경에서 clone해서 사용하기

시험 내 스킬 반입·공개 자료 사용이 허용되는지 먼저 확인하세요. 공개 개인 MCP 설정 반입 허용이 범용 스킬 묶음 전체의 반입 허용을 자동으로 의미하지는 않습니다. 실제 응시 안내와 제공 도구 제한을 따릅니다.

### 1. 응시 화면 안에서 가져오기

개인 PC 파일 업로드 대신, 허용된 경우 **응시 환경의 터미널과 제공 AI**로 가져옵니다.

```sh
git clone --depth 1 -- https://github.com/imjanghyeok/ai-native-workflow-skills.git /home/user/exam-kit
git -C /home/user/exam-kit rev-parse HEAD
ls -a /home/user/exam-kit/.agents/skills
```

`/home/user/exam-kit`은 가져온 스킬을 두는 예시 위치이며 과제 폴더와 구분합니다. 이미 그 폴더가 있다면 내용을 확인하고 다른 빈 경로를 사용하세요. 기존 과제·설정·파일을 삭제하거나 덮어쓰지 않습니다. 가져온 커밋 ID를 남겨 어떤 준비물을 사용했는지 확인할 수 있게 합니다.

제공 AI에게 요청할 예:

```text
공개 저장소 https://github.com/imjanghyeok/ai-native-workflow-skills.git 를
/home/user/exam-kit 에 clone해 줘. 폴더가 이미 있으면 덮어쓰지 말고 상태를 알려줘.
가져온 README와 스킬 목록을 확인하고 커밋 ID를 알려줘.
과제 파일·AGENTS.md·Codex 설정 전체는 변경하지 마.
```

### 2. 설치 없이 파일 경로로 적용하기

자동 스킬 인식 여부가 불확실할 때 사용할 수 있습니다. 다음 요청은 **스킬 파일을 읽어 그 절차를 적용하는 방식**이며, 스킬 선택기에 설치하는 작업과는 다릅니다.

```text
/home/user/exam-kit/.agents/skills/readme-to-requirements/SKILL.md를 읽고
그 절차를 현재 과제 README와 관련 자료에 적용해 줘.
현재 과제 폴더를 기준으로 필수 요구사항·출처·완료 기준·미정 사항을 정리해 줘.
이번 요청은 분석까지이고 제품 코드는 아직 수정하지 마.
```

설계로 이어갈 때:

```text
/home/user/exam-kit/.agents/skills/requirements-to-design/SKILL.md를 읽어 줘.
원본 README와 정리된 요구사항을 바탕으로 최소 설계와 필요한 Mermaid 그림,
자료구조 선택 이유, 검증 계획, 구현 순서를 현재 과제의 문서 위치에 정리해 줘.
기존 문서가 있으면 먼저 읽고 그 역할에 맞게 보완해 줘.
```

개발을 시작할 때:

```text
/home/user/exam-kit/.agents/skills/implement-and-verify/SKILL.md를 읽어 줘.
과제 README·요구사항·설계를 따라 필수 흐름부터 구현해 줘.
먼저 프로젝트 지침·컨벤션·도구 설정·주변 코드를 확인해 그 규칙을 따라 줘.
필요한 검증을 실제 실행하고 결과와 미확인 범위를 남겨 줘.
```

스킬에서 상대 경로로 연결한 `references/` 문서는 해당 스킬 폴더를 기준으로 읽습니다. 과제의 산출물은 clone한 스킬 폴더가 아니라 **실제 과제 폴더**에 작성합니다.

### 3. Codex 스킬 목록에서 사용하고 싶다면

일반 Codex는 현재 작업 위치부터 저장소 루트까지 `.agents/skills`를 검색합니다. 과제 옆의 다른 폴더에 clone하는 것만으로 과제에서 자동 발견되는 것은 아닙니다.

환경에서 허용하면 제공 AI에게 다음처럼 요청하세요.

```text
가져온 스킬을 현재 과제에서 사용할 수 있는지 확인해 줘.
현재 작업 경로와 기존 .agents/skills 및 동명 스킬을 먼저 확인하고,
필요한 스킬 폴더만 작업 범위에 맞춰 추가해 줘.
기존 스킬·AGENTS.md·Codex 설정 전체를 덮어쓰지 마.
```

스킬이 인식되면 `/skills` 또는 `$`로 선택해 사용할 수 있습니다.

```text
$readme-to-requirements 현재 과제 README를 분석하고 요구사항을 정리해 줘.
$requirements-to-design 정리된 요구사항의 최소 설계와 다이어그램을 만들어 줘.
$implement-and-verify 설계와 기존 컨벤션을 따라 구현하고 실제 검증 근거를 남겨 줘.
```

제공 Codex 버전에 따라 지원·인식 방식이 다르면 앞의 파일 경로 방식으로 절차를 읽히거나 Helper에 환경 사용법을 확인하세요. 공식 문서: [Codex Skills](https://developers.openai.com/codex/skills).

## 개발 시 함께 사용하는 가이드

- [컨벤션 발견·적용](.agents/skills/implement-and-verify/references/conventions.md): AGENTS·도구 설정·기존 구현을 근거로 코드 작성.
- [자료구조·알고리즘 선택](.agents/skills/requirements-to-design/references/algorithm-choice.md): 입력 크기·업무 규칙·비용·경계 사례에 맞는 선택.
- [작업별 문법 레시피 준비](.agents/skills/implement-and-verify/references/language-recipes.md): 실제 언어·버전에서 작은 예제로 문법 확인. 언어별 완성 코드 모음은 아닙니다.
- [AGENTS 지침 조각](templates/AGENTS.fragment.md): 기존 지침과 대조해 필요한 항목만 병합하거나 직접 읽힐 수 있는 예시. 자동 활성화되지 않습니다.

## 공개 범위와 사용 경계

이 저장소에는 범용 스킬·가이드·지침 템플릿만 포함합니다. 실제 시험 문제·답안·제출물·DM·개인 실행 기록·인증값·MCP 접속 설정은 포함하지 않습니다. 외부 모델 연결과 자동 브라우저 조작을 설정하지 않습니다.

시험 자료나 작업 결과를 이 공개 저장소로 push하지 마세요. 가져온 스킬이 제출 대상인지도 실제 안내에서 확인하세요. 공개 유지 기간이 지정된 경우 해당 기간 동안 저장소의 공개 상태와 사용한 커밋을 유지합니다.

산출물·테스트 결과는 실제 수행한 범위로 기록하고, 계획과 실행 사실을 구분합니다. 이 묶음은 공식 시험 자료나 공식 정답이 아닙니다.
