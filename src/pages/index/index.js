// Show slider
const btnStartClickHandler = (evt) => {
    const slider = document
        .getElementById('slider');

    const btn = evt.target;

    btn.classList.add('btn_hide');
    slider.classList.add('slider_show');
};

document
    .getElementById('btnStart')
    .addEventListener('click', btnStartClickHandler);

// Toggle slider items
const toggleSlideItem = (id) => {
    const targetSlide = document.getElementById(id);
    const activeSlide = document
        .querySelector('.slider__item.active');

    activeSlide.classList.remove('active');
    targetSlide.classList.add('active');
}

const toggleNavItem = (target) => {
    const activeNavItem = document
        .querySelector('.slider__nav-item.active');

    activeNavItem.classList.remove('active');
    target.classList.add('active')
};

// Handle click on navs
const navItemClickHandler = evt => {
    const item = evt.target
        .closest('.slider__nav-item');

    const targetItemId = item
        .dataset.targetSlideId;

    toggleSlideItem(targetItemId);
    toggleNavItem(item);
};

const navItems = Array.from(
    document.getElementsByClassName(
        'slider__nav-item'));

navItems.forEach(item => {
   item.addEventListener(
       'click',
       navItemClickHandler
   );
});

// Handle click on pagination arrow
const getTargets = (direction) => {
    const slides = Array.from(document.getElementsByClassName(
        'slider__item'));

    let activeSliderIdx;

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            activeSliderIdx = direction === 'next' ? i + 2 : i;
        }
    }

    if (activeSliderIdx < 1) {
        activeSliderIdx = slides.length;
    }

    if (activeSliderIdx > slides.length) {
        activeSliderIdx = 1;
    }

    return {
        id: `slide-${activeSliderIdx}`,
        target: Array.from(
            document.getElementsByClassName(
                'slider__nav-item'))[--activeSliderIdx]
    };
};

const paginBtnClickHandler = evt => {
    const direction = evt.target
        .dataset.direction;

    const items = getTargets(direction);

    toggleSlideItem(items.id);
    toggleNavItem(items.target);
};

const pagins = Array.from(
    document.getElementsByClassName(
        'slider__controller'));

pagins.forEach(item => {
    item.addEventListener(
        'click',
        paginBtnClickHandler
    );
});
