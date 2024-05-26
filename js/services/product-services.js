//Listar Los productos
const productList = () => { //arrow function, funcion no recibe parametros
  return fetch("http://localhost:3000/products")//recibe string con el endpoint de la API fake, el fech trabaja con programacion asincrona(promesas)
    .then((response) => response.json())
    .catch((error) => console.log(error)); //en caso de error lo coloco en la console  
};

//Agregar productos
const addProduct = (name, price, image) => {
  return fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      image: image,
    })
  }).then((res) => res.json())
    .catch((error) => console.log(error));
}

//Eliminar productos
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json" // CONEVERSION DE UN OBJETO JS A UNA CADENA JSON
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    const data = await response.json();
    console.log('Producto eliminado:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const servicesProducts = {//para exportar las arrow funcion creadas
  productList,
  addProduct,
  deleteProduct
};