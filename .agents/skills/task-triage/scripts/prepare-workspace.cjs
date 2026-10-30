'use strict';
const fs = require('node:fs');
const path = require('node:path');

const WORKFLOW = `# 요청·판단·실행 기록 사용법

## 파일은 AI가 준비하고 관리

사용자가 탐색기로 파일을 직접 만들거나 옮길 필요가 없다. Codex가 실제 과제 지침과 권한 범위에서 폴더 생성·코드 작성·이동·필요한 삭제를 수행할 수 있다. 원본 데이터·사용자 변경·기존 계약은 보존하며 플랫폼 제한은 우회하지 않는다. 기존 README·AGENTS.md는 이 도구가 덮어쓰지 않는다.

## 기록 구조

- docs/requirements.md, design.md, decisions.md, verification.md: 요청 범위에 맞게 AI가 보완한다. 미작성은 완료 증거가 아니다.
- worklog/events.jsonl: 요청/계획/판단/기대/관찰/검증 실행의 append-only 이벤트.
- worklog/requests/: 전달된 요청 원문. 기록 경로·해시와 requestId로 연결한다.
- worklog/runs/: 명령과 Codex 실행별 stdout/stderr/result.json. 내용은 이 작업 공간 안에만 둔다.
- tools/worklog.cjs: 추가 패키지 없는 로컬 기록기. Node 18+ 전제.

기록은 공개 저장소로 push·업로드하지 않는다. 토큰·비밀번호·개인 접속 링크를 입력하지 않는다. 플랫폼의 공식 작업 기록을 대체하거나 완전하게 복제하는 도구는 아니다.

## 일반 Codex 대화를 유지할 때

Codex에게 ‘각 요청을 시작할 때 요청 원문을 worklog에 기록하고 requestId에 계획·선택 이유·예상 결과·실제 결과·근거·한계를 연결해 줘’라고 지시한다. 이것은 AI가 기록하는 방식이며 사용자의 모든 키 입력을 독립적으로 자동 수집하는 기능은 아니다. 요청 원문을 파일로 전달했다면 아래처럼 기록할 수 있다.

    node tools/worklog.cjs request --file request.txt

## 원문을 먼저 저장한 뒤 Codex로 보낼 때

    node tools/worklog.cjs chat

요청을 여러 줄 입력하고 /send로 전송한다. /exit로 종료한다. 하네스는 요청을 먼저 저장하고 제공 codex exec --json으로 전달한다. 다음 요청은 반환된 세션 ID로 이어간다. 재시작 시 --resume 실제세션ID를 지정할 수 있다. 보내지 않은 초안도 unsent로 구분한다. 한 번만 보낼 때는 ask --file request.txt 또는 ask에 stdin으로 전달한다.

현재 CLI가 exec/resume/--json을 지원하고 실제 시험에서 이런 사용이 허용되는지 먼저 확인한다. 지원하지 않으면 일반 제공 Codex와 AI 기록 방식을 쓴다. 이 도구는 모델·계정·MCP·Codex 버전을 바꾸거나 별도 AI API에 연결하지 않는다. 기본 권한은 CLI 설정을 따른다. 작업 쓰기가 허용된 환경에서 지원된다면 chat/ask에 --workspace-write를 명시할 수 있지만 관리 정책을 우회하지 않는다. 승인 입력이 필요한 환경이면 일반 대화로 돌아간다.

## 이유와 결과 기록

    node tools/worklog.cjs note --request REQUEST_ID --actor ai --type decision

stdin으로 JSON을 전달한다. 필수 summary와 선택 reason, alternatives, expected, actual, evidence, limits 등을 사용한다. type은 plan/decision/expectation/observation/reflection/handoff 중 선택한다. --actor user는 본인이 직접 남긴 생각, ai는 AI의 설명/정리다. AI의 판단을 사용자의 직접 판단으로 쓰지 않는다. 자유로운 내부 사고를 추정해 채우는 대신 선택·이유·대안·근거·불확실성을 짧게 기록한다.

    {"summary":"날짜·설비별로 먼저 집계","reason":"배치와 알람의 직접 결합은 수량 증식 위험","alternatives":["원시 행 직접 결합"],"expected":"생산 합계 보존","evidence":["README R-05"],"limits":["아직 실행 전"]}

## 검증 명령 기록

    node tools/worklog.cjs run --request REQUEST_ID -- node --test app/test.cjs

인자를 shell 없이 실행하고 종료 상태·출력 파일을 기록한다. 실패를 성공으로 바꾸지 않는다. 실제 주장과 기대값·관찰값은 note로 연결한다. 로그가 있다는 사실만으로 주장이 맞거나 본인이 이해했다고 입증되지는 않는다. 기록 실패는 오류로 다루고 기록했다고 보고하지 않는다.

run은 방화벽/샌드박스가 아니다. git push와 일부 gh 쓰기를 거절하지만 임의 코드의 외부 전송을 기술적으로 모두 차단하지 못한다. 시험의 push·외부 전송·업데이트·Computer Use 금지를 계속 지킨다. chat은 이 하네스를 거친 요청만 기록하며 일반 TUI·다른 세션·브라우저의 입력은 수집하지 않는다. 사용자에게 공개된 명령·메시지 이벤트만 보관하고 reasoning 항목은 제외한다.
`;

