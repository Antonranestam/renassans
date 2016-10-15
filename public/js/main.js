$(document).ready(function() {

  $('#music-player__mute').click(function () {
    toggleMute();
  })

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
