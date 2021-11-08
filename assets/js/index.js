$(function() {

    const body = $('body');

    body.attr('data-scroll-direction', 'down');

    let lastScrollTop = 0;

    window.addEventListener("scroll", function(){
        const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
            $('body').attr('data-scroll-direction', 'down');
        } else {
            $('body').attr('data-scroll-direction', 'up');
        }
        lastScrollTop = st <= window.pageYOffset ? window.pageYOffset : st;

        // Credits: "https://stackoverflow.com/a/40370876/15760608"
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
            $('[data-section-group="4"] .player').fadeOut();
        }else{
            $('[data-section-group="4"] .player').fadeIn();
        }
    }, false);

});