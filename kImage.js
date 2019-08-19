
// Made by Jon Antepyan
// August 2019
// Helper object for image manipulation

function kImage () {
    this.height = 0;
    this.width = 0;
    this.bitmap = null;
    this.img = null;
    this.canvas = null;
    this.minfreq = 200;
    this.maxfreq = 20000;
    this.wavrate = 44100;
    this.pxs = 500;
    this.depth = 1;

    this.load_img = function (img, onload) {
        var canv = document.createElement('canvas');

        this.height = img.height;
        this.width = img.width;
        this.img = img;

        canv.width = this.width;
        canv.height = this.height;

        if (canv.getContext) {

            var ctx = canv.getContext('2d');

            ctx.clearRect(0, 0, canv.width, canv.height);
            //draw background image
            ctx.drawImage(img, 0, 0);
            //draw a box over the top
            ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
            ctx.fillRect(0, 0, canv.width, canv.height);

            this.bitmap = ctx.getImageData(0, 0, canv.width, canv.height)
        }
    };

    this.load_file = function (file, onload) {
      if (file.type == "image/jpeg" || file.type == "image/png") {
        var reader = new FileReader();
        reader.onload = (readerEvent) => {
          var image = new Image();
          image.onload = (imageEvent) => {
            this.load_img(imageEvent.target);
            onload();
          }
          image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
      } else {
        console.error('Please only select images in JPG- or PNG-format.');
      }
    };

    this.grayscale = function () {
      var imagedata = new ImageData(this.width, this.height);
      if (this.bitmap) {
        for (var i = 0; i< 4*this.width*this.height; i+=4) {
          var r = this.bitmap.data[i];
          var g = this.bitmap.data[i+1];
          var b = this.bitmap.data[i+2];
          var a = this.bitmap.data[i+3];

          var gray = 0;
          if (a !== 0) {
            //var gray = (r + g + b) / 3;
            var gray = 0.21*r + 0.72*g + 0.07*b;
            // var gray = (Math.max(r,g,b) + Math.min(r,g,b))*0.5;
          }

          imagedata.data[i] = gray;
          imagedata.data[i+1] = gray;
          imagedata.data[i+2] = gray;
          imagedata.data[i+3] = a;
        }
      }
      this.bitmap = imagedata;
    }


    this.draw = function () {
      if (this.canvas.getContext) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.putImageData(this.bitmap, 0, 0);
        ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
        ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    this.generate_audio_data = function () {

      var samplerate = this.wavrate;


      // var fpx = Math.floor(76440 / this.width);

      var samples = samplerate /this.pxs;
      var fpx = Math.floor(samples);
      var freqrange = this.maxfreq - this.minfreq;
      var interval = freqrange / this.height;
      var data = new Int16Array(this.width*fpx);
      console.log("fpx:",samples);
      console.log("interval:",fpx);

      // helper function
      function genwave(frequency, amplitude) {
        var cycles = samples * frequency / samplerate;
        var a = new Int16Array(fpx);
        for (var i=0; i<fpx; i++) {
          var x = Math.sin(cycles * 2 * Math.PI * i / samples) * amplitude;
          a[i] = Math.floor(x);
        }
        return a;
      }

      var inc = 4 * this.depth;
      // loop through pixels
      for (var x=0; x<4*this.width; x+=4) {
        var dx = x*this.height;
        var xi = (x/4)*fpx;
        var row = [];

        for (var y=0; y<4*this.height; y+=4) {
            // assumes grayscale, so just takes R value
            var amp = this.bitmap.data[y*this.height+x];
            var yinv = this.height - (y/4) - 1;

            if (amp > 0) {
              row.push(genwave( yinv * interval + this.minfreq, amp));
            }
        }

        for (var i=0; i<fpx; i++) {
          for (var j=0; j<row.length; j++) {
            data[i+xi] += row[j][i];
          }
        }
      }
      return data;
    }

    // this.make_wave = function () {
    //   var data = this.generate_audio_data();
    //   console.log(data);
    //   var wav = new Wav({ channels: 2});
    //   wav.setBuffer(data);
    //
    //   var srclist = [];
    //   while( !wav.eof() ){
    //       srclist.push(wav.getBuffer(1000));
    //   }
    //
    //   var b = new Blob(srclist, {type:'audio/wav'});
    //
    //   b.name = "test.wav";
    //   var url = URL.createObjectURL(b);
    //   return url;
    // }

    this.riff_wave = function () {
      var audio_data = this.generate_audio_data();
      console.log(audio_data);
      var sampleBits = 16;
      var numChannels=1;
      var sampleRate = 44100;

      var dataLength = audio_data.length * (sampleBits / 8);
      var buffer = new ArrayBuffer(44 + dataLength);
      var data = new DataView(buffer);
      var offset = 0;

      var writeString = function (str) {
          for (var i = 0; i < str.length; i++) {
              data.setUint8(offset + i, str.charCodeAt(i));
          }
      }

      writeString('RIFF'); offset += 4;
      data.setUint32(offset, 36 + dataLength, true); offset += 4;
      writeString('WAVE'); offset += 4;
      writeString('fmt '); offset += 4;
      data.setUint32(offset, 16, true); offset += 4;
      data.setUint16(offset, 1, true); offset += 2;
      data.setUint16(offset, numChannels, true); offset += 2;
      data.setUint32(offset, sampleRate, true); offset += 4;
      data.setUint32(offset, numChannels * sampleRate * (sampleBits / 8), true); offset += 4;
      data.setUint16(offset, numChannels * (sampleBits / 8), true); offset += 2;
      data.setUint16(offset, sampleBits, true); offset += 2;
      writeString('data'); offset += 4;
      data.setUint32(offset, dataLength, true); offset += 4;

      if(sampleBits === 8) {
          for (var i = 0; i < audio_data.length; i++, offset++) {
              var s = Math.max(-1, Math.min(1, audio_data[i]));
              var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
              val = parseInt(255 / (65535 / (val + 32768)));
              data.setInt8(offset, val, true);
          }
      } else {
          for (var i=0; i<audio_data.length; i++) {
            data.setInt8(offset, audio_data[i] & 0xFF, true);
            offset += 1;
            data.setInt8(offset, (audio_data[i]>>8) & 0xFF, true);
            offset += 1;
          }
      }
      var blob = new Blob([data], {type: 'audio/x-wav'});
      var url = URL.createObjectURL(blob);
      return url;

    }

}
