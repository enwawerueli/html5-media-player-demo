$(document).ready(function() {

    $(document).on('click', '#btn-play', play);
    $(document).on('click', 'a.track', function(e) {
        e.preventDefault();
        load(this);
        play();
    });
    audio.on('ended', autoPlay);
    $(document).on('click', '#btn-previous', previous);
    $(document).on('click', '#btn-next', next);
    $(document).on('click', '#btn-mute', mute);
    $(document).on('click', '#btn-shuffle', shuffle);
    $(document).on('click', '#btn-repeat', loop);
    $(document).on('click', '#btn-view', toggleView);
});