function safe(root, relative) {
  let current = root;
  const parts = relative.split('/');
  for (const [index, component] of parts.entries()) {
    current = path.join(current, component);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error(`symlink collision: ${relative}`);
    if (index < parts.length - 1 && fs.existsSync(current) && !fs.statSync(current).isDirectory()) throw new Error(`directory collision: ${relative}`);
  }
  return current;
}

function prepare(target, starter = 'none') {
  if (!['none', 'js'].includes(starter)) throw new Error('--starter must be none or js');
  const root = path.resolve(target);
  const kit = path.resolve(__dirname, '../../../..');
  if (root === kit || root.startsWith(kit + path.sep)) throw new Error('target must be outside the skill repository');
  if (fs.existsSync(root) && (fs.lstatSync(root).isSymbolicLink() || !fs.statSync(root).isDirectory())) throw new Error('target must be a normal directory');
  const files = new Map([
    ['docs/requirements.md', '# 요구사항\n\n미작성. 원문 출처·완료 기준·확정/가정/미정을 기록하세요.\n'],
    ['docs/design.md', '# 설계\n\n미작성. 책임·입출력·선택 이유·검증 계획을 기록하세요.\n'],
    ['docs/decisions.md', '# 선택과 이유\n\n미작성. requestId·선택·이유·대안·근거·한계와 user/ai 작성 주체를 구분하세요.\n'],
    ['docs/verification.md', '# 실제 검증\n\n미실행. requestId·명령·입력·기대값·관찰값·종료 상태·미확인을 연결하세요.\n'],
    ['docs/WORKFLOW.md', WORKFLOW],
    ['worklog/README.md', '# 로컬 작업 기록\n\n이 폴더는 실제 요청·실행·판단 요약을 저장합니다. 공개 저장소로 push/외부 전송하지 마세요.\n'],
    ['tools/worklog.cjs', fs.readFileSync(path.resolve(__dirname, '../assets/workspace-tools/worklog.cjs'), 'utf8')],
  ]);
  if (starter === 'js') {
    const source = path.resolve(__dirname, '../../implement-and-verify/assets/js-starter');
    for (const name of fs.readdirSync(source)) files.set(`app/${name}`, fs.readFileSync(path.join(source, name), 'utf8'));
  }
  const additions = [];
  const preserved = [];
  for (const [relative, content] of files) {
    const destination = safe(root, relative);
    if (fs.existsSync(destination)) {
      if (!fs.statSync(destination).isFile()) throw new Error(`file collision: ${relative}`);
      const equal = fs.readFileSync(destination, 'utf8') === content;
      if ((relative.startsWith('app/') || relative === 'tools/worklog.cjs') && !equal) throw new Error(`preserve existing code; merge with Codex: ${relative}`);
      preserved.push(relative);
    } else additions.push([relative, content]);
  }
  const dirs = ['data/raw', 'data/processed', 'worklog/requests', 'worklog/runs', 'worklog/handoffs'];
  for (const dir of dirs) {
    const destination = safe(root, dir);
    if (fs.existsSync(destination) && !fs.statSync(destination).isDirectory()) throw new Error(`directory collision: ${dir}`);
  }
  fs.mkdirSync(root, { recursive: true });
  for (const dir of dirs) fs.mkdirSync(path.join(root, dir), { recursive: true });
  for (const [relative, content] of additions) {
    const destination = path.join(root, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, { flag: 'wx' });
  }
  return { target: root, starter, created: additions.map(([relative]) => relative), preserved };
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const targetAt = args.indexOf('--target');
    const starterAt = args.indexOf('--starter');
    if (targetAt < 0 || !args[targetAt + 1]) throw new Error('usage: prepare-workspace.cjs --target PATH [--starter none|js]');
    console.log(JSON.stringify(prepare(args[targetAt + 1], starterAt < 0 ? 'none' : args[starterAt + 1]), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}
module.exports = { prepare };
