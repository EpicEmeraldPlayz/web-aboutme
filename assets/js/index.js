$(function() {

    const body = $('body');

    body.attr('data-scroll-direction', 'up');
    body.attr('data-loading-assets', 'true');

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

    // Credits: https://stackoverflow.com/a/60949881/15760608
    Promise.all(Array.from(document.images).map(img => {
        if (img.complete)
            if (img.naturalHeight !== 0)
                return Promise.resolve();
            else
                return Promise.reject(img);
        return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', () => reject(img));
        });
    })).then(() => {
        body.attr('data-loading-assets', 'false');
        $('body > .preloader').fadeOut(1000);
        $('body > section').hide().fadeIn(1000);
    }, failed => {
        console.log('Some image failed to load, others may still be loading');
        console.log(failed);
    });
});