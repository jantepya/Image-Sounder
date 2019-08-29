
// ---- Main Function  -----
onmessage = function(e) {

  var t0 = performance.now();
  var audio_data = generate_audio_data( e.data );

  var wave_file = generate_wave( audio_data , e.data.wavrate );

  console.log(performance.now() - t0, "milliseconds");

  postMessage({ "data":wave_file, "status":"ok" });
}


function generate_audio_data( data ) {

  var img_data = data["bitmap"].data;
  var width = data["bitmap"].width;
  var height = data["bitmap"].height;
  var sampleRate = data["wavrate"];
  var duration = data["time"];
  var minfreq = data["minfreq"];
  var maxfreq = data["maxfreq"];

  //////////////////////////////////////////

  var highest_freq = 0;
  var channels = 1;
  var numSamples = Math.round(sampleRate * duration);

  var tmpData = new Int32Array(numSamples);
  var data = new Int16Array(numSamples);
  var samplesPerPixel = Math.floor(numSamples / width);
  var C = (maxfreq - minfreq) / height;
  var yFactor = 1;

  var percent = Math.floor(numSamples/100);

  for (var x = 0; x < numSamples; x++) {
      var rez = 0;
      var pixel_x = Math.floor(x / samplesPerPixel);

      for (var y = 0; y < height; y += yFactor) {
          var pixel_index = (y * width + pixel_x) * 4;
          var r = img_data[pixel_index];

          var volume = Math.pow(3 * r * 100 / 765, 2);

          var freq = Math.round(C * (height - y + 1));
          rez += Math.floor(r * Math.cos(freq * 6.28 * x / sampleRate));
      }

      tmpData[x] = rez;

      if (Math.abs(rez) > highest_freq) {
          highest_freq = Math.abs(rez);
      }

      if (x % percent === 0) {
        postMessage({ "status":"progress", "progress":x/percent });
      }
  }

  for (var i = 0; i < tmpData.length; i++) {
      data[i] = (32767 * tmpData[i] / highest_freq); //32767
  }
  return data;


}

function generate_wave( audio_data, sampleRate ) {

  var sampleBits = 16;
  var numChannels = 1;

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
