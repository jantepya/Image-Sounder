
var t0;
var imgCanvas;

var wavesurfer;

window.onload = function() {
  document.getElementById("user_upload").addEventListener('change', fileChange, false);
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

function fileChange(e) {
  t0 = performance.now();
  var file = e.target.files[0];
  // imgCanvas.canvas = document.getElementById("image_load");
  var imgElem = document.getElementById("user_loaded_image");
  imgCanvas.load_file(file, function () {
    imgCanvas.grayscale();
    imgElem.src = imgCanvas.img.src;
    // imgCanvas.draw();
    // var data = imgCanvas.generate_audio();
    console.log(performance.now() - t0, "milliseconds");


    // document.write("<a href='"+url+"'>play</a>");

  });
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
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}
