# Third-party notices

이 저장소는 외부 스킬 전체를 설치하지 않는다. 다음 세 문서의 제한된 발췌/재구성에 아래 저작권·허가 고지를 보존한다. 각 원문의 실행 도구·위임·출판 권한을 가져오는 것은 아니다.

## obra/superpowers

Repository: https://github.com/obra/superpowers

Pinned commit: `22f0b463e7a5e579904dd6211a520321035526f7`

Source: `skills/receiving-code-review/SKILL.md`

Local adaptation: `.agents/skills/review-and-explain/references/review-reception.md` — 기술적 검토 후 채택/거절 판단만 재구성. 전체 스킬·의무적 전체 중단·자동 에이전트·커밋 지침 제외.

```text
MIT License

Copyright (c) 2025 Jesse Vincent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## softaworks/agent-toolkit

Repository: https://github.com/softaworks/agent-toolkit

Pinned commit: `3027f20f3181758385a1bb8c022d4041dfb4de84`

Source: `skills/mermaid-diagrams/references/sequence-diagrams.md`

Local excerpt: `.agents/skills/code-to-system-map/references/mermaid-reference.md` — 기본 참여자 및 동기 요청/응답 코드 블록 두 개만 발췌. 외부 렌더링·MCP·설치 지시 제외.

```text
MIT License

Copyright (c) 2026 Leonardo Flores

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 검토만 한 자료

`vercel-labs/agent-skills` commit `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`의 React 성능/Web UI 스킬은 후보로 읽었으며 복사·번역·설치하지 않았다. React 스킬의 MIT 표기와 README MIT 표기는 확인했지만 이 검토에서는 별도 저작권 고지가 담긴 LICENSE를 확보하지 못했으므로 재배포 대상으로 선택하지 않았다. UI 가이드는 매 리뷰마다 원격 가이드 fetch를 요구하므로 오프라인 기본 경로에 채택하지 않았다.


## K-Dense-AI/scientific-agent-skills · 제한된 EDA 절차

Repository: https://github.com/K-Dense-AI/scientific-agent-skills

Pinned commit: `a25cf9ec00e2745d03f8704acf6f6919694ccd9a`

Source: `skills/exploratory-data-analysis/SKILL.md` (개별 license: MIT), root `LICENSE.md`.

Local adaptation: `.agents/skills/data-to-validated-dataset/references/bounded-eda.md` — 관측 단위/분석 범위·결측과0구분·변환/출처·누수 등 필요한 탐색 절차만 재구성. 원문 과학분야 전용 형식/실행 도구/의존성/설치 지시 제외.

```text
MIT License

Copyright (c) 2025 K-Dense Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

같은 저장소의 `skills/pymoo/SKILL.md`는 개별Apache-2.0 표기를 확인해 검토만 했고 복사/번역/설치하지 않았다. `magnus919/agent-skills` data-scientist도 MIT 원문/범위 검토만 했고 재배포하지 않았다. 정확한 커밋과 결정은 `.agents/skills/task-triage/references/data-operations-sources.md`에 기록했다.
