// 1. ПЕРЕМЕННЫЕ (Брусок и Таймеры)
let rotationTimer; 
let heroCube = document.getElementById('hero-cube');
let sides = heroCube.querySelectorAll('.side');
let step = 0;
let isHeroActive = true; 

// 2. ПЕРЕМЕННЫЕ (Плавность скролла)
let currentScroll = 0;   
let targetScroll = 0;    
const ease = 0.08; 
const viewport = document.querySelector('.cube-viewport');

// --- ФУНКЦИИ ВРАЩЕНИЯ (Твои проверенные) ---

function startInfiniteLoop() {
    clearTimeout(rotationTimer);
    rotationTimer = setTimeout(() => {
        performRotation(); 
        rotationTimer = setTimeout(() => {
            performRotation(); 
            rotationTimer = setTimeout(() => {
                performRotation(); 
                rotationTimer = setTimeout(() => {
                    performRotation(); 
                    resetCubePosition();
                }, 1500);
            }, 13000); // Твоя пауза 13с
        }, 1500);
    }, 1500);
}

function performRotation() {
    step++;
    heroCube.style.transform = `rotateX(${step * -90}deg)`;
    const currentIndex = step % 4;
    sides.forEach((side, index) => {
        side.classList.toggle('active-side', index === currentIndex);
    });
}

function resetCubePosition() {
    heroCube.style.transition = 'none';
    step = 0;
    heroCube.style.transform = `rotateX(0deg)`;
    setTimeout(() => {
        heroCube.style.transition = 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
        startInfiniteLoop();
    }, 50);
}

// --- ГЛАВНЫЙ ЦИКЛ АНИМАЦИИ (Скролл + Меню + Брусок) ---

