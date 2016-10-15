$(document).ready(function() {
  $('#music-player__mute').click(function () {
    toggleMute();
  })

  initialiseMediaPlayer();
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
   var btn = document.getElementById('music-player__mute');

   if (mediaPlayer.muted) {
      mediaPlayer.muted = false;
   }
   else {
      mediaPlayer.muted = true;
   }
}
