export default class MagnetHover {
  
    constructor(config) {
      if(config.el) this.el = config.el
      if(!this.el) return
      if(config.hoverScale === undefined) config.hoverScale = 1.15
      if(config.pull === undefined) config.pull = 0.4
      this.config = config
      this.uid = 'uid'+parseInt(Math.random()*999)
      this.hover = false
      this.listen()
      this.calculatePosition()
    }
    
    listen() {
      this.throttled = {
        onMouseMove: this.throttle((e)=>{ this.onMouseMove(e) }, 100),
        calculatePosition: this.throttle((e)=>{ this.calculatePosition(e) }, 100),
        onLeave: this.throttle((e)=>{ this.onLeave(e) }, 100),
      }
      window.addEventListener('mousemove', this.throttled.onMouseMove)
      window.addEventListener('resize', this.throttled.calculatePosition)
      document.addEventListener('scroll', this.throttled.calculatePosition)
      //this.el.addEventListener('mouseleave', this.throttled.onLeave)
    }
    
    unlisten() {    
      window.removeEventListener('mousemove', this.throttled.onMouseMove)
      window.removeEventListener('resize', this.throttled.calculatePosition)
      document.removeEventListener('scroll', this.throttled.calculatePosition)
      //this.el.removeEventListener('mouseleave', this.throttled.onLeave)
    }
    
    calculatePosition() {
      this.el.style.transform = 'translateX(0) translateY(0) scale(1)'
      const box = this.el.getBoundingClientRect()
      this.x = box.left + (box.width * 0.5)  // center of circle width
      this.y = box.top + (box.height * 0.5) 
      this.width = box.width
      this.height = box.height
    }
    
    onMouseMove(e) {
      let hover = false
      let hoverArea = (this.hover ? 0.7 : 0.5)
      let x = e.clientX - this.x
      let y = e.clientY - this.y
      let distance = Math.sqrt( x*x + y*y )
      if( distance < (this.width * hoverArea) ) {
         hover = true
          if (!this.hover) this.hover = true
          this.onHover(e.clientX, e.clientY)
      }
      if(!hover && this.hover) {
        this.onLeave()
        this.hover = false
      }
    }
    
    onHover(x, y) {
      anime.remove(this.el)
      anime({
        targets: this.el,
        translateX: (x - this.x) * this.config.pull,
        translateY: (y - this.y) * this.config.pull,
        scale: ((this.config.hoverScale==undefined) ? 1 : this.config.hoverScale),
        duration: 200,
        easing: 'easeOutCubic',
      })
    }
  
    onLeave() {
      this.hover = false
      anime.remove(this.el)
      anime({
        targets: this.el,
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 700,
        easing: 'easeOutElastic(1, .4)',
      })
    }

    throttle(n,l,t){var a,u,e,r=null,i=0;t||(t={});var o=function(){i=!1===t.leading?0:Date.now(),r=null,e=n.apply(a,u),r||(a=u=null)};return function(){var c=Date.now();i||!1!==t.leading||(i=c);var p=l-(c-i);return a=this,u=arguments,p<=0||p>l?(r&&(clearTimeout(r),r=null),i=c,e=n.apply(a,u),r||(a=u=null)):r||!1===t.trailing||(r=setTimeout(o,p)),e}}
  
    scrollTop(){ return (window.scrollY || document.scrollTop || document.clientTop || 0) }
  
}
