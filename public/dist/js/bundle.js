(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

  $('#music-player__mute').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  initialiseMediaPlayer();

  progressBar();

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
  } else {
    mediaPlayer.muted = true;
  }
}

// Update progress bar
function progressBar() {
  $('#music').on('timeupdate', function () {
    $('#progress-bar').attr("value", 100 * this.currentTime / this.duration);
  });
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
    $('.bg__one').css('transform', 'translateX(' + -frequencyData[5] / 20 + 'px)');

    $('.bg__two').css('transform', 'translateX(' + frequencyData[1] / 15 + 'px)');

    $('.bg__three').css('transform', 'translateX(' + -frequencyData[2] / 15 + 'px)');
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

},{}]},{},[1]);
