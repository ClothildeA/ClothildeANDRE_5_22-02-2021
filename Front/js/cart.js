let url = 'http://localhost:3000/api/cameras';
let itemSelection = document.getElementById('main_item-selection');
let total = 0; //variable de la quantité totale
console.log(itemSelection);
quantityDisplay()

function quantityDisplay () {

    if (localStorage.getItem('panier') !== null) {
        let itemDetail = JSON.parse(localStorage.getItem('panier')); //on récupère le panier en le 'traduisant' grâce à parse
        total = 0; //on initialise la quantité à 0

        let html = '';

        itemDetail.forEach ((product, index) => {

        total = total + (product.price * product.qty);

        html += 
            `<div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Option: ${product.lense}</p>
                    <p class="card-text">Prix: ${(product.price * product.qty)} €</p>
                    <p class="card-text">Quantité:
                    <button type="button" class="btn btn-light btn-sm" id="decrease_btn ${index}"> - </button>
                     ${product.qty} 
                    <button type="button" class="btn btn-light btn-sm" id="increase_btn ${index}"> + </button></p>
                </div>
            </div>`
        itemSelection.innerHTML = html;        
        })
        
        const decrease = document.getElementById('decrease_btn');
        decrease.addEventListener ('click', e => {
            decreaseQty(e, item);
        });

    } else { //alerte panier vide
        let htmlError='';
        htmlError += 
        `<div class="alert alert-info" role="alert">
        Votre panier est vide.
      </div>`
        itemSelection.innerHTML = htmlError;
    }
}



//fonction pour diminuer la quantité
function decreaseQty (item) {
let index = document.getElementById('decrease_btn');
item[index].qty--;
}
