!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){n.start()})),t.stopBtn.addEventListener("click",(function(){n.stop()}));var n={intervalId:null,start:function(){if(!this.isActive){Date.now();this.isActive=!0,this.intervalId=setInterval((function(){Date.now();document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)}},stop:function(){clearInterval(this.intervalId),this.isActive=!1}}}();
//# sourceMappingURL=01-color-switcher.37e70984.js.map