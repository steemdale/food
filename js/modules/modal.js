let k = 0;
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

    k = 1;
    return k;
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modal = document.querySelector(modalSelector),
          modalOpenBtn = document.querySelectorAll(triggerSelector);

    modalOpenBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //щоб добавити селектор і функція тут же не запускалась обертати її в стрілочну
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            if (k === 0) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
    }

    // window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal, openModal};
