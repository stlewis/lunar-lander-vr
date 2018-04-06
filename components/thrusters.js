AFRAME.registerComponent('thrusters', {
  schema: {
    fuelLevel: {default: 500 },
    thrusterVelocityMax: {default: 90 },
  },

  init: function() {
    this.keyboardControls = this.el.components['keyboard-controls'];
    this.movementControls = this.el.components['movement-controls'];
    this.body             = this.el.components['kinematic-body'].body;
    this.fuelHUD = document.querySelector('#fuel-hud');
    this.speedHUD = document.querySelector("#speed-hud")
    this.altitudeHUD = document.querySelector("#altitude-hud")
    // We also need to decide what the "safe" landing range in in terms of speed.
    this.fuelHUD.setAttribute('text', { value: "Fuel: " + this.data.fuelLevel });
    this.speedHUD.setAttribute('text', { value: "Vertical Speed: 0"});
    this.altitudeHUD.setAttribute('text', { value: "AGL: 0"});

    this.thrusterEngagedSecs = 0;
  },

  tick: function(globalUp, timeDelta) {
    this.speedHUD.setAttribute('text', {value: "Vertical Speed: " + Math.round(this.body.velocity.y) })
    this.altitudeHUD.setAttribute('text', {value: "AGL: " + Math.round(this.body.position.y) })
    if(this.keyboardControls.isPressed('Space') && this.data.fuelLevel > 0){

      this.data.fuelLevel = this.data.fuelLevel - 1;
      this.fuelHUD.setAttribute('text', { value: "Fuel: " + this.data.fuelLevel });

      if(this.movementControls.velocity.y < this.data.thrusterVelocityMax){
        this.thrusterEngagedSecs = this.thrusterEngagedSecs + (timeDelta/1000)
        this.movementControls.velocity.y = (8 * this.thrusterEngagedSecs);
      }else{
        this.movementControls.y = this.data.thrusterVelocityMax;
      }

    }else{
      this.thrusterEngagedSecs = 0;
      //this.movementControls.velocity.y = 0;
    }
  }

});
