const contenedor_productos = document.getElementById("contenedor_productos");

let productoJuegos = [];

fetch("./stock.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    productoJuegos = data;
    crearProductos(productoJuegos);
  });

function crearProductos(array) {
    array.forEach((prod) => {
      let producto = document.createElement("div");
      producto.innerHTML = `
        <div class="card" style="width: 25rem">
        <img src="${prod.img}" class="card-img-top" alt="imagen del prodcuto" />
          <div class="card-body">
            <h5 class="card-title text-danger">${prod.nombre}</h5>
            <hr>
            <h6 class="card-text">
              ${prod.descripcion}
            </h6>
            <hr>
            <h6>$ ${(prod.precio).toLocaleString("es-ES")}</h6>
            <button id="botonFavoritos ${prod.id}" onclick="agregarAFavoritos(${prod.id})">
            Agregar
            <i class="fas fa-heart" ></i>
            </button>
            <button id="botonComprar ${prod.id}">
            Agregar
            <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        `;
  
      contenedor_productos.append(producto);
  
      const botonComprar = document.getElementById(`botonComprar ${prod.id}`);
  
      botonComprar.addEventListener("click", () => {
        agregarAlCarrito(prod.id);
  
        Toastify({
          text: `Agregado al Carrito: ${prod.nombre}`,
          duration: 4000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "linear-gradient(to right, #df0024 , #2e6db4, #00ac9f)",
          }
        }).showToast();
      });
    });
  }