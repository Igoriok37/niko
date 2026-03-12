const slider = document.getElementById('mainSlider');
const slides = document.querySelectorAll('.slide');
let currentIdx = 0;
let isMoving = false;


function goToSection(index) {
  if (index < 0 || index >= slides.length || isMoving) return;
  isMoving = true;

  // Убираем активный класс у всех и ставим спец. класс для уходящего слайда
  slides.forEach((s, i) => {
    s.classList.remove('active', 'exit-up');
    if (i < index) s.classList.add('exit-up');
  });

  // Двигаем весь контейнер
  slider.style.transform = `translateY(-${index * 100}vh)`;

  // Активируем новый слайд
  slides[index].classList.add('active');

  // Блокировка на время анимации
  setTimeout(() => {
    currentIdx = index;
    isMoving = false;
  }, 1200); // Совпадает с CSS transition
}

let rotationTimer; // Сюда будем сохранять текущий таймер
let heroCube = document.getElementById('hero-cube');
let sides = heroCube.querySelectorAll('.side');
let step = 0;


function startInfiniteLoop() {

  // Каждый таймер теперь имеет имя, по которому его можно найти и удалить
  rotationTimer = setTimeout(() => {
    performRotation(); // Шаг 1

    rotationTimer = setTimeout(() => {
      performRotation(); // Шаг 2

      console.log("Замерли на ПЛОТНОМ слове");

      rotationTimer = setTimeout(() => {
        performRotation(); // Шаг 3

        rotationTimer = setTimeout(() => {
          performRotation(); // Шаг 4 (Architecture)

          rotationTimer = setTimeout(() => {
            heroCube.style.transition = 'none';
            step = 0;
            heroCube.style.transform = `rotateX(0deg)`;

            rotationTimer = setTimeout(() => {
              heroCube.style.transition = 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
              startInfiniteLoop();
            }, 100);
          }, 8000);
        }, 1500);
      }, 2000); // Твоя пауза

    }, 1500);
  }, 1500);
}


function performRotation() {
  step++;
  heroCube.style.transform = `rotateX(${step * -90}deg)`;

  const currentIndex = step % 4;

  sides.forEach((side, index) => {
    if (index === currentIndex) {
      side.classList.add('active-side');
    } else {
      side.classList.remove('active-side');
    }
  });
}

// Стартуем
startInfiniteLoop();

let isScrolling = false;
const viewport = document.querySelector('.cube-viewport');
const headerContainer = document.querySelector('.header-logo-place');



// --- 1. ПЕРЕМЕННЫЕ ДЛЯ ПЛАВНОСТИ ---
let currentScroll = 0;   
let targetScroll = 0;    
const ease = 0.08;       
let isHeroActive = true; 