function updateLogoAnimation() {
    currentScroll += (targetScroll - currentScroll) * ease;
    const vh = window.innerHeight;

    // 1. Прогресс для первого слайда (перелет в угол)
    let progress = currentScroll / (vh - 100);
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;

    // Расчет координат перелета (как мы делали вчера)
    const moveX = (40 - window.innerWidth / 2) * progress;
    const moveY = (40 - window.innerHeight / 2) * progress;
    const currentScale = 1 + (0.18 - 1) * progress;

    if (viewport) {
        viewport.style.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(${currentScale})`;
    }

    // Третий слайд должен активироваться, когда мы прокрутили больше 1.5 экранов
if (currentScroll > (window.innerHeight * 1.5)) {
  document.getElementById('slide-3').classList.add('active');
}


    // 2. Логика ОСТАНОВКИ вращения
    if (progress > 0.05 && isHeroActive) {
        isHeroActive = false;
        clearTimeout(rotationTimer);
        if (step % 2 !== 0) performRotation(); 
    } else if (progress < 0.05 && !isHeroActive) {
        isHeroActive = true;
        startInfiniteLoop();
    }

    // 3. Управление МЕНЮ (съезжается к центру)
    const leftGroup = document.querySelector('.nav-group-left');
    const rightGroup = document.querySelector('.nav-group-right');
    const maxOffset = (window.innerWidth / 2) - 200; 
    const menuOffset = maxOffset * (1 - progress);

    if (leftGroup) leftGroup.style.transform = `translate3d(${-menuOffset}px, 0, 0)`;
    if (rightGroup) rightGroup.style.transform = `translate3d(${menuOffset}px, 0, 0)`;

    // 4. Активация текстов на 2 и 3 слайдах
    const s2 = document.getElementById('slide-2');
    const s3 = document.getElementById('slide-3');
    
    if (currentScroll > vh * 0.5) s2?.classList.add('active');
    else s2?.classList.remove('active');

    if (currentScroll > vh * 1.5) s3?.classList.add('active');
    else s3?.classList.remove('active');

    requestAnimationFrame(updateLogoAnimation);
}

// СЛУШАТЕЛЬ СКРОЛЛА
window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
}, { passive: true });

// ЗАПУСК
startInfiniteLoop();
requestAnimationFrame(updateLogoAnimation);


function updateLogoAnimation() {
  // 1. Плавный расчет скролла
  currentScroll += (targetScroll - currentScroll) * ease;
  const vh = window.innerHeight;

  // 2. Прогресс-бар (если он есть в HTML)
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const totalProgress = currentScroll / totalHeight;
      progressBar.style.transform = `scaleX(${totalProgress})`;
  }

  // 3. Логика раскрытия слайдов (Reveal)
  const s2 = document.getElementById('slide-2');
  const s3 = document.getElementById('slide-3');
  
  if (currentScroll > vh) {
      const s2Offset = currentScroll - vh; 
      if (s2) s2.style.transform = `translate3d(0, ${-s2Offset}px, 0)`;
  } else {
      if (s2) s2.style.transform = `translate3d(0, 0, 0)`;
  }

  // 4. Активация и Параллакс текстов
  const t2 = s2?.querySelector('.reveal-text');
  const t3 = s3?.querySelector('.reveal-text');

  if (currentScroll > vh * 0.5) {
      s2?.classList.add('active');
      // ПАРАЛЛАКС для 2 слайда: текст чуть отстает от шторки
      if (t2 && currentScroll > vh) {
          let p2 = (currentScroll - vh) * 0.4;
          t2.style.transform = `translate3d(0, ${p2}px, 0)`;
      }
  } else {
      s2?.classList.remove('active');
      if (t2) t2.style.transform = `translate3d(0, 0, 0)`;
  }

  if (currentScroll > vh * 1.5) {
      s3?.classList.add('active');
      // ПАРАЛЛАКС для 3 слайда
      if (t3 && currentScroll > vh * 2) {
          let p3 = (currentScroll - vh * 2) * 0.4;
          t3.style.transform = `translate3d(0, ${p3}px, 0)`;
      }
  } else {
      s3?.classList.remove('active');
      if (t3) t3.style.transform = `translate3d(0, 0, 0)`;
  }

  // 5. Расчет прогресса перелета логотипа
  const viewport = document.querySelector('.cube-viewport');
  if (!viewport) return;

  const finishDistance = vh - 100;
  let progress = currentScroll / finishDistance;
  progress = Math.max(0, Math.min(1, progress));

  // Координаты (исправлено с 5% на пиксели)
  const moveX = (50 - window.innerWidth / 2) * progress; // 50px от края
  const moveY = (38 - window.innerHeight / 2) * progress; // 38px от верха
  const currentScale = 1 + (0.12 - 1) * progress;

  viewport.style.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(${currentScale})`;

  // 6. Управление меню (Группы разъезжаются)
  const leftGroup = document.querySelector('.nav-group-left');
  const rightGroup = document.querySelector('.nav-group-right');
  const maxOffset = (window.innerWidth / 2) - 290; 
  const currentOffset = maxOffset * (1 - progress);

  if (leftGroup) leftGroup.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;
  if (rightGroup) rightGroup.style.transform = `translate3d(${currentOffset}px, 0, 0)`;

  // 7. Контроль 3D-вращения и видимости граней
  const allSides = viewport.querySelectorAll('.side');
  
  if (progress > 0.05 && isHeroActive) {
      isHeroActive = false; 
      clearTimeout(rotationTimer);
      if (step % 2 !== 0) performRotation(); 
      
      allSides.forEach(side => {
          if (!side.classList.contains('active-side')) {
              side.style.display = "none";
              side.style.opacity = "0";
          }
      });
  } 
  else if (progress <= 0.05 && !isHeroActive) {
      isHeroActive = true; 
      clearTimeout(rotationTimer);
      startInfiniteLoop();
      
      allSides.forEach(side => {
          side.style.display = "flex";
          side.style.opacity = side.classList.contains('active-side') ? "1" : "0.05";
      });
  }

  // 8. Финальная подмена на PNG
  const cubeInside = viewport.querySelector('.cube');
  if (progress > 0.9) {
      document.body.classList.add('is-logo-active');
      if (cubeInside) cubeInside.style.opacity = '0';
  } else {
      document.body.classList.remove('is-logo-active');
      if (cubeInside) cubeInside.style.opacity = '1';
  }

  requestAnimationFrame(updateLogoAnimation);
}
