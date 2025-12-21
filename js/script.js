// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Анимация гамбургер-меню
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (nav.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .service-card, .team-member');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Инициализация анимации при прокрутке
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Установка начальных стилей для анимации
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.card, .service-card, .team-member');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Модальные окна
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('.modal-close');

// Функция для открытия модального окна обратного звонка
function openCallbackModal() {
    const callbackModal = document.getElementById('callbackModal');
    if (callbackModal) {
        callbackModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для открытия модального окна расчета стоимости
function openCalculationModal() {
    const calculationModal = document.getElementById('calculationModal');
    if (calculationModal) {
        calculationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Открытие модального окна
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие модального окна
modalCloses.forEach(close => {
    close.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Закрытие модального окна при клике вне его
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Добавление honeypot в формы (защита от спам-ботов)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Добавляем скрытое honeypot поле
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website_url';
        honeypot.value = '';
        honeypot.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px;';
        honeypot.tabIndex = -1;
        honeypot.setAttribute('autocomplete', 'off');
        honeypot.setAttribute('aria-hidden', 'true');
        form.insertBefore(honeypot, form.firstChild);
    });
});

// Формы обратной связи
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Сбор данных формы
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Honeypot проверка - если поле заполнено, это бот
        if (data.website_url && data.website_url.trim() !== '') {
            console.log('Spam bot detected');
            return false;
        }

        // Удаляем honeypot из данных
        delete data.website_url;

        // Определяем тип формы по ID
        const formId = this.id;
        let formType = 'general';

        if (formId === 'callbackForm') {
            formType = 'callback';
        } else if (formId === 'contactForm') {
            formType = 'contact';
        } else if (formId === 'ventilationForm') {
            formType = 'ventilation';
        } else if (formId.includes('conditioning') || formId.includes('airconditioner')) {
            formType = 'airconditioner';
        } else if (formId.includes('drilling')) {
            formType = 'drilling';
        } else if (formId.includes('automation') || formId === 'calculationForm') {
            formType = 'automation';
        } else if (formId.includes('airduct') || formId.includes('vozduh')) {
            formType = 'airducts';
        }

        data.formType = formType;

        // Отключаем кнопку отправки и добавляем спиннер
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Отправка...';
        }

        // Отправка на сервер
        fetch('/api/send-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification(result.message || 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время!');

                // Очистка формы
                this.reset();

                // Закрытие модального окна, если форма в модальном окне
                const modal = this.closest('.modal');
                if (modal) {
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 2000);
                }
            } else {
                showNotification(result.message || 'Произошла ошибка. Попробуйте позвонить нам напрямую.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Произошла ошибка при отправке. Попробуйте позвонить нам напрямую: +7 (913) 003-95-34', 'error');
        })
        .finally(() => {
            // Включаем кнопку обратно
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
});

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    const backgroundColor = type === 'error' ? '#d32f2f' : '#e85124';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: #fefefe;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Удаление уведомления через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Валидация форм в реальном времени
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.style.borderColor = '#d32f2f';
                showFieldError(this, 'Пожалуйста, введите корректный email');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });

    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Разрешаем только цифры, +, -, (, ), пробелы
            this.value = this.value.replace(/[^\d+\-() ]/g, '');
        });

        input.addEventListener('blur', function() {
            const phonePattern = /^[\d+\-() ]{10,}$/;
            if (this.value && !phonePattern.test(this.value)) {
                this.style.borderColor = '#d32f2f';
                showFieldError(this, 'Пожалуйста, введите корректный номер телефона');
            } else {
                this.style.borderColor = '';
                hideFieldError(this);
            }
        });
    });
});

function showFieldError(field, message) {
    hideFieldError(field);
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = 'color: #d32f2f; font-size: 0.85rem; margin-top: 5px;';
    field.parentNode.insertBefore(error, field.nextSibling);
}

function hideFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

// Добавление стилей для анимации уведомлений и спиннера
const style = document.createElement('style');
style.textContent = `
    .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        vertical-align: middle;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Изменение шапки при прокрутке
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(31, 54, 97, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(31, 54, 97, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Кнопка "Наверх" (Scroll to Top)
document.addEventListener('DOMContentLoaded', function() {
    // Создаём кнопку
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Вернуться наверх');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #e85124;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(232, 81, 36, 0.4);
    `;

    document.body.appendChild(backToTopButton);

    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Обработчик клика - плавная прокрутка наверх
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Эффект при наведении
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#c74420';
        this.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#e85124';
        this.style.transform = 'scale(1)';
    });
});

// Ленивая загрузка изображений
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Проверка на мобильное устройство для прямых звонков
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Альтернативная функция для проверки мобильного устройства
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Обработка кликов по телефонным ссылкам
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!isMobile()) {
            e.preventDefault();
            // Открытие модального окна для обратного звонка
            const callbackModal = document.getElementById('callbackModal');
            if (callbackModal) {
                callbackModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

// Валидация форм
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e85124';
            
            // Показываем сообщение об ошибке
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Это поле обязательно для заполнения';
            errorMsg.style.cssText = `
                color: #e85124;
                font-size: 12px;
                margin-top: 5px;
            `;
            
            // Проверяем, есть ли уже сообщение об ошибке
            const existingError = input.parentNode.querySelector('.error-message');
            if (!existingError) {
                input.parentNode.appendChild(errorMsg);
            }
        } else {
            input.style.borderColor = '';
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
    });
    
    return isValid;
}

// Применение валидации ко всем формам
forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e85124';
            } else {
                this.style.borderColor = '';
            }
        });
    });
});