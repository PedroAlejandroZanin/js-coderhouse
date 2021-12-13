const contenedor_favoritos = document.getElementById("contenedor_favoritos");
const boton_favoritos = document.getElementById("boton_favoritos");
const vaciar_favoritos = document.getElementById("vaciar_favoritos");
const enviar_fav_completo_carrito = document.getElementById("enviar_fav_completo_carrito");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function mostrarFavoritos() {
  contenedor_favoritos.innerHTML = "";

  favoritos.forEach((prod) => {
    let div = document.createElement("div");
    div.classList = "row carritoDisplay mx-auto";
    div.innerHTML = `
    <div class="col-6">
    <h5 class="card-title text-danger">${prod.nombre}</h5>
    <h5>${prod.descripcion}</h5>
    </div>
    <div class="col">
    <button onclick="enviarFavoritoAlCarrito(${prod.id})">
    <i class="fas fa-shopping-cart"></i>
    </button>
    </div>
    <div class="col">
    <button onclick="eliminarDeFavoritos(${prod.id})">
    <i class="fas fa-heart-broken"></i>
    </button>
    </div>
    `;
    contenedor_favoritos.append(div);

  });

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


// ============================================== FUNCIONES ============================================== //

function agregarAFavoritos(prodId) {
  let productoDuplicado = favoritos.find((prod) => prod.id === prodId);

  if (productoDuplicado) {

    Toastify({
      text: `El producto ya fue agregado a Favoritos`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();

  } else {

    let productoAFavoritos = productoJuegos.find((prod) => prod.id === prodId);
    favoritos.push(productoAFavoritos);

    Toastify({
      text: `Agregado a Favoritos: ${productoAFavoritos.nombre}`,
      duration: 4000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #df0024, #f3c300)",
      },
    }).showToast();

    mostrarFavoritos();
  }
}

function eliminarDeFavoritos(prodId) {
  const prodFavorito = favoritos.find((prod) => prod.id === prodId);
  const indice = favoritos.indexOf(prodFavorito);
  favoritos.splice(indice, 1);

  mostrarFavoritos();
}

function enviarFavoritoAlCarrito(prodId) {
  const prodFavorito = favoritos.find((prod) => prod.id === prodId);

  let {id, nombre, precio, descripcion} = prodFavorito
  carrito.push({id: id, nombre: nombre, precio: precio, descripcion: descripcion, cantidad: 1,})

  const indice = favoritos.indexOf(prodFavorito);
  favoritos.splice(indice, 1);

  mostrarFavoritos();
}

// ============================================== EVENTOS ============================================== //

vaciar_favoritos.addEventListener("click", (event) => {
  event.stopPropagation();

  if (favoritos.length === 0) {
    Toastify({
      text: `No hay productos en Favoritos`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();
  } else {
    Toastify({
      text: `Productos eliminados de Favoritos`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();
  }

  favoritos = [];

  mostrarFavoritos();
});

enviar_fav_completo_carrito.addEventListener("click", (prodId) => {
  if (favoritos.length == 0) {

    Toastify({
      text: `No hay productos en Favoritos`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();

  } else {

    for (let i = 0; i < favoritos.length; i++) {
      let {id, nombre, precio, descripcion} = favoritos[i];
      carrito.push({id: id,nombre: nombre,precio: precio,descripcion: descripcion,cantidad: 1,});
    }

    Toastify({
      text: `Productos enviados al Carrito`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00ac9f, #00ac9f)",
      },
      duration: 2000,
    }).showToast();

    favoritos = [];

    mostrarFavoritos();
  }
});

boton_favoritos.addEventListener("click", () => {
  mostrarFavoritos();
});