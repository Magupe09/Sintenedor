const pizzasData = {
  margarita: {
    nombre: "Marinera",
    imagen: "./assets/marinera.webp",
    ingredientes: ["Tomate", "Mozzarella", "Albahaca fresca"],
  },
  pepperoni: {
    nombre: "Pepperoni",
    imagen: "./assets/peperoni.webp",
    ingredientes: ["Tomate", "Mozzarella", "Pepperoni"],
  },
  cuatroQuesos: {
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

  
  const contenedorSeleccion = document.querySelector('.contenedor-seleccion');
  const actualizarSeleccion = (clave) => {
   
    const pizzaSeleccionada = pizzasData[clave]; // Obtenemos la info de la pizza
    
    if (!pizzaSeleccionada) return; // Si no existe, no hacemos nada
  
    contenedorSeleccion.innerHTML = `
      <img src="${pizzaSeleccionada.imagen}" alt="${pizzaSeleccionada.nombre}">
      <h3>${pizzaSeleccionada.nombre}</h3>
      <p><strong>Ingredientes:</strong> ${pizzaSeleccionada.ingredientes.join(', ')}</p>
      <label>
        <input type="radio" name="tamano" value="personal" checked> Personal
      </label>
      <label>
        <input type="radio" name="tamano" value="familiar"> Familiar
      </label>
      <button>Añadir al carrito</button>
    `;
  };

  const formatearClave = (nombre) => {
    return nombre
      .toLowerCase() // 1️⃣ Convertimos todo el texto a minúsculas
      .split(' ') // 2️⃣ Dividimos la cadena en un array separando por los espacios
      .map((palabra, index) =>
        index === 0 
          ? palabra // 3️⃣ Si es la primera palabra, la dejamos en minúsculas
          : palabra.charAt(0).toUpperCase() + palabra.slice(1) // 4️⃣ Las demás palabras las convertimos a CamelCase
      )
      .join(''); // 5️⃣ Unimos todas las palabras en una sola cadena sin espacios
  };

  const pizzas=document.querySelectorAll('.pizza');

  pizzas.forEach((pizza)=>{
    pizza.addEventListener('click',()=>{   
      const nombre = pizza.querySelector('h3').textContent;   
      const clavePizza= formatearClave(nombre);
      
       actualizarSeleccion(clavePizza)
 
     })
     
    
  })