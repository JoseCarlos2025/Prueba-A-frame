/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

    this.boxGeometryEl = document.querySelector('#boxGeometry');
    this.sphereGeometryEl = document.querySelector('#sphereGeometry');
    this.torusGeometryEl = document.querySelector('#torusGeometry');
    this.video = document.querySelector('#video')

    this.boxButtonEl = document.querySelector('#boxButton');
    this.sphereButtonEl = document.querySelector('#sphereButton');
    this.torusButtonEl = document.querySelector('#torusButton');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');
    this.videoButton = document.querySelector('#videoButton')

    this.buttonToGeometry = {
      'boxButton': this.boxGeometryEl,
      'sphereButton': this.sphereGeometryEl,
      'torusButton': this.torusGeometryEl,
    };

    this.boxButtonEl.addEventListener('click', this.onClick);
    this.sphereButtonEl.addEventListener('click', this.onClick);
    this.torusButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onClick);
    this.videoButton.addEventListener('click', this.onVideoButtonClick) // Changed the click event handler
    this.boxButtonEl.addState('pressed');

    this.onClick({ target: this.boxButtonEl });
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
    this.onVideoButtonClick = this.onVideoButtonClick.bind(this); // Added the binding for video button click
  },

  onClick: function (evt) {
    var targetEl = evt.target;

    if (targetEl === this.darkModeButtonEl) {
      if (this.el.sceneEl.is('starry')) {
        targetEl.setAttribute('button', 'label', 'Dark Mode');
        this.el.sceneEl.setAttribute('environment', { preset: 'default' });
        this.el.sceneEl.removeState('starry');
      } else {
        targetEl.setAttribute('button', 'label', 'Light Mode');
        this.el.sceneEl.setAttribute('environment', { preset: 'starry' });
        this.el.sceneEl.addState('starry');
      }
    } else {
      // Toggle the 'pressed' state of the current button.
      if (targetEl.is('pressed')) {
        targetEl.removeState('pressed');
      } else {
        targetEl.addState('pressed');
      }

      // Show or hide the corresponding geometry based on the button state.
      this.buttonToGeometry[targetEl.id].object3D.visible = targetEl.is('pressed');
    }
  },

  onVideoButtonClick: function () {
    var video = this.video;
  
    if (video.object3D.visible) {
      video.object3D.visible = false;
      video.volume = 0; // Establece el volumen a 0 para desactivar el sonido
    } else {
      video.object3D.visible = true;
      video.volume = 1; // Restablece el volumen a 1 para activar el sonido (puedes ajustar según sea necesario)
      video.play();
    }
  }
  
  
});
