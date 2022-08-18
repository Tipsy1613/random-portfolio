// Открытие и закрытие меню
const icon = document.querySelector('.menu__burger');
const menuList = document.querySelector('.header__nav');

if (icon) {
   icon.addEventListener('click', function () {
      menuList.classList.toggle('active');
      document.body.classList.toggle('_lock');
      icon.classList.toggle('active');
   })
}


// Прокрутка при клике

const menuLinks = document.querySelectorAll('.nav__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick)
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
         
         
         if (icon.classList.contains('active')) {
            menuList.classList.remove('active');
            document.body.classList.remove('_lock');
            icon.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         
         e.preventDefault();
      }
   }
}


// Появление при скролле

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll); // событие при котором функция нижу будет выполняться
   function animOnScroll () {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i];
         const animItemHeight = animItem.offsetHeight; // высота найденного объекта 
         const animItemOffset = offset(animItem).top; // позиция обекта относительно верха
         const animStart = 4; // коэффициент срабатывания анимации. При 4 анимация будет срабатывать на 1/4 объекта

         // момент старта анимации
         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         // момент старта анимации если высота объекта больше высоты окна браузера
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if (scrollY > (animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            // если у объекта есть класс '_anim-no-hide', то анимация будет проигрываться один раз
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
      
   }

// Функция определяющая позицию объекта на странице страницы
// getBoundingClientRect() - возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим)
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

// задержка вызова функции
   setTimeout(() => {
      animOnScroll ();
   }, 200);
} 
















