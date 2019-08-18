
var t0;
var imgCanvas;
var wavesurfer;

window.onload = function() {
  $("#convert").attr("disabled", true);
  $("#user_upload").change(fileChange);
  imgCanvas = new kImage();

  wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
    barWidth: 2,
    barHeight: 1, // the height of the wave
    barGap: null // the optional spacing
  });
}


function make_wave() {
  $("#convert").attr("disabled", true);
  var data = imgCanvas.generate_audio();
  var wav = new Wav({ channels: 1});
  wav.setBuffer(data);

  var srclist = [];
  while( !wav.eof() ){
      srclist.push(wav.getBuffer(512));
  }

  var b = new Blob(srclist, {type:'audio/wav'});
  var URLObject = window.webkitURL || window.URL;
  var url = URL.createObjectURL(b);
  console.log(url)
  wavesurfer.on('ready', function () {
      wavesurfer.play();
  });

  wavesurfer.load(url);
}

function load_image(file) {
  $("#drag_drop_tag").hide();
  $("#drop_zone").css({"height": "auto", "background-color": "white"});
  var imgElem = document.getElementById("user_loaded_image");
  imgCanvas.load_file(file, function () {
    $("#convert").attr("disabled", false);
    imgCanvas.grayscale();
    imgElem.src = imgCanvas.img.src;
    console.log(performance.now() - t0, "milliseconds");
  });
}

function fileChange(e) {
  t0 = performance.now();
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
