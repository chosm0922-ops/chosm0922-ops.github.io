// ==========================================================================
// 가나다의 소개 웹사이트 스크립트 (script.js)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. 테마 토글 (다크 / 라이트 모드)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // 저장된 테마 또는 시스템 설정 테마 확인
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  }

  // 테마 전환 이벤트 핸들러
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);

    // 버튼 클릭 시 회전 효과
    themeToggleBtn.style.transform = 'rotate(180deg) scale(1.1)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });

  // 2. 파티클 이펙트 생성 함수
  const particleContainer = document.getElementById('particle-container');

  function spawnParticles(x, y, emojiList, count = 8) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${Math.floor(Math.random() * 16 + 20)}px`;

      // 무작위 이동 방향 (거리 및 각도)
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const distance = Math.floor(Math.random() * 80 + 70);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      particleContainer.appendChild(particle);

      // 애니메이션 완료 후 파티클 엘리먼트 제거
      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  }

  // 3. 메인 이모지 (😎) 클릭 인터랙션
  const mainEmoji = document.getElementById('main-emoji');
  if (mainEmoji) {
    mainEmoji.addEventListener('click', (e) => {
      const rect = mainEmoji.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      spawnParticles(centerX, centerY, ['😎', '✨', '🌟', '🕶️', '⚡'], 10);

      // 통통 튀는 애니메이션
      mainEmoji.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      mainEmoji.style.transform = 'scale(1.3) rotate(15deg)';
      setTimeout(() => {
        mainEmoji.style.transform = '';
      }, 200);
    });
  }

  // 4. 쿨 에너지 충전 버튼 (#party-btn) 클릭
  const partyBtn = document.getElementById('party-btn');
  if (partyBtn) {
    partyBtn.addEventListener('click', (e) => {
      const rect = partyBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      spawnParticles(centerX, centerY, ['😎', '🔥', '💖', '✨', '🌈'], 12);

      partyBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        partyBtn.style.transform = '';
      }, 150);
    });
  }

  // 5. 축구 슛 인터랙션 (#kick-btn)
  const kickBtn = document.getElementById('kick-btn');
  const scoreCounter = document.getElementById('score-counter');
  let score = 0;

  if (kickBtn && scoreCounter) {
    kickBtn.addEventListener('click', (e) => {
      score += 1;
      const scoreStrong = scoreCounter.querySelector('strong');
      if (scoreStrong) {
        scoreStrong.textContent = score;
      }

      const rect = kickBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 축구공 슛 파티클
      spawnParticles(centerX, centerY, ['⚽', '🥅', '🔥', '🎉', '🏆'], 10);

      // 버튼 피드백 애니메이션
      kickBtn.style.transform = 'scale(1.08) rotate(-3deg)';
      setTimeout(() => {
        kickBtn.style.transform = '';
      }, 180);

      // 점수 카운터 강조 애니메이션
      scoreCounter.style.transition = 'transform 0.2s ease, color 0.2s ease';
      scoreCounter.style.transform = 'scale(1.2)';
      setTimeout(() => {
        scoreCounter.style.transform = 'scale(1)';
      }, 200);
    });
  }
});
