(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

   $('#music-player__mute').click(function () {
      toggleMute();
   });

   initialiseMediaPlayer();

   progressBar();
});

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

},{}]},{},[1]);
