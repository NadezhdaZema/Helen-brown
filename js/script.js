//Свайпер

let myImageSlider = new Swiper(".image-slider", {
  // Стрелки
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Навигация
  // Буллеты, текущее положение, прогрессбар
  pagination: {
    el: ".swiper-pagination",

    // Буллеты
    type: "bullets",
    clickable: true,
    // Динамические буллеты
    dynamicBullets: true,
  },

  // Включение/отключение
  // перетаскивания на ПК
  simulateTouch: true,
  // Чувствительность свайпа
  touchRatio: 1,
  // Угол срабатывания свайпа/перетаскивания
  touchAngle: 45,
  // Курсор перетаскивания
  grabCursor: true,

  // Переключение при клике на слайд
  slideToClickedSlide: false,

  // Навигация по хешу
  hashNavigation: {
    // Отслеживать состояние
    watchState: true,
  },

  // Управление клавиатурой
  keyboard: {
    // Включить\выключить
    enabled: true,
    // Включить\выключить
    // только когда слайдер
    // в пределах вьюпорта
    onlyInViewport: true,
    // Включить\выключить
    // управление клавишами
    // pageUp, pageDown
    pageUpDown: true,
  },

  // Управление колесом мыши
  mousewheel: {
    // Чувствительность колеса мыши
    sensitivity: 1,
    // Класс объекта на котором
    // будет срабатывать прокрутка мышью.
    //eventsTarget: ".image-slider"
  },

  // Автовысота
  autoHeight: false,

  // Количество слайдов для показа
  slidesPerView: 3,

  // Отключение функционала
  // если слайдов меньше чем нужно
  watchOverflow: true,

  // Отступ между слайдами
  spaceBetween: 30,

  // Количество пролистываемых слайдов
  slidesPerGroup: 2,

  // Активный слайд по центру
  centeredSlides: false,

  // Стартовый слайд.
  initialSlide: 0,

  // Мультирядность
  slidesPerColumn: 1,

  // Бесконечный слайдер
  loop: false,

  // Кол-во дублирующих слайдов
  loopedSlides: 0,

  // Свободный режим
  freeMode: true,

  // Автопрокрутка
  /*
	autoplay: {
		// Пауза между прокруткой
		delay: 1000,
		// Закончить на последнем слайде
		stopOnLastSlide: true,
		// Отключить после ручного переключения
		disableOnInteraction: false
	},
	*/

  // Скорость
  speed: 800,

  // Вертикальный слайдер
  direction: "horizontal",

  // Эффекты переключения слайдов.
  // Листание
  effect: "slide",

  // Отключить предзагрузка картинок
  preloadImages: false,
  // Lazy Loading
  // (подгрузка картинок)
  lazy: {
    // Подгружать на старте
    // переключения слайда
    loadOnTransitionStart: false,
    // Подгрузить предыдущую
    // и следующую картинки
    loadPrevNext: false,
  },
  // Слежка за видимыми слайдами
  watchSlidesProgress: true,
  // Добавление класса видимым слайдам
  watchSlidesVisibility: true,

  // Зум картинки
  zoom: {
    // Макимальное увеличение
    maxRatio: 5,
    // Минимальное увеличение
    minRatio: 1,
  },

  // Обновить свайпер
  // при изменении элементов слайдера
  observer: true,

  // Обновить свайпер
  // при изменении родительских
  // элементов слайдера
  observeParents: true,

  // Обновить свайпер
  // при изменении дочерних
  // элементов слайда
  observeSlideChildren: true,
  slidesOffseAfter: 0,
});

// Увеличение картинки по клику
$(function () {
  $(".minimized").click(function (event) {
    var i_path = $(this).attr("src");
    $("body").append(
      '<div id="overlay"></div><div id="magnify"><img src="' +
        i_path +
        '"><div id="close-popup"><i></i></div></div>'
    );
    $("#magnify").css({
      left: ($(document).width() - $("#magnify").outerWidth()) / 2,

      top: ($(window).height() - $("#magnify").outerHeight()) / 2,
    });
    $("#overlay, #magnify").fadeIn("fast");
  });

  $("body").on("click", "#close-popup, #overlay", function (event) {
    event.preventDefault();
    $("#overlay, #magnify").fadeOut("fast", function () {
      $("#close-popup, #magnify, #overlay").remove();
    });
  });
});

//Спойлеры
const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
  // Получение обычных слойлеров
  const spollersRegular = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(",")[0];
  });
  // Инициализация обычных спойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add("_init");
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove("_init");
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }
  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute("tabindex");
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
      const spollerTitle = el.hasAttribute("data-spoller")
        ? el
        : el.closest("[data-spoller]");
      const spollersBlock = spollerTitle.closest("[data-spollers]");
      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
        ? true
        : false;
      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_active")) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle("_active");
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      "[data-spoller]._active"
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove("_active");
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

/*Форма*/

$(document).ready(function () {
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
      },
      messages: {
        name: "Пожалуйста, введите имя",
        phone: "Пожалуйста, введите номер телефона",
      },
    });
  }
  validateForms("#timedate");

  $("form").live("submit", function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
      beforeSend: function () {
        // Show image container
        $("#loader1").show();
      },
      success: function (response) {
        $(".response").empty();
        $(".response").append(response);
      },
      complete: function (data) {
        // Hide image container
        $("#loader1").hide();
      },
    }).done(function () {
      $(this).find("input", "textarea").val("");

      $("#overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });
});
$(function () {
  $("body").on("click", "#overlay", function (event) {
    event.preventDefault();
    $("#overlay, #thanks").fadeOut("fast", function () {
      $("#thanks, #overlay").remove();
    });
  });
});

// loader;
window.onload = function () {
  document.querySelector(".preloader").classList.add("preloader-remove");
};

// Анимация при скролле

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

//  cookie
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook"),
  cookiewin = document.getElementsByClassName("cookie_notice")[0];

if (cookiecook != "no") {
  cookiewin.style.display = "block";

  document
    .getElementById("cookie_close")
    .addEventListener("click", function () {
      cookiewin.style.display = "none";

      let date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
    });
}
// Меню бургер

$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header__list, .links ").toggleClass("active");
    $("body").toggleClass("lock");
  });

  $(".header__menu ul li a").on("click", function (event) {
    $(".header__burger,.header__list, .links ").removeClass("active");
    $("body").removeClass("lock");
  });
});
