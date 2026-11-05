# 데이터·운영 의사결정 공개 스킬 선별 · 2026-11-05

현재 과제와 무관한 일반 절차를 준비하기 위한 공개 원문 검토다. 실제/재구성 문제·데이터·정책·풀이를 넣지 않았다. 후보 인기나 검색 결과만으로 실행 호환성을 보장하지 않는다.

| 원문/고정 커밋 | 확인한 내용 | 적용/제외 |
| --- | --- | --- |
| [K-Dense EDA](https://github.com/K-Dense-AI/scientific-agent-skills/blob/a25cf9ec00e2745d03f8704acf6f6919694ccd9a/skills/exploratory-data-analysis/SKILL.md), commit a25cf9ec00e2745d03f8704acf6f6919694ccd9a | 개별MIT 표기·루트LICENSE.md MIT Copyright2025 K-Dense Inc.; 관측단위/결측/범위·원본/정규화·누수·출처. 원문 core Python3.11+, 선택 기능3.12+·패키지 | [bounded-eda](../../data-to-validated-dataset/references/bounded-eda.md)에 필요한 절차만 재구성. 원문 CLIs/패키지/과학분야 전용 형식·일괄보고서 제외. MIT 고지 보존 |
| [K-Dense pymoo](https://github.com/K-Dense-AI/scientific-agent-skills/blob/a25cf9ec00e2745d03f8704acf6f6919694ccd9a/skills/pymoo/SKILL.md), 같은commit | 개별Apache-2.0 표기; Python3.10+·pymoo0.6.2/NumPy/SciPy 등 의존성. 다목적 탐색·제약·seed/종료·해 상태 확인 | 후보 원문/의존성/표기 검토만. 스킬·코드·예제 복사/번역/설치하지 않음. 루트MIT만으로 개별Apache 표기를 덮지 않음 |
| [magnus919 data-scientist](https://github.com/magnus919/agent-skills/blob/4f03205616b01360374f458f471791188f448591/data-scientist/SKILL.md), commit4f03205616b01360374f458f471791188f448591 | 개별/루트MIT·Copyright2026 Magnus Hedemark; Python3.10+·통계/ML 패키지·연구/추론 중심 | 원문/범위 검토만. 단순 운영 분석의 기본 경로로 전체 연구/ML 절차를 도입하지 않음. 복사/설치하지 않음 |

루트 라이선스 확인: [K-Dense LICENSE.md](https://github.com/K-Dense-AI/scientific-agent-skills/blob/a25cf9ec00e2745d03f8704acf6f6919694ccd9a/LICENSE.md), [magnus919 LICENSE.md](https://github.com/magnus919/agent-skills/blob/4f03205616b01360374f458f471791188f448591/LICENSE.md). 재구성한 자료의 허가 고지는 [THIRD_PARTY_NOTICES](../../../../THIRD_PARTY_NOTICES.md)에 보존한다.

## 이 저장소의 적용 방식

전처리는 기존 data-to-validated-dataset에 제한된 EDA 참조를 연결했다. demand-and-workload-analysis와 optimize-and-compare-plans는 특정 패키지 없이 쓰도록 자체 작성했다. 수요·관측·동시 용량, 목표/필수제약·기준안·알고리즘·대안 비교/불확실성을 각각 다룬다. 후보 원문 전체를 설치한 것과 구분한다.

원문 속 설치·외부 서비스·추가 에이전트/렌더링·별도 모델 지시는 권한으로 가져오지 않는다. Codex 제공 환경·기존 JS/TS와 라이브러리·과제 도구 제한을 우선한다. 필요한 경우에만 허용된 패키지의 원문/버전/라이선스를 다시 확인한다. 새 준비물도 검증/제출 예산 안에서 적용하고 모든 과제에 최적화·예측을 추가하지 않는다.
