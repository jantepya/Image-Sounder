
var t0;
var imgCanvas;
var wavesurfer;

window.onload = function() {

  $("#play_pause").attr("disabled", true);

  $("#convert").attr("disabled", true);
  $("#download").hide();
  $("#user_upload").change(fileChange);
  imgCanvas = new imgCanvas();



  wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'grey',
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'blue',
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


/// After loading is done or cancelled
function reset_view() {
  $("#progress_bar").hide();
  $("#progress_bar").css({ "width": "0%"});
  $("#progress_bar").text( "" );

  $("#convert").text("Convert");
  $("#convert").attr("onclick","convert()");
}


function cancel_convert() {
  imgCanvas.kill_process();
  reset_view();
}

function validate_number( e ) {

  if ( isNaN( e.value) || e.value === "" ) {
    $( "#" + e.id ).val( e.defaultValue );
  }
  else if ( parseFloat( e.value ) < parseFloat( e.min ) ) {
    $( "#" + e.id ).val( e.min );
  }
  else if ( parseFloat(e.value) > parseFloat(e.max) ) {
    $( "#" + e.id ).val( e.max );
  }
}

function validate_integer( e ) {
  $( "#" + e.id ).val( Math.floor( e.value ) );
}


/// convert img to audio
function convert() {
  imgCanvas.wavrate = $("#sample_rate").val();
  imgCanvas.maxfreq = $("#maxfreq").val();
  imgCanvas.minfreq = $("#minfreq").val();
  imgCanvas.time = $("#sample_duration").val();
  imgCanvas.depth = $("#sample_depth").val();

  $("#convert").text("Cancel");
  $("#convert").attr("onclick","cancel_convert()");


  function onload ( url ) {

    reset_view();

    wavesurfer.on('ready', function () {
        $("#play_pause").attr("disabled", false);
        $("#download").attr("href", url);
        $("#download").attr("download", imgCanvas.name + ".wav");
        $("#download").show();
    });

    wavesurfer.load(url);
    imgCanvas.kill_process();
  }

  function onprogress ( i ) {
    $("#progress_bar").css({ "width": i+"%"});
    $("#progress_bar").text( i + "%");
  }

  imgCanvas.start_process( './src/audioWorker.js', onload , onprogress);

  $("#progress_bar").show();
}


/// load and display image
function load_image(file) {
  $("#drag_drop_tag").hide();
  $("#drop_zone").css({"height": "auto", "background-color": "white"});
  $("#file_label").text(file.name);
  var imgElem = document.getElementById("user_loaded_image");

  var i = file.name.lastIndexOf(".");
  imgCanvas.name = file.name.substring(0, i);

  imgCanvas.load_file(file, function () {
    $("#convert").attr("disabled", false);

    imgCanvas.resize( 440, 400 );
    imgCanvas.grayscale();
    imgElem.src = imgCanvas.img.src;

    // imgCanvas.canvas = document.getElementById("spectogram");
    // imgCanvas.draw();

  });
}

function fileChange(e) {

  var file = e.target.files[0];

  if ( file.type === "image/png" || file.type === "image/jpeg" ) {
    load_image(file);
  }
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
