(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

  $('#music-player__mute').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  // loaderTimeline();
  initialiseMediaPlayer();

  // Run shuffle letters animation
  shuffle();

  // Run progress bar function
  progressBar();
});

// Shuffle letters function
function shuffle() {
  $('.title span').shuffleLetters();
}

// Init media player
var mediaPlayer;

function initialiseMediaPlayer() {
  mediaPlayer = document.getElementById('music');
  mediaPlayer.controls = false;
  mediaPlayer.load();
  mediaPlayer.play();
}

// Toggle mute for music
function toggleMute() {

  if (mediaPlayer.muted) {
    mediaPlayer.muted = false;
  } else {
    mediaPlayer.muted = true;
  }
}

// Update progress bar
function progressBar() {

  $('#music').on('timeupdate', function () {
    var musicTime = 100 * this.currentTime / this.duration;

    $('#progress-bar').attr("value", musicTime);

    // Callback for transition
    if(musicTime == '100') {
      switchMusic();
    }
  });
}

function switchMusic() {
  $('.title-abbr').text(musicData.song2.abbr);
  $('.music-player__desc').text(musicData.song2.desc);
  $('.music-player__song').text(musicData.song2.musicname);
  $('.bg img').attr('src', musicData.song2.bg);
  $('#music source').attr('src', musicData.song2.url);

  mediaPlayer.load();

  $('.title-abbr').shuffleLetters();

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
  var overshoot = 1;
  var period = 0.75;

  loaderTl.set(musicContent, { css: { opacity: 0 } }).to(myPath, 10, { strokeDasharray: segment.strokeDasharray('0%', '0%'), ease: Expo.easeInOut }).to(circle1, 1, { scale: 0.2, ease: Elastic.easeOut, easeParams: [overshoot, period] }).to(circle1, .5, { scale: 85, ease: Expo.easeIn }, '-=.2').to(circle2, .3, { css: { scale: 0, transformOrigin: '50% 50%' }, ease: Expo.easeIn }, '-=1.5').to(loaderSectionTop, .5, { css: { y: '-100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionBottom, .5, { css: { y: '100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionLeft, .5, { css: { x: '-100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionRight, .5, { css: { x: '100%' }, ease: Expo.easeIn }, '-=.8').set(loader, { css: { display: 'none' } }).set(musicContent, { css: { opacity: 1 } });
}

// Audio visualizer bar music player
window.onload = function () {
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
    $('.bg__one').css('transform', 'translateX(' + -frequencyData[5] / 25 + 'px)');

    $('.bg__two').css('transform', 'translateX(' + frequencyData[1] / 20 + 'px)', 'translateY(' + frequencyData[1] / 15 + 'px)');

    $('.bg__three').css('transform', 'translateX(' + -frequencyData[2] / 25 + 'px)');
  }

  function renderAudioVis() {
    requestAnimationFrame(renderAudioVis);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    $('.music-player__vis__blob--one').css('transform', 'translateY(' + -frequencyData[1] / 13 + 'px)');
    $('.music-player__vis__blob--two').css('transform', 'translateY(' + -frequencyData[2] / 13 + 'px)');
    $('.music-player__vis__blob--three').css('transform', 'translateY(' + -frequencyData[3] / 13 + 'px)');
    $('.music-player__vis__blob--four').css('transform', 'translateY(' + -frequencyData[4] / 13 + 'px)');
    $('.music-player__vis__blob--five').css('transform', 'translateY(' + -frequencyData[5] / 13 + 'px)');
    $('.music-player__vis__blob--six').css('transform', 'translateY(' + -frequencyData[6] / 13 + 'px)');
  }

  renderShake();
  renderAudioVis();
};

var musicData = {
  "song1": {
    abbr:"form",
    desc:"deciding on color palette with",
    musicname:"the notorious b.i.g - juicy",
    url:"music/biggie.mp3",
    bg: "img/biggie.jpg",
  },
  "song2": {
    abbr:"design",
    desc:"answering design questions with",
    musicname:"charles bradley - nobody but you",
    url:"music/charles.mp3",
    bg: "img/charles.jpg"
  },
}

},{}]},{},[1]);
