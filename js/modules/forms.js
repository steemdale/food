import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякуємо! Дзовнимо Вам :)',
        failure: 'Щось пішло не так... :('
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // Звичайний формат
    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('status');
    //         statusMessage.textContent = message.loading;
    //         form.append(statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         // request.setRequestHeader('Content-type', 'multipart/form-data');
            
    //         const formData = new FormData(form);
    //         request.send(formData);
            
    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 statusMessage.textContent = message.success;
    //                 form.reset();
    //                 setTimeout(() => {
    //                     statusMessage.remove();
    //                 }, 2000);
    //             } else {
    //                 statusMessage.textContent = message.failure;
    //             }
    //         });
    //     });
    // }

    //у форматі JSON

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);  // якшо флекси то верстка летить. Тому наступне
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            
            // const object = {};                       // старий спосіб
            // formData.forEach(function(value, key) { // перебрали обєкт formData в НОВИЙ обєкт  // розеоментувати ДЖСОН
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch('server.php', {                    // якщо фетчим через окрему функцію то це не робимо
            //     method: "POST",
            //     // headers: {
            //     //     'Content-type': 'application/json'                       //розкоментувати для передачі ДЖСОН
            //     // },
            //     body: formData                                                  //JSON.stringify(object);  //ДЖСОН
            // })

            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())                                        // вже трансформували
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');

        prevModal.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div> 
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json());

}

export default forms;