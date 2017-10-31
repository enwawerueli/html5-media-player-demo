var audio = $('#audio');

var playlist = {};
    playlist.tracks = $('a.track');
    playlist.length = playlist.tracks.length - 1;
    playlist.index = 0;
    playlist.playing = $(playlist.tracks[playlist.index]);

var controls = {};
    controls.progress = $('#progress-bar');
    controls.timeline = $('#timeline');
    controls.elapsed = $('#elapsed');
    controls.duration = $('#duration');
    controls.preload = $('#preload-bar');
    controls.volume = $('#volume-bar');
    controls.play = $('#btn-play');
    controls.next = $('#btn-next');
    controls.prev = $('#btn-previous');
    controls.shuffle = $('#btn-shuffle');
    controls.repeat = $('#btn-repeat');
    controls.mute = $('#btn-mute');

var duration = 0.0;

var shuffle = false;

function load(track)
{
    playlist.playing.parent('li').removeClass('active');
    playlist.playing = $(track);
    audio[0].src = playlist.playing.attr('href');
    $(track).parent('li').addClass('active');
    playlist.index = playlist.tracks.index(track);
}

function play()
{
    var path = controls.play.children('img').attr('src');
    if (audio[0].paused) {
        audio[0].play();
        controls.play.children('img').attr('src', path.replace(/play/i, 'pause'));
    } else {
        audio[0].pause();
        controls.play.children('img').attr('src', path.replace(/pause/i, 'play'));
    }
}

function next()
{
    var next;
    if (playlist.index === playlist.length) {
        next = playlist.tracks[0];
    } else {
        next = playlist.tracks[playlist.index + 1];
    }
    load(next);
    play();
}

function prev()
{
    var prev;
    if (playlist.index === 0) {
        prev = playlist.tracks[playlist.length];
    } else {
        prev = playlist.tracks[playlist.index - 1];
    }
    load(prev);
    play();
}

function seek()
{
    var width = controls.progress.width() * (audio[0].currentTime / audio[0].duration);
    controls.timeline.css({'width': width + 'px'});
    controls.elapsed.text(secondsToTime(audio[0].currentTime));
}

function seekTo(e)
{
    var eventX = e.pageX;
    var progressX = controls.progress.offset().left;
    var progressWidth = controls.progress.width();
    var width;
    if (eventX > progressX + progressWidth) {
        width = progressWidth;
    } else if (e.pageX < progressX) {
        width = 0;
    } else {
        width = (eventX - progressX);
    }
    audio[0].currentTime = audio[0].duration * (width / progressWidth);
}

function secondsToTime(seconds)
{
    var hr = Math.floor(seconds / 3600);
    var min = Math.floor(((seconds / 3600) - hr) * 60);
    var sec = Math.floor(((((seconds / 3600) - hr) * 60) - min) * 60);
    var pad0 = function(num)
    {
        return num < 10 ? '0' + num : num.toString();
    }
    var sep = ':';
    return pad0(hr) + sep + pad0(min) + sep + pad0(sec);
}

function mute()
{
    var path = controls.mute.children('img').attr('src');
    audio[0].muted = !audio[0].muted;
    if (audio[0].muted) {
        controls.mute.children('img').attr('src', path.replace(/sound/i, 'mute'));
    } else {
        controls.mute.children('img').attr('src', path.replace(/mute/i, 'sound'));
    }
    controls.mute.toggleClass('inactive');
}

function shuffle()
{
    shuffle = true;
}

audio.on("loadedmetadata", function(e) {
    duration = audio[0].duration;
    controls.duration.text(secondsToTime(duration));
});

audio.on('timeupdate', seek);

// Make progress bar clickable
controls.progress.on('click', seekTo);

// Make playhead draggable
controls.timeline.on('mousedown', function(e){
    $(window).on('mousemove', seekTo);
    $(window).on('mouseup', function(){
        $(window).off('mousemove', seekTo);
    });
});

controls.volume.on('change', function(e){
    var volume = parseFloat($(this).val());
    audio[0].volume = volume;
});
