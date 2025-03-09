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
  },
  precios:{
    personal:10,
    mediana:15,
    familiar:20 
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
    const contenedorCarrito = document.querySelector('.carrito');
    if (carrito.length === 1) {
      contenedorCarrito.classList.add('solo-un-elemento');
    } else {
      contenedorCarrito.classList.remove('solo-un-elemento');
    }
  });


  const pizza = document.querySelectorAll('.pizza')
  const contenedorSeleccion = document.querySelector('.contenedor-seleccion');
  

  pizza.forEach(pizza => {
    pizza.addEventListener('click', () => {
      const rect = pizza.getBoundingClientRect();
      
      
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
        const precioSeleccionado = pizzasData.precios[tamañoSeleccionado];

        agregarAlCarrito(pizzaSeleccionada.nombre, pizzaSeleccionada.imagen,1, tamañoSeleccionado,precioSeleccionado);
        actualizarCarrito();
        });
      
      document.getElementById("cerrar-modal").addEventListener("click", () => {
        contenedorSeleccion.style.display = "none";
      });
      
    })
  })

  
  let carrito = []; 

function agregarAlCarrito(nombre, imagen, cantidad, tamaño,precio) {
  
 // if (carrito.some(pizza => pizza.nombre === nombre)) {
    const pizzaExistente = carrito.find(pizza => pizza.nombre === nombre  && pizza.tamaño === tamaño);
    if(pizzaExistente){
      pizzaExistente.cantidad++;
    }else{
      const pizza = { // Los datos internos no cambian
        nombre: nombre,
        imagen: imagen,
        cantidad: cantidad,
        tamaño:tamaño,
        precio:precio
        
      };
     
    carrito.push(pizza);
    
    }
    actualizarNotificacion();
    console.log(carrito);
  
 // }
  
}

const actualizarCarrito = () => {
  const contenedorCarrito = document.querySelector('.carrito');
  contenedorCarrito.innerHTML = ''; // Limpiar antes de renderizar
  
  if (!contenedorCarrito) {
    console.error("⚠️ No se encontró el contenedor del carrito.");
    return;
  }
  
  contenedorCarrito.innerHTML = ''; // Limpia antes de renderizar

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p>El carrito está vacío</p>';
    return;
  }
  if (carrito.length === 1) {
    contenedorCarrito.classList.add('solo-un-elemento');
  } else {
    contenedorCarrito.classList.remove('solo-un-elemento');
  }


  let contenido = ''; // Variable para acumular el HTML

  carrito.forEach(pizza => {
    contenido += `
      <div class="item-carrito">
        <img src="${pizza.imagen}" alt="${pizza.nombre}">
        <h2>${pizza.nombre}  ${pizza.tamaño}</h2>
        <p>Cantidad: ${pizza.cantidad}</p>
        <p>Precio: $${pizza.precio * pizza.cantidad}</p>
        <button class="eliminar" data-nombre="${pizza.nombre}" data-tamaño="${pizza.tamaño}">Eliminar</button>
      </div>
    `;
  });

  contenedorCarrito.innerHTML = contenido;
  
};

const contenedorCarrito = document.querySelector('.carrito');
contenedorCarrito.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar')) {   
    const nombre = event.target.dataset.nombre;
    const tamaño = event.target.dataset.tamaño;
    //console.log(`Eliminar: ${nombre}, Tamaño: ${tamaño}`);

    const pizzaIndex = carrito.findIndex(pizza => pizza.nombre === nombre && pizza.tamaño === tamaño);

    // Si la pizza existe, eliminarla del carrito
    if (pizzaIndex !== -1) {
      const cantidadPizza = carrito[pizzaIndex].cantidad;
      if(cantidadPizza>1){
        carrito[pizzaIndex].cantidad--;
      }else{
        carrito.splice(pizzaIndex, 1);
      }
      actualizarCarrito();
      console.log(carrito)
    }
  }
  actualizarNotificacion();
});
const botonPago=document.querySelector('.pago');
botonPago.addEventListener('click',()=>{
 console.log("Gracias por comprar")
 botonPago.disabled = true;
})
const botonCerrarCarrito = document.getElementById("cerrar-carrito");

botonCerrarCarrito.addEventListener("click", () => {
  const sectionCarrito = document.querySelector(".section-carrito");
  sectionCarrito.style.display = "none";
});
const navLinkCarrito = document.querySelector('a[href="#carrito"]');
const sectionCarrito = document.querySelector('.section-carrito');

navLinkCarrito.addEventListener('click', () => {
  sectionCarrito.style.display = 'flex';
});


const actualizarNotificacion = ()=>{
  const notificacion= document.querySelector('.notificacion');
  if (carrito.length >0 ){
    notificacion.textContent = carrito.length.toString();
   // console.log(notificacion.textContent)
 }else{
   notificacion.textContent = ' ';
 }
}