const boton=document.querySelector('.boton-hamburguesa');
const nav=document.querySelector('.nav');

boton.addEventListener('click',()=>{
    nav.classList.toggle('mostrar-nav');
})
window.addEventListener('resize', () => {
    const nav = document.querySelector('.nav');
    const ventanaAnchura = window.innerWidth;
    if (ventanaAnchura >= 769) {
      nav.classList.remove('mostrar-nav');
    }
  });