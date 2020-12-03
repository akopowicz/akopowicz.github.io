$(document).ready(function() {
    $('.hamburger').click(function () {
        $('.side-menu').toggleClass('open');
    });

    $('a').click(function(e) {
        e.preventDefault();

        $('body').fadeOut(2000, function () {
            window.location.href = $(e.target).attr('href');
        });
    });
});