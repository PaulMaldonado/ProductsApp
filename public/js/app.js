const formAction = document.getElementById('form-action');

formAction.addEventListener('submit', CreateProducts);


function CreateProducts(event) {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let quatity = document.getElementById('quatity').value;
    let date = document.getElementById('date').value;


    const products = {
        name: name,
        description: description,
        quatity: quatity,
        date: date
    }

    if(localStorage.getItem('productData') === null) {
        let productData = [];
        productData.push(products);
        localStorage.setItem('productData', JSON.stringify(productData));
    } else {
        let productData = JSON.parse(localStorage.getItem('productData'));
        productData.push(products);
        localStorage.setItem('productData', JSON.stringify(productData));
    }

    event.preventDefault();
    document.getElementById('form-action').reset();

    ShowProducts();

}


function DeleteProducts(name) {
    let productData = JSON.parse(localStorage.getItem('productData'));

    for(let index = 0; index < productData.length; index++) {
        if(productData[index].name === name) {
            productData.splice(index, 1);
        }
    }

    localStorage.setItem('productData', JSON.stringify(productData));
    ShowProducts();
}


function ShowProducts() {
    let productData = JSON.parse(localStorage.getItem('productData'));
    const productsView = document.getElementById('products-view');

    productsView.innerHTML = '';
    
    for(let product of productData) {
        productsView.innerHTML += `
            <div class="card z-depth-3">
                <div class="card-content">
                    <span class="card-title">Nombre: ${product.name}</span>
                    <span class="card-title">Descripción: ${product.description}</span>

                    <p>Cantindad: ${product.quatity} - ${product.name}</p>
                    <p>Fecha: ${product.date}</p>
                </div>
                <div class="card-action">
                    <a href="#" class="btn red darken-4" onclick="DeleteProducts('${product.name}')">Eliminar</a>
                    <a href="#" class="btn cyan darken-3" onclick="EditProducts('${product.name}')">Editar</a>
                </div>
            </div>
        `;
    }
}

ShowProducts();


