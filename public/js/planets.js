// Simple planets + snow animation for static site
document.addEventListener('DOMContentLoaded', () => {
  // Snow canvas
  const canvas = document.getElementById('snow');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, flakes = [];
    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function createFlakes(count){
      flakes = [];
      for (let i=0;i<count;i++){
        flakes.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: 1+Math.random()*3,
          d: Math.random()*1
        });
      }
    }
    createFlakes(Math.round((w*h)/90000));

    function update(){
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i=0;i<flakes.length;i++){
        const f = flakes[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
        ctx.fill();
        f.y += 0.5 + f.d*1.5;
        f.x += Math.sin(f.y*0.01) * 0.5;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random()*w; }
      }
      requestAnimationFrame(update);
    }
    update();
  }

  // Simple planets background
  const container = document.getElementById('planetsContainer');
  if (container) {
    const colors = ['#ff6bcb','#8b5cf6','#60a5fa','#f97316'];
    for (let i=0;i<4;i++){
      const p = document.createElement('div');
      const size = 80 + Math.random()*180;
      p.style.position = 'absolute';
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.borderRadius = '50%';
      p.style.left = Math.random()*100 + '%';
      p.style.top = Math.random()*100 + '%';
      p.style.transform = 'translate(-50%,-50%)';
      p.style.background = `radial-gradient(circle at 30% 30%, ${colors[i%colors.length]} 0%, rgba(0,0,0,0.15) 60%)`;
      p.style.opacity = 0.6;
      p.style.filter = 'blur(6px)';
      p.style.pointerEvents = 'none';
      p.style.animation = `float${i} 12s ease-in-out ${i*1.2}s infinite`;
      container.appendChild(p);
      // keyframe style
      const style = document.createElement('style');
      style.innerHTML = `@keyframes float${i}{0%{transform:translate(-50%,-50%) translateY(0);}50%{transform:translate(-50%,-50%) translateY(-30px);}100%{transform:translate(-50%,-50%) translateY(0);}}`;
      document.head.appendChild(style);
    }
  }
});