// --- 2. ГЛАВНАЯ ФУНКЦИЯ (Копируй целиком) ---
function updateLogoAnimation() {
// Плавное доплывание значения
currentScroll += (targetScroll - currentScroll) * ease;
const vh = window.innerHeight;
const progressBar = document.getElementById('progressBar');
const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
const totalProgress = currentScroll / totalHeight;

if (progressBar) {
  progressBar.style.transform = `scaleX(${totalProgress})`;
}

    const s2 = document.getElementById('slide-2');
    const s3 = document.getElementById('slide-3');
    const s4 = document.getElementById('slide-4');
    
    // --- ЛОГИКА РАСКРЫТИЯ (REVEAL) ---

    // 1. Двигаем ВТОРОЙ слайд (после 100vh), чтобы открыть ТРЕТИЙ
    if (currentScroll > vh) {
      const s2Offset = currentScroll - vh; 
      if (s2) s2.style.transform = `translate3d(0, ${-s2Offset}px, 0)`;
  } else {
      if (s2) s2.style.transform = `translate3d(0, 0, 0)`;
  }

    // 2. Двигаем ТРЕТИЙ слайд (после 200vh), чтобы открыть ЧЕТВЕРТЫЙ
    if (currentScroll > vh * 2) {
      let s3Offset = currentScroll - vh * 2;
      if (s3) s3.style.transform = `translate3d(0, ${-s3Offset}px, 0)`;
  } else {
      if (s3) s3.style.transform = `translate3d(0, 0, 0)`;
  }

    if (currentScroll > vh * 3) {
      let s4Offset = currentScroll - vh * 3;
      if (s4) s4.style.transform = `translate3d(0, ${-s4Offset}px, 0)`;
  } else {
      if (s4) s4.style.transform = `translate3d(0, 0, 0)`;
  }
 
     // 4. Активация и Параллакс текстов
  const t2 = s2?.querySelector('.reveal-text');
  const t3 = s3?.querySelector('.reveal-text');
  const t4 = s4?.querySelector('.reveal-text');

  if (currentScroll > vh * 0.4) {
      s2?.classList.add('active');
      // ПАРАЛЛАКС для 2 слайда: текст чуть отстает от шторки
      if (t2 && currentScroll > vh) {
          let p2 = 400 - (currentScroll - vh) * 0.15;
          t2.style.transform = `translate3d(-300px, ${p2}px, 0)`;
      }
  } else {
      s2?.classList.remove('active');
      if (t2) t2.style.transform = `translate3d(-300px, 400px, 0)`;
  }

  if (currentScroll > vh * 1.2) {
      s3?.classList.add('active');
      // ПАРАЛЛАКС для 3 слайда
      if (t3 && currentScroll > vh * 2) {
          let p3 = 400 - (currentScroll - vh * 2) * 0.15;
          t3.style.transform = `translate3d(300px, ${p3}px, 0)`;
      }
  } else {
      s3?.classList.remove('active');
      if (t3) t3.style.transform = `translate3d(300px, 400px, 0)`;
  }

  if (currentScroll > vh * 2.4) {
      s4?.classList.add('active');
      // ПАРАЛЛАКС для 3 слайда
      if (t4 && currentScroll > vh * 3) {
          let p4 = 400 - (currentScroll - vh * 3) * 0.2;
          t4.style.transform = `translate3d(-300px, ${p4}px, 0)`;
      }
  } else {
      s4?.classList.remove('active');
      if (t4) t4.style.transform = `translate3d(-300px, 400px, 0)`;
  }


const viewport = document.querySelector('.cube-viewport');
if (!viewport) return; // Защита от ошибки, если вьюпорт не найден

const firstSlideHeight = window.innerHeight;
const finishDistance = firstSlideHeight - 100;

let progress = currentScroll / finishDistance;
if (progress > 1) progress = 1;
if (progress < 0) progress = 0;

// Расчет координат: от центра до угла (40px)
/* const moveX = (5% - window.innerWidth / 2) * progress; */
const moveX = 0; 
const moveY = (38 - window.innerHeight / 2) * progress;
const currentScale = 1 + (0.12 - 1) * progress;

// ПРИМЕНЯЕМ ТРАНСФОРМАЦИЮ
viewport.style.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(${currentScale})`;

// Переменная-флаг (проверь, чтобы она была объявлена вверху скрипта)
let isHeroActive = true; 


const leftGroup = document.querySelector('.nav-group-left');
const rightGroup = document.querySelector('.nav-group-right');

// 1. Считаем, на сколько пикселей нужно отодвинуть группу от центра до края
// Ширина экрана пополам минус ширина самой группы (примерно 150px) и отступ (50px)
const maxOffset = (window.innerWidth / 2) - 290; 

// 2. Формула: когда progress растет, сдвиг уменьшается до 0
// При progress = 0 (старт) -> сдвиг = maxOffset
// При progress = 1 (финиш) -> сдвиг = 0
const currentOffset = maxOffset * (1 - progress);

// Применяем смещение
if (leftGroup) {
  // Левую группу толкаем влево (минус)
  leftGroup.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;
}
if (rightGroup) {
  // Правую группу толкаем вправо (плюс)
  rightGroup.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
}

// ... внутри функции updateLogoAnimation ...

// 1. ЛОГИКА ОСТАНОВКИ (когда улетаем в угол)
if (progress > 0.05 && isHeroActive) {
isHeroActive = false; // "Закрываем замок"
clearTimeout(rotationTimer); // Останавливаем вращение

// Докручиваем до плотной грани, если нужно
if (step % 2 !== 0) {
    performRotation(); 
}
console.log("Улетели: Вращение остановлено");
} 

// 2. ЛОГИКА ЗАПУСКА (когда вернулись в самый верх)
else if (progress <= 0.05 && !isHeroActive) {
isHeroActive = true; // "Открываем замок"

// ОЧЕНЬ ВАЖНО: сначала очищаем все старые таймеры, чтобы не было накладок
clearTimeout(rotationTimer); 

// Запускаем цикл заново только ОДИН раз
startInfiniteLoop(); 
console.log("Вернулись: Вращение запущено");
}

// --- Внутри функции updateLogoAnimation ---

// --- Внутри функции updateLogoAnimation ---

const allSides = viewport.querySelectorAll('.side');

// 1. Уходим в угол (Скрываем лишнее)
if (progress > 0.05) { // Начинаем чуть раньше, чтобы скрыть "полоски"
allSides.forEach((side) => {
    if (!side.classList.contains('active-side')) {
        side.style.display = "none"; 
        side.style.opacity = "0";
    }
});
} 

// 2. Возвращаемся в центр (Проявляем грани)
else if (progress <= 0.05) {
allSides.forEach((side) => {
    // Возвращаем физическое присутствие граней
    side.style.display = "flex"; 
    
    // Но прозрачность оставляем только той, что была активна
    // Остальные проявятся сами, когда запустится startInfiniteLoop()
    if (side.classList.contains('active-side')) {
        side.style.opacity = "1";
    } else {
        side.style.opacity = "0"; // Или 0.05 для легкого объема
    }
});
}

// ПОДМЕНА НА ЛОГОТИП В КОНЦЕ
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

// --- 3. ОБРАБОТЧИК СКРОЛЛА (только фиксирует цель) ---
window.addEventListener('scroll', () => {
targetScroll = window.scrollY;
}, { passive: true });

// --- 4. ЗАПУСК ВСЕГО ПРОЦЕССА ---
requestAnimationFrame(updateLogoAnimation);

let isLogoMode = false; // Флаг состояния

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewport = document.querySelector('.cube-viewport');

  // Уходим вниз (в режим логотипа)
  if (scrollY > 50 && !isLogoMode) {
    isLogoMode = true; // Блокируем повторные вызовы

    stopRotation(); // Твоя функция clearTimeout

    // Докручиваем только ОДИН раз, если замерли на контурном слове
    if (step % 2 !== 0) {
      console.log("Разовая докрутка до плотного слова");
      performRotation();
    }

    viewport.classList.add('as-logo');
  }

  // Возвращаемся наверх
  else if (scrollY <= 50 && isLogoMode) {
    isLogoMode = false;
    viewport.classList.remove('as-logo');

    // Запускаем цикл вращения снова через паузу
    setTimeout(() => {
      if (!isLogoMode) startInfiniteLoop();
    }, 1500);
  }
});


// Функция принудительной остановки
function stopRotation() {
  // Очищаем основной таймер
  clearTimeout(rotationTimer);
  
  // ХИТРОСТЬ: Очищаем вообще все таймеры в браузере, 
  // чтобы "забытые" вложенные setTimeout не выстрелили позже
  let id = window.setTimeout(function() {}, 0);
  while (id--) {
      window.clearTimeout(id);
  }
  
  console.log("Полная очистка таймеров выполнена");
}

