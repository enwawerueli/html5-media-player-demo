var audio = $('#audio');

var playlist = {};
    playlist.tracks = $('a.track');
    playlist.length = playlist.tracks.length - 1;
    playlist.index = 0;
    playlist.playing = $(playlist.tracks[playlist.index]);

var controls = {};
    controls.progress = $('#progress-bar');
    controls.playhead = $('#playhead');
    controls.preload = $('#preload-bar');
    controls.play = $('#btn-play');
    controls.next = $('#btn-next');
    controls.prev = $('#btn-previous');
    controls.repeat = $('#btn-repeat');

var duration = audio[0].duration;

var stopped = audio[0].paused;

var playedTime = audio[0].currentTime;

var shuffle = false;

function load(track) {
    stopped = true;
    playedTime = 0.0;
    playlist.playing.parent('li').removeClass('active');
    playlist.playing = $(track);
    $(track).parent('li').addClass('active');
    playlist.index = playlist.tracks.index(track);
}

function play() {
    if (stopped) {
        audio[0].src = playlist.playing.attr('href');
        audio[0].currentTime = playedTime;
        audio[0].play();
        stopped = false;
    } else {
        audio[0].pause();
        stopped = true;
    }
}

function next() {
    var next;
    if (playlist.index === playlist.length) {
        next = playlist.tracks[0];
    } else {
        next = playlist.tracks[playlist.index + 1];
    }
    load(next);
    play();
}

function prev() {
    var prev;
    if (playlist.index === 0) {
        prev = playlist.tracks[playlist.length];
    } else {
        prev = playlist.tracks[playlist.index - 1];
    }
    load(prev);
    play();
}

function seek(){
    var margin = 100 * (playedTime / audio[0].duration);
    controls.playhead.css({'margin-left': margin + '%'});
    playedTime = audio[0].currentTime;
}

function seekToPosition(e){
    var eventX = e.pageX;
    var progressX = controls.progress.offset().left;
    var progressWidth = controls.progress.width();
    var playheadWidth = controls.playhead.width();
    var seek = (eventX - progressX - (playheadWidth / 2)) / progressWidth;
    audio[0].currentTime = audio[0].duration * seek;
}

audio.on("canplaythrough", function () {
    duration = audio[0].duration;
});

audio.on('timeupdate', seek);

controls.progress.on('click', function(e){
    seekToPosition(e);
});
