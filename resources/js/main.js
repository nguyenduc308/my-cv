function init() {
    const $ = (selector, element = document) => element.querySelector(selector);
    const $$ = (selector, element = document) => element.querySelectorAll(selector);
    let coords = new Map();
    const coordsElements = $$('.coords');
    Array.from(coordsElements).forEach((element) => {
        const { top } = element.getBoundingClientRect();
        coords.set(`#${element.id}`, top)
    });

    const listElement = $('.side-list');
    const wrapperElement = $('.main');
    listElement.addEventListener('click', function (event) {
        event.preventDefault();
        const hash = event.target.hash;
        if (hash) {
            const elementCoord = coords.get(hash);
            wrapperElement.scroll({
                top: elementCoord,
                behavior: 'smooth'
            })
        }
    });
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(entry => {
                // && entry.intersectionRatio >= 5.5 
                if (entry.isIntersecting) {
                    $(`a[href="#${entry.target.id}"]`, listElement)?.classList.add('active');
                } else {
                    $(`a[href="#${entry.target.id}"]`, listElement)?.classList.remove('active');
                }
            })
        },
        {
            root: null,
            rootMargin: '0px 0px -10px 0px',
            threshold: .3
        }
    )

    coordsElements.forEach(element => {
        observer.observe(element);
    })
}

document.addEventListener('DOMContentLoaded', init)