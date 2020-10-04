(this.webpackJsonpimagesound=this.webpackJsonpimagesound||[]).push([[0],{17:function(e,t,a){e.exports=a(27)},22:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),l=(a(22),a(4)),s=a(8),c=a(7),u=a(6),d=a(14),m=a.n(d),h=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).componentDidMount=function(){this.$el=this.audioWrapper.current,this.wavesurfer=m.a.create({container:this.$el,waveColor:"grey",progressColor:"hsla(200, 100%, 30%, 0.5)",cursorColor:"blue",height:80,responsive:!0,normalize:!0})},e.handleTogglePlay=function(){e.wavesurfer&&e.wavesurfer.playPause()},e.onConvertClicked=function(){e.props.onConvertClicked()},e.render=function(){var e=null!==this.props.audioURL,t=e?r.a.createElement("a",{download:!0,href:this.props.audioURL,className:"btn btn-success btn-lg text-white"},r.a.createElement("i",{className:"fa fa-download","aria-hidden":"true"})," "):null;return this.wavesurfer&&this.props.audioURL&&this.wavesurfer.load(this.props.audioURL),r.a.createElement("div",null,r.a.createElement("div",{ref:this.audioWrapper}),r.a.createElement("hr",null),r.a.createElement("button",{disabled:!e,className:"btn btn-primary btn-lg ",onClick:this.handleTogglePlay},r.a.createElement("i",{className:"fa fa-play","aria-hidden":"true"})),r.a.createElement("button",{disabled:!this.props.ConvertButtonEnabled,className:"btn btn-primary btn-lg ",onClick:this.onConvertClicked},"Convert"),t,r.a.createElement("hr",null))},e.state={playing:!1,pos:0},e.audioWrapper=r.a.createRef(),e}return a}(r.a.Component),g=function(){return r.a.createElement("div",{id:"drag_drop_tag",className:"align-items-center"},r.a.createElement("span",null,r.a.createElement("i",{className:"fa fa-upload fa-5x","aria-hidden":"true"})),r.a.createElement("h3",null,"Drag and drop image"))},p=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).readFile=function(t){if("image/jpeg"===t.type||"image/png"===t.type){var a=new FileReader;a.onload=function(a){e.props.onImageLoaded(a.target.result),e.setState({imageSrc:a.target.result,fileName:t.name,showDragDropLabel:!1,dropZoneStyle:{height:"auto",backgroundColor:"white"}})},a.readAsDataURL(t)}},e.dropHandler=function(t){if(t.preventDefault(),t.dataTransfer.items&&"file"===t.dataTransfer.items[0].kind){var a=t.dataTransfer.items[0].getAsFile();e.readFile(a)}},e.dragOverHandler=function(e){e.preventDefault()},e.state={imageSrc:"",fileName:"Choose a file...",showDragDropLabel:!0,dropZoneStyle:null},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"input-group"},r.a.createElement("div",{className:"custom-file"},r.a.createElement("input",{type:"file",className:"custom-file-input","aria-describedby":"inputGroupFileAddon01",onChange:function(t){return e.readFile(t.target.files[0])}}),r.a.createElement("label",{id:"file_label",className:"custom-file-label",htmlFor:"inputGroupFile01"},this.state.fileName))),r.a.createElement("div",{id:"drop_zone",style:this.state.dropZoneStyle,className:"btn btn-primary",onDrop:this.dropHandler,onDragOver:this.dragOverHandler},this.state.showDragDropLabel?r.a.createElement(g,null):null,r.a.createElement("img",{src:this.state.imageSrc,id:"user_loaded_image",alt:""})))}}]),a}(r.a.Component),f=a(15),v=a(10),E=a(11),b=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).handleChange=function(t){(null===t||void 0===t?void 0:t.target)&&e.setState(Object(f.a)({},t.target.name,t.target.value))},e.state={sampleRate:44100,time:2,minfreq:200,maxfreq:22e3,depth:2},e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(v.a,null,r.a.createElement(E.a,null,r.a.createElement("div",{className:"settingsToggle"},r.a.createElement(v.a.Toggle,{as:E.a.Header,eventKey:"0"},"Settings for nerds")),r.a.createElement(v.a.Collapse,{eventKey:"0"},r.a.createElement(E.a.Body,null,r.a.createElement("table",{className:"table"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sample Rate"),r.a.createElement("td",null,r.a.createElement("select",{name:"sampleRate",value:this.state.sampleRate,onChange:this.handleChange},r.a.createElement("option",{value:"32000"},"32000 Hz"),r.a.createElement("option",{value:"44100"},"44100 Hz"),r.a.createElement("option",{value:"48000"},"48000 Hz")))),r.a.createElement("tr",null,r.a.createElement("th",null,"Time"),r.a.createElement("td",null,r.a.createElement("input",{type:"number",name:"time",min:"0.5",max:"6",value:this.state.time,step:"0.5",onChange:this.handleChange}))),r.a.createElement("tr",null,r.a.createElement("th",null,"Depth"),r.a.createElement("td",null,r.a.createElement("input",{type:"number",name:"depth",min:"1",max:"5",value:this.state.depth,step:"1",onChange:this.handleChange}))),r.a.createElement("tr",null,r.a.createElement("th",null,"Min Frequency (Hz)"),r.a.createElement("td",null,r.a.createElement("input",{type:"number",name:"minfreq",min:"0",max:"20000",value:this.state.minfreq,step:"200",onChange:this.handleChange}))),r.a.createElement("tr",null,r.a.createElement("th",null,"Max Frequency (Hz)"),r.a.createElement("td",null,r.a.createElement("input",{type:"number",name:"maxfreq",min:"0",max:"22000",value:this.state.maxfreq,step:"200",onChange:this.handleChange})))))))))}}]),a}(r.a.Component),w=function(){this.addEventListener("message",(function(a){var n=performance.now(),r=e(a.data),o=t(r,a.data.sampleRate);console.log(performance.now()-n,"milliseconds"),postMessage({data:o,status:"ok"})}));var e=function(e){for(var t=e.bitmap.data,a=e.bitmap.width,n=e.bitmap.height,r=parseFloat(e.sampleRate),o=parseFloat(e.time),i=parseFloat(e.minfreq),l=parseFloat(e.maxfreq),s=parseInt(e.depth),c=0,u=Math.round(r*o),d=new Int32Array(u),m=new Int16Array(u),h=Math.floor(u/a),g=(l-i)/n,p=Math.floor(u/100),f=0;f<u;f++){for(var v=0,E=Math.floor(f/h),b=0;b<n;b+=s){var w=t[4*(b*a+E)],C=Math.round(g*(n-b+1));v+=Math.floor(w*Math.cos(6.28*C*f/r))}d[f]=v,Math.abs(v)>c&&(c=Math.abs(v)),f%p===0&&postMessage({status:"progress",progress:f/p})}for(var y=0;y<d.length;y++)m[y]=32767*d[y]/c;return m},t=function(e,t){var a=2*e.length,n=new ArrayBuffer(44+a),r=new DataView(n),o=0,i=function(e){for(var t=0;t<e.length;t++)r.setUint8(o+t,e.charCodeAt(t))};i("RIFF"),o+=4,r.setUint32(o,36+a,!0),o+=4,i("WAVE"),o+=4,i("fmt "),o+=4,r.setUint32(o,16,!0),o+=4,r.setUint16(o,1,!0),o+=2,r.setUint16(o,1,!0),o+=2,r.setUint32(o,t,!0),o+=4,r.setUint32(o,1*t*2,!0),o+=4,r.setUint16(o,2,!0),o+=2,r.setUint16(o,16,!0),o+=2,i("data"),o+=4,r.setUint32(o,a,!0),o+=4;for(var l=0;l<e.length;l++)r.setInt8(o,255&e[l],!0),o+=1,r.setInt8(o,e[l]>>8&255,!0),o+=1;return new Blob([r],{type:"audio/x-wav"})}},C=function e(t){Object(l.a)(this,e);var a=t.toString(),n=new Blob(["("+a+")()"]);return new Worker(URL.createObjectURL(n))},y=a(16),k=(a(26),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).componentDidMount=function(){this.settings=r.a.createRef(),this.worker=new C(w),this.worker.addEventListener("message",this.handleConversionProgress),this.worker.addEventListener("error",this.handleConversionError)},e.handleConversionError=function(e){console.log(e)},e.handleConversionProgress=function(t){if("progress"===t.data.status)try{0!==t.data.progress&&t.data.progress%10!==0||e.setState({loadProgress:t.data.progress+10,audioURL:null})}catch(t){console.log("Image Sounder: onprogress error")}else if("ok"===t.data.status)try{var a=t.data.data,n=URL.createObjectURL(a);e.setState({audioURL:n,loadProgress:0,isConverting:!1})}catch(t){console.log("Image Sounder: onload error")}},e.onImageLoaded=function(t){var a=new Image;a.onload=function(t){e.setState({img:t.target})},a.src=t},e.convertImageToAudio=function(){var t;if(window.Worker){if(e.state.img&&(null===(t=e.settings)||void 0===t?void 0:t.current)){e.setState({isConverting:!0});var a=function(e){var t=new ImageData(e.width,e.height),a=4*e.width*e.height;if(e.data)for(var n=0;n<a;n+=4){var r=e.data[n],o=e.data[n+1],i=e.data[n+2],l=e.data[n+3],s=0;0!==l&&(s=.21*r+.72*o+.07*i),t.data[n]=s,t.data[n+1]=s,t.data[n+2]=s,t.data[n+3]=l}return t}(function(e){var t=document.createElement("canvas"),a=t.getContext("2d");return t.width=e.width>700?700:e.width,t.height=e.height>500?500:e.height,a.drawImage(e,0,0,t.width,t.height),a.getImageData(0,0,t.width,t.height)}(e.state.img)),n=e.settings.current.state;n.bitmap=a,e.worker.postMessage(n)}}else console.log("Your browser doesn't support web workers.")},e.state={img:null,loadProgress:0,audioURL:null,isConverting:!1},e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App container main text-center"},r.a.createElement("header",null,r.a.createElement("a",{href:"https://jonmadethings.com"},r.a.createElement("img",{src:"/img/logo.png",height:"28",style:{float:"left"},alt:""})),r.a.createElement("a",{href:"https://github.com/jantepya/Image-Sounder"},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true",style:{float:"right"}}))),r.a.createElement(p,{onImageLoaded:this.onImageLoaded}),this.state.isConverting?r.a.createElement(y.a,{now:this.state.loadProgress,label:this.state.loadProgress+"%"}):null,r.a.createElement("br",null),r.a.createElement(h,{onConvertClicked:this.convertImageToAudio,audioURL:this.state.audioURL,ConvertButtonEnabled:null!==this.state.img&&!this.state.isConverting}),r.a.createElement(b,{ref:this.settings}),r.a.createElement("hr",null),r.a.createElement("footer",null,r.a.createElement("div",{className:"text-center py-3"},"2020 Jon")))}}]),a}(r.a.Component)),R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Image-Sounder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/Image-Sounder","/service-worker.js");R?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):U(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):U(t,e)}))}}()}},[[17,1,2]]]);
//# sourceMappingURL=main.4c1d757a.chunk.js.map