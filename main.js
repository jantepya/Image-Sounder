
var t0;
var imgCanvas;
var wavesurfer;

window.onload = function() {

  $("#play_pause").attr("disabled", true);

  $("#convert").attr("disabled", true);
  $("#download").hide();
  $("#user_upload").change(fileChange);
  imgCanvas = new kImage();



  wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'grey',
    // barWidth: 2,
    // barHeight: 1, // the height of the wave
    // barGap: null, // the optional spacing
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'blue',
    // barWidth: 3,
    height: 80,
    responsive: true,
    normalize: true,
  });

  wavesurfer.on('pause', function () {
    $("#play_pause").html('<i class="fa fa-play" aria-hidden="true"></i>');
  });
  wavesurfer.on('play', function () {
    $("#play_pause").html('<i class="fa fa-pause" aria-hidden="true"></i>');
  });

  $(".card-header").click( function ( e ) {
    if (e.target.className === "card-header") {
      e.target.className = "card-header active"
    }
    else {
      e.target.className = "card-header"
    }
  });
}


function convert() {
  $("#convert").attr("disabled", true);


  imgCanvas.wavrate = $("#sample_rate").val();
  imgCanvas.maxfreq = $("#maxfreq").val();
  imgCanvas.minfreq = $("#minfreq").val();
  imgCanvas.time = $("#sample_duration").val();
  imgCanvas.depth = $("#sample_depth").val();

  // t0 = performance.now();
  //var url = imgCanvas.make_wave();
  // var url = imgCanvas.riff_wave();
  // console.log(performance.now() - t0, "milliseconds");


  // var canvas = document.getElementById("spectogram");
  // imgCanvas.canvas = canvas;
  // imgCanvas.draw();
  function onload ( url ) {
    $("#progress_bar").hide();
    $("#progress_bar").css({ "width": "0%"});
    $("#progress_bar").text( "" );

    wavesurfer.on('ready', function () {
        $("#play_pause").attr("disabled", false);
        $("#download").attr("href", url);
        $("#download").show();
    });

    wavesurfer.load(url);
  }

  function onprogress ( i ) {
    $("#progress_bar").css({ "width": i+"%"});
    $("#progress_bar").text( i + "%");
  }

  imgCanvas.start_process( onload , onprogress);

  $("#progress_bar").show();
}

function load_image(file) {
  $("#drag_drop_tag").hide();
  $("#drop_zone").css({"height": "auto", "background-color": "white"});
  $("#file_label").text(file.name);
  var imgElem = document.getElementById("user_loaded_image");

  imgCanvas.load_file(file, function () {
    $("#convert").attr("disabled", false);

    imgCanvas.grayscale();
    imgElem.src = imgCanvas.img.src;

  });
}

function fileChange(e) {

  var file = e.target.files[0];
  load_image(file);
}

function dragOverHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function dropHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
      // If dropped items aren't files, reject them
    if (ev.dataTransfer.items[0].kind === 'file') {
        var file = ev.dataTransfer.items[0].getAsFile();
        load_image(file);
    }
  }
}
