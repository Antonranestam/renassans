$(document).ready(function() {

  $('#music-player__mute').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  })

  loaderTimeline();
  initialiseMediaPlayer();
  shuffle();
});

function shuffle() {
  $('.title').shuffleLetters();
}

var mediaPlayer;

// Init media player
function initialiseMediaPlayer() {
   mediaPlayer = document.getElementById('music');
   mediaPlayer.controls = false;
   mediaPlayer.load();
}

// Toggle mute for music
function toggleMute() {

   if (mediaPlayer.muted) {
      mediaPlayer.muted = false;
   }
   else {
      mediaPlayer.muted = true;
   }
}

// Update progress bar
function progressBar() {
  $('#music').on('timeupdate', function() {
    $('#progress-bar').attr("value", 100 * this.currentTime / this.duration);
  });
}

// // Animate loader
function loaderTimeline() {
  var loaderTl = new TimelineMax();
  var myPath = document.getElementById("loader");
  segment = new Segment(myPath);
  var loader = $('.loader-wrapper');
  var circle1 = $('.circle-1');
  var circle2 = $('.circle-2');
  var musicContent = $('.music .title');
  var loaderSectionTop = $('.loader-wrapper__section.top');
  var loaderSectionBottom = $('.loader-wrapper__section.bottom');
  var loaderSectionLeft = $('.loader-wrapper__section.left');
  var loaderSectionRight = $('.loader-wrapper__section.right');
  var overshoot=1;
  var period=0.75;

  loaderTl.set(musicContent, {css: {opacity: 0}})
  .to(myPath, 10, { strokeDasharray: segment.strokeDasharray('0%', '0%'), ease: Expo.easeInOut})
  .to(circle1, 1,{scale:0.2, ease:Elastic.easeOut, easeParams:[overshoot,period]})
  .to(circle1,.5,{scale:85, ease: Expo.easeIn}, '-=.2')
  .to(circle2, .3, {css:{scale:0, transformOrigin: '50% 50%'}, ease: Expo.easeIn}, '-=1.5')
  .to(loaderSectionTop, .5, {css: {y:'-100%'}, ease: Expo.easeIn}, '-=.8')
  .to(loaderSectionBottom, .5, {css: {y:'100%'}, ease: Expo.easeIn}, '-=.8')
  .to(loaderSectionLeft, .5, {css: {x:'-100%'}, ease: Expo.easeIn}, '-=.8')
  .to(loaderSectionRight, .5, {css: {x:'100%'}, ease: Expo.easeIn}, '-=.8')
  .set(loader, {css:{display: 'none'}})
  .set(musicContent, {css: {opacity: 1}})
}

// Audio visualizer bar music player
window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('music');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);

  // get data
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Render shake for backgrounds
  function renderShake() {
    requestAnimationFrame(renderShake);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    // Animate transform
    $('.bg__one').css('transform', 'translateX(' + (- frequencyData[5]) / 20 + 'px)');

    $('.bg__two').css('transform', 'translateX(' + (frequencyData[1]) / 15 + 'px)');

    $('.bg__three').css('transform', 'translateX(' + (- frequencyData[2]) / 15 + 'px)');
  }

  function renderAudioVis() {
    requestAnimationFrame(renderAudioVis);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    $('.music-player__vis__blob--one').css('transform', 'translateY(' + (- frequencyData[1]) / 13 + 'px)');
    $('.music-player__vis__blob--two').css('transform', 'translateY(' + (- frequencyData[2]) / 13 + 'px)');
    $('.music-player__vis__blob--three').css('transform', 'translateY(' + (- frequencyData[3]) / 13 + 'px)');
    $('.music-player__vis__blob--four').css('transform', 'translateY(' + (- frequencyData[4]) / 13 + 'px)');
    $('.music-player__vis__blob--five').css('transform', 'translateY(' + (- frequencyData[5]) / 13 + 'px)');
    $('.music-player__vis__blob--six').css('transform', 'translateY(' + (- frequencyData[6]) / 13 + 'px)');
  }

  renderShake();
  renderAudioVis();
};
