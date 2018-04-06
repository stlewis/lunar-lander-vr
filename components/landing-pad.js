AFRAME.registerComponent('landing-pad', {

  init: function() {
    this.onCollision = this.onCollision.bind(this);
    this.scoreHUD = document.querySelector('#score-hud');
    this.el.addEventListener('collide', this.onCollision);
    this.touched = false;
  },

  onCollision: function(e) {
    this.score = parseInt(document.querySelector('a-scene').getAttribute('score'))

    var contactNormal = e.detail.contact.ni
    var verticalContact = contactNormal.y

    if (verticalContact <= -0.5 && !this.touched ) {
      this.el.setAttribute('color', 'green');
      this.touched = true;
      this.score += 10
      document.querySelector('a-scene').setAttribute('score', this.score)
      this.scoreHUD.setAttribute('text', {value: "Score: " +  this.score})
    }
  }

});
