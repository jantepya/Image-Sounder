
// Made by Jon Antepyan
// August 2019
// Helper object for image manipulation

const imgCanvas = function () {
    this.height = 0;
    this.width = 0;
    this.bitmap = null;
    this.img = null;
    this.canvas = null;
    this.minfreq = 200;
    this.maxfreq = 20000;
    this.wavrate = 44100;
    this.time = 2;
    this.depth = 2;
    this.audio_blob = null;
    this.name = "audio";
    this.audio_worker = null;

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
            var gray = 0.21*r + 0.72*g + 0.07*b;
          }

          imagedata.data[i] = gray;
          imagedata.data[i+1] = gray;
          imagedata.data[i+2] = gray;
          imagedata.data[i+3] = a;
        }
      }
      this.bitmap = imagedata;
    }

    this.resize = function ( newWidth, newHeight ) {
      var imagedata = new ImageData( newWidth, newHeight);


      var oc = document.createElement('canvas'),
      octx = oc.getContext('2d');

      oc.width = newWidth;
      oc.height = newHeight;
      octx.drawImage(this.img, 0, 0, oc.width , oc.height );


      this.bitmap = octx.getImageData(0, 0, newWidth, newHeight);
      this.width = newWidth;
      this.height = newHeight;
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


    this.start_process = function ( process, onload, onprogress) {
      if (window.Worker) {
        var myWorker = new Worker( process );

        myWorker.onmessage = function(e) {

          if (e.data.status === "ok") {
            try {
              this.audio_blob = e.data.data;
              var url = URL.createObjectURL(this.audio_blob);
              onload( url );
            } catch ( e ) {
              console.log( "Image Sounder: onload error" );
            }
          }
          else if (e.data.status === "progress") {
            try {
              onprogress( e.data.progress );
            } catch ( e ) {
              console.log( "Image Sounder: onprogress error" );
            }
          }
      	}

        var data = {
          "bitmap": this.bitmap,
          "wavrate": this.wavrate,
          "time": this.time,
          "minfreq": this.minfreq,
          "maxfreq": this.maxfreq,
          "depth": this.depth,
        }

        myWorker.postMessage(data);
        this.audio_worker = myWorker;
      } else {
      	console.log('Your browser doesn\'t support web workers.')
      }
    }

    this.kill_process = function () {
      this.audio_worker.terminate();
    }
}
