'use strict';
const form = document.getElementById('form');
const button = document.getElementById('run');
const status = document.getElementById('status');
const result = document.getElementById('result');

form.addEventListener('submit', async event => {
  event.preventDefault();
  button.disabled = true;
  status.textContent = '처리 중';
  result.textContent = '';
  try {
    const input = JSON.parse(document.getElementById('input').value);
    const response = await fetch('/api/analyze', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    result.textContent = JSON.stringify(data, null, 2);
    status.textContent = '처리 완료';
  } catch (error) {
    status.textContent = '처리 실패';
    result.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
