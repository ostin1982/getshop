const proceedButton = document.querySelector('.js-button-proceed');
const closeButton =document.querySelector('.js-button-close');
const mainScreen = document.querySelector('.main');
const secondScreen = document.querySelector('.second');
const allNumberButtons = document.querySelectorAll('.js-button-digit');
const phoneNumbersRecords = document.querySelectorAll('.js-number-record');
const phoneClearButton = document.querySelector('.js-button-erase');
const inputPhone = document.querySelector('.js-input');
const secondNumbers = document.querySelector('.second__numbers');
const secondCheckboxBox = document.querySelector('.second__checkbox');
const error = document.querySelector('.second__error');
const customCheckbox = document.querySelector('.custom-checkbox');
const labelCheckbox = document.querySelector('.js-checkbox-label');
const confirmButton = document.querySelector('.js-button-confirm');
const blockMain = document.querySelector('.js-block-main');
const goodBlock = document.querySelector('.js-good-block');
const fillColors = document.querySelectorAll('.second__fill');
const strokeColors = document.querySelectorAll('.second__stroke');

let regular = /[0-9]{3}[0]{7}/i;
let regularRight = /[0-9]{10}/i;
let code = '';

const fillCode = (digit) => {
    if(code.length < phoneNumbersRecords.length) {
        code += digit;
        phoneNumbersRecords[code.length - 1].innerText = digit;
        inputPhone.value = code

        if(regular.test(inputPhone.value)) {
            secondNumbers.classList.add('second__numbers_red')
            secondCheckboxBox.classList.add('second__checkbox_active')
            error.classList.add('second__error_active')
            phoneClearButton.classList.add('button__second_active')
        } else {
            secondNumbers.classList.remove('second__numbers_red')
            secondCheckboxBox.classList.remove('second__checkbox_active')
            error.classList.remove('second__error_active')
            phoneClearButton.classList.remove('button__second_active')
        }

        customCheckbox.addEventListener('change', () => {
            if((labelCheckbox.className = customCheckbox.checked) && code.length === 10 && regularRight.test(inputPhone.value)) {
                confirmButton.removeAttribute('disabled') 
            } else {
                confirmButton.setAttribute('disabled', '');
            }
        })
    }
}

const bindHanlerClick = () => {
    allNumberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', () => {
            const digitValue = numberButton.getAttribute('data-num');
            fillCode(digitValue)
        })
    })
}

const clearCode = () => {
    code = '';
    phoneNumbersRecords.forEach(phoneNumbersRecord => {
        phoneNumbersRecord.innerText = '_';
        inputPhone.value = code;
    })
}

confirmButton.addEventListener('click', (event) => {
    event.preventDefault()

    blockMain.classList.remove('second__block_active')
    goodBlock.classList.add('second__good_active');
    fillColors.forEach(fillColor => {
        fillColor.classList.add('second__fill_black');
    })
    strokeColors.forEach(strokeColor => {
        strokeColor.classList.add('second__stroke_white');
    })
})

proceedButton.addEventListener('click', (event) => {
    event.preventDefault();

    mainScreen.classList.remove('main_active');
    secondScreen.classList.add('second_active');
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    mainScreen.classList.add('main_active');
    secondScreen.classList.remove('second_active');
    blockMain.classList.add('second__block_active')
    goodBlock.classList.remove('second__good_active');
    fillColors.forEach(fillColor => {
        fillColor.classList.remove('second__fill_black');
    })
    strokeColors.forEach(strokeColor => {
        strokeColor.classList.remove('second__stroke_white');
    })
    customCheckbox.checked = false
    clearCode()
    
})

bindHanlerClick();
phoneClearButton.addEventListener('click', clearCode)