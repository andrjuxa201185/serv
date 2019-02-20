function MyParallax (wrapper, inner) {
    let windowHeight = window.innerHeight;
    let startInnerOffset = wrapper.offsetHeight - inner.offsetHeight;
    // let center = wrapper.getBoundingClientRect().top + (wrapper.offsetHeight / 2);

    // let k = (- windowHeight / startInnerOffset) / 2;
    let k =  -wrapper.offsetHeight / startInnerOffset;
    
    let y = (windowHeight - wrapper.getBoundingClientRect().bottom) / k + startInnerOffset;
    
    // let k = center / windowHeight;
    // let y = -startInnerOffset * k + startInnerOffset;

    inner.style.transform = 'translateY(' + y + 'px)';

    window.addEventListener("scroll", function(){
        let wrapperBounding = wrapper.getBoundingClientRect();
        if (wrapperBounding.top < windowHeight && wrapperBounding.bottom > 0) {

            // center = wrapper.getBoundingClientRect().top + (wrapper.offsetHeight / 2);
            y = (windowHeight - wrapperBounding.bottom) / k + startInnerOffset;

            // k = wrapper.getBoundingClientRect().top / (windowHeight);
            // y = startInnerOffset - startInnerOffset * (1 - k);

            inner.style.transform = 'translateY(' + y + 'px)';
        }
    });
}

window.addEventListener("load", function(){
    let wrapper = document.getElementsByClassName('wrapper-parallax');
    let inner = document.getElementsByClassName('inner-parallax');

    if (window.innerWidth > 768){
        for (let i = 0; i < wrapper.length; i++) {
            new MyParallax(wrapper[i], inner[i]);
        }
    } else {
        for (let i = 1; i < wrapper.length; i = i + 2) {
            new MyParallax(wrapper[i], inner[i]);
        }
    }
});