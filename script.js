document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    // Параметры
    slidesPerView: 4, // Показываем по 1 слайду (но внутри него 3 карточки)
    direction: 'horizontal', // или 'vertical'
    slidesPerGroup: 1,
    breakpoints: {  
  360: { slidesPerView: 1 },  
  768: { slidesPerView: 2 },  
  1024: { slidesPerView: 3 },
  1025: { slidesPerView: 4 },
    },
    // Пагинация
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Навигационные стрелки
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
     scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    
    on: {
      init: function() {
        updatePaginationNumbers(this);
      },
      slideChange: function() {
        updatePaginationNumbers(this);
      }
    }
    
  });
    function updatePaginationNumbers(swiperInstance) {
    const current = swiperInstance.activeIndex + 1;
    const total = swiperInstance.slides.length -3;
    
    document.querySelector('.swiper-pagination-current').textContent = current;
    document.querySelector('.swiper-pagination-total').textContent = total;
  }
});




document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact_form');
    const nameInput = document.querySelector('.form-input--name');
    const emailInput = document.querySelector('.form-input--email');
    const submitButton = document.querySelector('.btn-contact');

    // Функция для проверки валидности email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Функция для отображения ошибки
    function showError(input, message) {
        const formLabel = input.closest('.form-label');
        let errorElement = formLabel.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            formLabel.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('input-error');
    }

    // Функция для удаления ошибки
    function clearError(input) {
        const formLabel = input.closest('.form-label');
        const errorElement = formLabel.querySelector('.error-message');
        
        if (errorElement) {
            formLabel.removeChild(errorElement);
        }
        
        input.classList.remove('input-error');
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;

        // Валидация имени
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Валидация email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Пожалуйста, введите email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        return isValid;
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Форма валидна, можно отправлять данные
            alert('Форма успешно отправлена!');
            // form.submit(); // Раскомментируйте, если нужно реально отправлять форму
        }
    });

    // Валидация при вводе (опционально)
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            clearError(emailInput);
        }
    });
});