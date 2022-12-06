const header = document.querySelector('.navbar');

window.onscroll = function () {
    var top = window.scrollY;
    if (top>=100){
        header.classList.add('navbarDark');
    }
    else{
        header.classList.remove('navbarDark');
    }
}
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;

window.addEventListener('resize', ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
const mouse ={
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
});
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        gl.fillStyle = this.color;
        gl.beginPath();
        gl.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        gl.fill();
    }
}
function handleParticles(){
    for (let i = 0; i< particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                gl.beginPath();
                gl.strokeStyle = particlesArray[i].color;
                gl.lineWidth = particlesArray[i].size;
                gl.moveTo(particlesArray[i].x, particlesArray[i].y);
                gl.lineTo(particlesArray[j].x, particlesArray[j].y);
                gl.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }

}

function animate(){
    gl.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=2;

    window.requestAnimationFrame(animate);
}
animate();
