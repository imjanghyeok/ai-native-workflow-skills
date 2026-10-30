# 공개 스킬 자료 선별 목록

2026-10-31에 아래 원문을 확인했다. **Codex 기준 목록이며, 외부 코드를 이 저장소에 복사하거나 외부 스킬을 설치한 목록이 아니다.** 현재 시험용 기본 묶음은 자체 스킬과 자체 JS 시작본이다. 추가 자료가 실제로 필요할 때만 허용된 경로로 읽고 도구·스크립트·라이선스를 확인한다.

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
