$(document).ready(function() {

    $(document).on('click', '#btn-play', function(e){
        e.preventDefault();
        play();
    });

    $(document).on('click', 'a.track', function(e) {
        e.preventDefault();
        load($(this));
        play();
    });

    $(audio).on('ended', function(e) {
        next();
    });

    $(document).on('click', '#btn-previous', function() {
        prev();
    });

    $(document).on('click', '#btn-next', function() {
        next();
    });
});
