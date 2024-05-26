import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = ` 
    <div class="imagen">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="çard-container-info">
                        <p class="titulo-producto">${name}</p>
                        <div class="card-container-value">
                            <p class="precio-producto">$ ${price}</p>
                            <button class="delete-button" data-id="${id}" title="Eliminar">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                     `;

    const button = card.querySelector("[data-id]");

    button.addEventListener('click', (event) => {
        const id = event.currentTarget.dataset.id;
        console.log(id);
        servicesProducts.deleteProduct(id);
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {//para presentar los productos es asincrono para q nunca pare
    try {
        const listProducts = await servicesProducts.productList();//va a esperar a servicesProducts
        listProducts.forEach(product => {//para cada producto a productContainer le agregas 1 hijo que es el card (createCard)
            productContainer.appendChild(
                createCard(product.name,
                    product.price,
                    product.image,
                    product.id)
            )
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {//Escuchador de eventos submit, tambien envio una funcion q recibe un evento como parametro para evitar el ccomportamiento por defecto
    event.preventDefault();
    //campturo los valores del input del formulario
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.addProduct(name, price, image)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
});

render();//llamo la funcion q cree

