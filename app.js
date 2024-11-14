async function toggleLove(button) {
  const skillName = button.closest('.grid-item').querySelector('h3').textContent;
  const countSpan = button.querySelector('.love-count');
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains('loved')) {
    count -= 1;
    await fetch(`/api/love/${skillName}`, { method: 'POST', body: JSON.stringify({ increment: -1 }) });
  } else {
    count += 1;
    await fetch(`/api/love/${skillName}`, { method: 'POST', body: JSON.stringify({ increment: 1 }) });
  }

  countSpan.textContent = count;
  button.classList.toggle('loved');
}

// Load counts from backend on page load
document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('.grid-item').forEach(async item => {
    const skillName = item.querySelector('h3').textContent;
    const response = await fetch(`/api/love/${skillName}/count`);
    const data = await response.json();
    item.querySelector('.love-count').textContent = data.count;

    if (data.count > 0) {
      item.querySelector('.love-button').classList.add('loved');
    }
  });
});