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

window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('music');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);

  // get data
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Render
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    $('.bg__one').css('transform', 'translateX(' + (- frequencyData[5]) / 10 + 'px)');
    $('.bg__two').css('transform', 'translateX(' + (- frequencyData[1]) / 12 + 'px)');
    $('.bg__three').css('transform', 'translateX(' + (- frequencyData[2]) / 9 + 'px)');
  }

  renderFrame();
};
