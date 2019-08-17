
// Made by Jonathan Antepyan
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
    this.pxs = 900;

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
            ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
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

          var gray = (r + g + b) / 3;

          imagedata.data[i] = gray;
          imagedata.data[i+1] = gray;
          imagedata.data[i+2] = gray;
          imagedata.data[i+3] = this.bitmap.data[i+3];
        }
      }
      this.bitmap = imagedata;
    }

    this.resize = function (x, y) {

    }

    this.draw = function () {
      if (this.canvas.getContext) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.putImageData(this.bitmap, 0, 0);
        ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    this.generate_audio = function () {

      var samplerate = this.wavrate;
      var fpx = Math.floor(samplerate /this.pxs);
      var freqrange = this.maxfreq - this.minfreq;
      var interval = freqrange / this.height;
      var data = new Int16Array(this.width*fpx);


      // helper function
      function genwave(frequency, amplitude) {
        var cycles = fpx * frequency / samplerate;
        var a = new Int16Array(fpx);
        for (var i=0; i<fpx; i++) {
          var x = Math.sin(cycles * 2 * Math.PI * i / fpx) * amplitude;
          a[i] = Math.floor(x);
        }
        return a;
      }

      // loop through pixels
      for (var x=0; x<4*this.width; x+=4) {
        var dx = x*this.height;
        var xi = (x/4)*fpx;
        var row = [];

        for (var y=0; y<4*this.height; y+=4) {
            // assumes grayscale, so just takes R value
            var amp = this.bitmap.data[dx+y];
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

}
