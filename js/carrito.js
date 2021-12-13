const contenedor_carrito = document.getElementById("contenedor_carrito");
const cantidad_prod_carrito = document.getElementById("cantidad_prod_carrito");
const precio_total = document.getElementById("precio_total");
const vaciar_carrito = document.getElementById("vaciar_carrito");
const boton_carrito = document.getElementById("boton_carrito");
const boton_checkout = document.getElementById("boton_checkout");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  contenedor_carrito.innerHTML = "";

  carrito.forEach((prod) => {
    let div = document.createElement("div");
    div.classList = "row text-center align-items-center carritoDisplay";
    div.innerHTML = `
    <div class="col-6">
    <h5 class="card-title text-danger">${prod.nombre}</h5>
    <h5>${prod.descripcion}</h5>
    </div>
    <div class="col d-flex justify-content-center">
    <i class="fas fa-plus-circle fa-xs text-success" onclick="agregarAlCarrito(${prod.id})" ></i>
    <h5 class="mx-2">${prod.cantidad}</h5>
    <i class="fas fa-minus-circle fa-xs text-danger" onclick="eliminarDelCarrito(${prod.id})"></i>
    </div>
    <div class="col">
    <h5>$ ${(prod.precio * prod.cantidad).toLocaleString("es-ES")}</h5>
    </div>
    <div class="col">
    <button onclick = "eliminarDelCarrito(${prod.id})"><i class="fas fa-trash"></i></button>
    </div>
    `;
    contenedor_carrito.append(div);
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  cantidad_prod_carrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)

  precio_total.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad,0).toLocaleString("es-ES");
}

// ============================================== FUNCIONES ============================================== //

function agregarAlCarrito(prodId) {
  let prodCarrito = carrito.find((prod) => prod.id === prodId);

  if (prodCarrito) {
    prodCarrito.cantidad += 1;
  } else {
    let {id, nombre, precio, descripcion} = productoJuegos.find((prod) => prod.id === prodId);
    carrito.push({id: id, nombre: nombre, precio: precio, descripcion: descripcion, cantidad: 1,});
  }

  mostrarCarrito();
}

function eliminarDelCarrito(prodId) {
  let prodCarrito = carrito.find((prod) => prod.id == prodId);

  prodCarrito.cantidad -= 1;

  if (prodCarrito.cantidad === 0) {
    let indice = carrito.indexOf(prodCarrito);
    carrito.splice(indice, 1);
  }

  mostrarCarrito();
}

// ============================================== EVENTOS ============================================== //

boton_checkout.addEventListener("click", (event) => {
  event.stopPropagation();

  if (carrito.length === 0) {
    Toastify({
      text: `No hay productos en el carrito`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();
  } else {
    let carritoMercadoPago = carrito.map((prod) => {
      return {
        title: prod.nombre,
        description: prod.descripcion,
        picture_url: "",
        category_id: prod.id,
        quantity: 1,
        currency_id: "ARS",
        unit_price: prod.precio,
      };
    });

    fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          Authorization: "Bearer TEST-6924477112551454-120507-20964df528565da6c7064e4699b0e4bb-67790635",
        },
        body: JSON.stringify({
          items: carritoMercadoPago,
          back_urls: {
            success: window.location.href,
            failure: window.location.href,
          },
        }),
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        window.location.replace(data.init_point);

        carrito = [];

        mostrarCarrito();
      });
  }
});

vaciar_carrito.addEventListener("click", (event) => {
  event.stopPropagation();

  if (carrito.length === 0) {
    Toastify({
      text: `No hay productos en el carrito`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();
  } else {
    Toastify({
      text: `Productos eliminados del carrito`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #df0024, #df0024)",
      },
      duration: 2000,
    }).showToast();
  }

  carrito = [];

  mostrarCarrito();
});

boton_carrito.addEventListener("click", () => {
  mostrarCarrito();

});