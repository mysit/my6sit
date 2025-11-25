// Базовая стоимость для каждого типа услуги
        const basePrices = {
            basic: 1000,
            premium: 2000,
            custom: 1500
        };

        // Множители для опций
        const optionMultipliers = {
            standard: 1.0,
            express: 1.5,
            vip: 2.0
        };

        // Элементы DOM
        const quantityInput = document.getElementById('quantity');
        const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
        const optionsGroup = document.getElementById('options-group');
        const optionsSelect = document.getElementById('options');
        const propertyGroup = document.getElementById('property-group');
        const propertyCheckbox = document.getElementById('property');
        const totalPriceElement = document.getElementById('total-price');
        const quantityError = document.getElementById('quantity-error');

        // Функция для обновления видимости элементов формы
        function updateFormVisibility() {
            const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
            
            // Сброс значений при смене типа
            optionsSelect.value = 'standard';
            propertyCheckbox.checked = false;

            // Управление видимостью элементов
            switch(selectedType) {
                case 'basic':
                    optionsGroup.classList.add('hidden');
                    propertyGroup.classList.add('hidden');
                    break;
                case 'premium':
                    optionsGroup.classList.remove('hidden');
                    propertyGroup.classList.add('hidden');
                    break;
                case 'custom':
                    optionsGroup.classList.add('hidden');
                    propertyGroup.classList.remove('hidden');
                    break;
            }
        }

        // Функция для расчета стоимости
        function calculatePrice() {
            const quantity = parseInt(quantityInput.value) || 0;
            const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
            const option = optionsSelect.value;
            const hasProperty = propertyCheckbox.checked;

            // Валидация количества
            if (quantity < 1) {
                quantityError.textContent = 'Количество должно быть не менее 1';
                totalPriceElement.textContent = '0 руб.';
                return;
            } else {
                quantityError.textContent = '';
            }

            let basePrice = basePrices[serviceType];
            let totalPrice = basePrice * quantity;

            // Применение множителя опции для premium типа
            if (serviceType === 'premium') {
                totalPrice *= optionMultipliers[option];
            }

            // Применение надбавки за свойство для custom типа
            if (serviceType === 'custom' && hasProperty) {
                totalPrice *= 1.2; // +20%
            }

            // Форматирование и вывод цены
            totalPriceElement.textContent = `${Math.round(totalPrice)} руб.`;
        }

        // Обработчики событий
        serviceTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateFormVisibility();
                calculatePrice();
            });
        });

        quantityInput.addEventListener('input', calculatePrice);
        optionsSelect.addEventListener('change', calculatePrice);
        propertyCheckbox.addEventListener('change', calculatePrice);

        // Инициализация калькулятора
        updateFormVisibility();
        calculatePrice();