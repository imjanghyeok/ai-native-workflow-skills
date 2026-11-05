# 공개 스킬 자료 선별 목록

## 2026-11-04 · 실제 파일과 고정 커밋 검토

| 저장소·고정 커밋·확인 파일 | 채택 범위 | 제외/조건·라이선스 |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7), `skills/receiving-code-review/SKILL.md`, `requesting-code-review/SKILL.md`, `dispatching-parallel-agents/SKILL.md`, `LICENSE` | 리뷰 제안의 현재 코드 적합성 확인·기술적 채택/거절 기준만 한국어 재구성 → [review-reception](../../review-and-explain/references/review-reception.md) | MIT, Copyright 2025 Jesse Vincent 고지 보존. 자동 위임·의무 전체 중단·커밋/게시·무거운 계획 실행은 가져오지 않음. 일감 분리는 현재 사용자 요구에 맞춘 자체 설계이며 원문 전체 설치 아님. |
| [softaworks/agent-toolkit](https://github.com/softaworks/agent-toolkit/tree/3027f20f3181758385a1bb8c022d4041dfb4de84), `skills/mermaid-diagrams/SKILL.md`, `references/sequence-diagrams.md`, `LICENSE` | 기본 참여자·동기 요청/응답 코드 블록 두 개만 [mermaid-reference](../../code-to-system-map/references/mermaid-reference.md)에 발췌 | MIT, Copyright 2026 Leonardo Flores 고지 보존. 전체 스킬/예제 도메인·외부 Mermaid 편집기·전역 CLI 설치를 가져오지 않음. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62), `README.md`, `skills/react-best-practices/SKILL.md`, `skills/web-design-guidelines/SKILL.md` | React/Next 성능과 웹 UI 리뷰 후보 검토만 수행, 복사/번역/설치 없음 | React 스킬/README의 MIT 표기는 확인. 별도 저작권 LICENSE 확보는 못 했으므로 반입 대상으로 선택하지 않음. 원격 가이드 매번 fetch·프레임워크별 대규모 성능 규칙은 기본 기능 UI에 불필요. 실제 React 성능 문제가 있을 때만 필요한 원문 확인. |

이 묶음의 일감·판단·시스템 지도·기능 웹은 자체 작성했고, 위 두 한정 문서만 발췌/재구성했다. **원문 설치 지침이나 도구 권한을 따르는 것이 아니라 출처 자료로 검토했다.** 전체 허가/저작권 문구와 변경 범위는 [THIRD_PARTY_NOTICES](../../../../THIRD_PARTY_NOTICES.md)에 있다. 고정 커밋은 검토 상태를 식별하며 최신 버전이나 모든 전이 의존성까지 보증하지 않는다.

외부 프런트 템플릿/컴포넌트도 사용할 수는 있지만 필요 파일·스택·번들/도구·라이선스·네트워크·수정 범위를 먼저 확인한다. 현재는 기본 HTML 요소/기존 UI로 충분한 기능 경로를 자체 가이드로 두며 외부 UI 코드·완성 앱을 배포하지 않는다. 필요한 일부만 가져오는 방식이 맞지만 문맥/참조/고지를 잘라 잃거나 정책이 다른 전체 스킬을 자동 적용하지 않는다.

## 2026-10-31 · 당시 후보 검토 이력

아래 2026-11-04 선별은 필요한 부분만 반영한 최신 목록이다. 외부 스킬 전체·런처·패키지를 설치하지 않았다. 그 아래 2026-10-31 목록은 당시 검토 이력이며 최신 채택 목록과 구분한다. 추가 자료가 실제로 필요할 때만 허용된 경로로 읽고 도구·스크립트·라이선스를 확인한다.

| 원문 | 확인한 내용·사용 판단 |
| --- | --- |
| [OpenAI Plugins](https://github.com/openai/plugins) | 현재 공식 플러그인 예제. [build-web-apps 안내](https://github.com/openai/plugins/blob/main/plugins/build-web-apps/README.md)에 프런트엔드·React 관련 항목이 있다. 외부 서비스/도구 의존성과 개별 라이선스를 확인하기 전 일괄 설치하지 않는다. 후보 안내만 검토했고 개별 스킬 호환성·라이선스를 전부 검증하지 않았다. |
| [과거 OpenAI Skills](https://github.com/openai/skills) | 현재 README가 deprecated로 표시하고 Plugins 저장소로 안내한다. 예전 설치 글만 보고 현행 기본 준비물로 삼지 않는다. |
| [React Best Practices 예제](https://github.com/openai/plugins/blob/main/plugins/build-web-apps/skills/react-best-practices/SKILL.md) | React/Next.js가 실제 프로젝트일 때 참고할 후보. 원문과 관련 rules/ 경로를 확인했으며 스킬·규칙 코드를 복사/설치하지 않았다. 개별 라이선스·버전 호환성은 전부 검증하지 않았으므로 자동 반입 대상으로 삼지 않는다. |
| [Frontend App Builder 예제](https://github.com/openai/plugins/blob/main/plugins/build-web-apps/skills/frontend-app-builder/SKILL.md) | 원문에 이미지 생성·브라우저 검증 등의 도구 요구가 있어 현재 가벼운 시험 기본 경로에는 채택하지 않는다. 공식 예제라는 이유만으로 실제 시험 환경에 그대로 적용할 수 있는 것은 아니다. |
| [공식 Build skills](https://learn.chatgpt.com/docs/build-skills) | 스킬은 필요한 지침과 참조를 선택적으로 읽는 방식이다. 많은 스킬을 모두 읽히는 대신 관련 절차만 적용한다. |

## 다른 저장소를 발견했을 때

별도 AI 호출·브라우저 자동 조작·MCP/계정·설치 스크립트가 필요한지, 입력을 외부에 보내는지, 라이선스가 복사/수정/재배포를 허용하는지 실제 파일로 확인한다. README 링크만으로 검증 완료라고 쓰지 않는다. 사용하기로 했다면 정확한 경로와 커밋을 남기고 필요한 참조 파일·라이선스도 함께 취급한다. 실제 시험 문제·결과를 공개 저장소로 올리지 않는다.

시험 중에는 새 저장소를 많이 찾고 설정하는 것보다 이미 준비한 한 묶음과 기존 프로젝트를 활용하는 쪽을 우선한다. 공개 자료 반입 허용 범위는 실제 안내를 따른다.

## 데이터·운영안 분석 추가 선별

[2026-11-05 데이터/최적화 스킬 검토](data-operations-sources.md)에서3개 후보의 원문·라이선스·의존성·고정커밋과 채택/제외를 기록했다. EDA의 필요한 절차만 MIT 고지를 보존해 적용했고, 패키지 의존 최적화/연구 스킬은 전체 설치하지 않았다. 수요·운영안 비교는 제공 환경에 맞춘 자체 스킬로 연결한다.
