const pizzasData = {
  marinera: {
    nombre: "Marinera",
    imagen: "./assets/marinera.webp",
    ingredientes: ["Tomate", "Mozzarella", "Albahaca fresca"],
  },
  pepperoni: {
    nombre: "Pepperoni",
    imagen: "./assets/peperoni.webp",
    ingredientes: ["Tomate", "Mozzarella", "Pepperoni"],
  },
  quesos: {
    nombre: "Cuatro Quesos",
    imagen: "./assets/cuatro-quesos.webp",
    ingredientes: ["Mozzarella", "Gorgonzola", "Parmesano", "Ricotta"],
  },
  barbacoa: {
    nombre: "Barbacoa",
    imagen: "./assets/barbacoa.webp",
    ingredientes: ["Tomate", "Mozzarella", "Carne de res", "Cebolla", "Salsa barbacoa"],
  },
  hawaiana: {
    nombre: "Hawaiana",
    imagen: "./assets/hawaina.webp",
    ingredientes: ["Tomate", "Mozzarella", "Jamón", "Piña"],
  },
  vegetariana: {
    nombre: "Vegetariana",
    imagen: "./assets/vegetariana.webp",
    ingredientes: ["Tomate", "Mozzarella", "Pimientos", "Champiñones", "Cebolla", "Aceitunas"],
  }
};



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


  const pizza = document.querySelectorAll('.pizza')
  const contenedorSeleccion = document.querySelector('.contenedor-seleccion');
  

  pizza.forEach(pizza => {
    pizza.addEventListener('click', () => {
      const rect = pizza.getBoundingClientRect();
      console.log(rect);
      
      contenedorSeleccion.style.position = 'fixed'; 
      contenedorSeleccion.style.left = '50%';
      contenedorSeleccion.style.top = '50%';
      contenedorSeleccion.style.transform = 'translate(-50%, -50%)';
      contenedorSeleccion.style.zIndex = '1000';
      contenedorSeleccion.style.display = 'block';

      

      const nombre = pizza.querySelector('h3').textContent;
      const pizzaSeleccionada = pizzasData[nombre.toLowerCase()];
      contenedorSeleccion.innerHTML = `
       <button id="cerrar-modal" style="
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;">X</button>
      <img src="${pizzaSeleccionada.imagen}" alt="${pizzaSeleccionada.nombre}">
      <h2>${pizzaSeleccionada.nombre}</h2>
      <ul>
        ${pizzaSeleccionada.ingredientes
          .map((ingrediente) => `<li>${ingrediente}</li>`)
          .join("")}
      </ul>
      <label for="tamaño">Tamaño:</label>
         <select id="tamaño">
           <option value="personal">Personal</option>
           <option value="mediana">Mediana</option>
           <option value="familiar">Familiar</option>
         </select>
       <button id="agregar-carrito">Agregar al carrito</button>

      `;
      const agregarCarrito = document.getElementById("agregar-carrito");
      agregarCarrito.addEventListener("click", () => {
        const tamañoSeleccionado=document.getElementById("tamaño").value;
        agregarAlCarrito(pizzaSeleccionada.nombre, pizzaSeleccionada.imagen,1, tamañoSeleccionado);
       
        });
      
      document.getElementById("cerrar-modal").addEventListener("click", () => {
        contenedorSeleccion.style.display = "none";
      });
      
    })
  })

  
  let carrito = []; 

function agregarAlCarrito(nombre, imagen,precio,tamaño) {
  if (carrito.some(pizza => pizza.nombre === nombre)) {
    const pizzaExistente = carrito.find(pizza => pizza.nombre === nombre  && pizza.tamaño === tamaño);
    if(pizzaExistente){
      pizzaExistente.cantidad++;
    }else{
      const pizza = { // Los datos internos no cambian
        nombre: nombre,
        imagen: imagen,
        precio: precio,
        tamaño:tamaño,
        cantidad: 1 // Este sí puede cambiar luego
      };
      carrito.push(pizza);
      console.log(carrito);
    }
  
  }
 
  
}
