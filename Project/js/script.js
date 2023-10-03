"use strict"


// // скрол меню навигации
const menulinks = document.querySelectorAll('.menu__link[data-goto]');
if (menulinks.length > 0) {
    menulinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header'.offsetHeight);

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lcok');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}
// Бургер меню
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
//Валидация формы

const form = document.getElementById('form');
form.addEventListener('submit', formSend);
async function formSend(e) {
    e.preventDefault();  
    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
        form.classList.add('_sending');
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('_sending'); // мб проблемы
        } else {
            alert("Ошибка");
            form.classList.remove('_sending');
        }
    } else {
        alert('Заполните обязательные поля');
    }

}
function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);
        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;

}
function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
//функция для теста email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}




// document.addEventListener('DOMContentLoaded', function () {

// form.addEventListener('submit', formSend);
// async function formSend(e) {
//     e.preventDefault();
//     let error = formValidate(form);
//     let formData = new FormData(form);
//     if (error === 0) {
//         form.classList.add('_sending');
//         let response = await fetch("sendmail.php", {
//             method: 'POST',
//             body: formData
//         });
//         if (response.ok) {
//             let result = await response.json();
//             alert(result.message);
//             form.reset();
//             form.classList.remove('_sending');
//         } else {
//             form.classList.remove('_sending');
//         }
//     } else {
//     }
// }



//     function formValidate(form) {

//         let error = 0;

//         let formReq = document.querySelectorAll('._req');



//         for (let index = 0; index < formReq.length; index++) {

//             const input = formReq[index];

//             formRemoveError(input);



//             if (input.value === '') {

//                 formAddError(input);

//                 error++;

//             }

//         }

//         return error;

//     }

//     function formAddError(input) {

//         input.parentElement.classList.add('_error');

//         input.classList.add('_error');

//     }

//     function formRemoveError(input) {

//         input.parentElement.classList.remove('_error');

//         input.classList.remove('_error');

//     }

// });
