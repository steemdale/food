function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider 2

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function slidesNum() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        }
    }
    slidesNum();

    function dotsActive() {
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }

    function setOffset(arr){
        if (offset == +width.slice(0, width.length - 2) * (arr - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsArr = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    next.addEventListener('click', () => {
        setOffset(slides.length);

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slidesNum();
        dotsActive();
    });

    prev.addEventListener('click', () => {
        setOffset(slides.length);

        if (slideIndex == 1) {
            slideIndex = slides.length; 
        } else {
            slideIndex--;
        }

        slidesNum();
        dotsActive();
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            slidesNum();
            dotsActive();
        });
    });
}

export default slider;