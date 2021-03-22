let url = 'http://localhost:3000/api/cameras';
let urlOrder = 'http://localhost:3000/api/cameras/order';
let itemSelection = document.getElementById('main_item-selection');
let itemDetail = JSON.parse(localStorage.getItem('panier')); //on récupère le panier en le 'traduisant' grâce à parse
let totalPrice = 0;
let totalArticle = 0; // variable pour le nombre total d'articles

quantityDisplay();

function quantityDisplay () {

    if (itemDetail !== null && itemDetail.length !== 0) {

        let html = '';
        totalPrice = 0; //variable pour le prix total, on initialise à 0
        totalArticle = 0;
        
        itemDetail.forEach ((product) => {

        totalPrice = totalPrice + (product.price * product.qty);
        totalArticle = totalArticle + product.qty;

        html += 
        `<div class="product card mb-3 p-2" style="max-width: 700px;" data-productid="${product.id}" data-productlense="${product.lense}">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${product.image}" alt="photo du produit">
                </div>
                <div class="col-md-8 p-0">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text m-0">Option: ${product.lense}</p>
                        <p class="card-text m-0">Prix: ${(product.price * product.qty)} €</p>
                        <div class="d-flex align-items-center">
                        <p class="card-text m-0" >Quantité:
                            <button type="button" class="btn btn-light btn-sm decrease_btn"> - </button>
                            ${product.qty} 
                            <button type="button" class="btn btn-light btn-sm increase_btn"> + </button>
                        </p>
                        <button class="btn btn-outline-dark text-end trash"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        itemSelection.innerHTML = html;  
        })

        // Affichage du récapitulatif de commande
        let htmlTotal =
        `<div class="bg bg-white m-4 border border-warning">
            <div class="p-3">
                <h2 class="h5 m-2 mb-4 text-center"><em>Récapitulatif de votre commande</em></h2>
                <p class="m-2">Nombre d'article(s): ${totalArticle}</p>
                <p class="m-2">Livraison: OFFERT</p>
            </div>
            <div class="d-flex align-items-baseline justify-content-between justify-content-lg-around pb-4 p-3 total">
                <p class="total-price m-0"><strong>Total: ${totalPrice} €</strong></p>
                <button class="cancel btn btn-sm btn-danger shadow-sm" id="clearCartBtn" onclick="confirmAlertEmptyCart()">
                    Annuler ma commande
                </button>
            </div>
        </div>`
        
        itemSelection.insertAdjacentHTML('beforeend', htmlTotal);

        // Affichage du formulaire
        let htmlFormulaire = 
        `<form class="needs-validation p-5 contactform" type="submit" action="post">
            <h2 class="h5 m-2 mb-4 text-center">Informations personnelles</h2>
            <div class="form-row">
                <div class="col mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="johnsmith@mail.com" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="firstname">Prénom</label>
                    <input type="text" class="form-control" id="firstname" name="firstname" maxlength="20" placeholder="John" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="lastname">Nom</label>
                    <input type="text" class="form-control" id="lastname" name="lastname" maxlength="20" placeholder="Smith" required>
                </div>
            </div>

            <div class="form-row">
                <div class="col mb-3">
                    <label for="address">Adresse</label>
                    <input type="text" class="form-control" id="address" name="address" maxlength="50" placeholder="10 rue de la Pomme" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col mb-3">
                    <label for="city">Ville</label>
                    <input type="text" class="form-control" id="city" name="city" maxlength="50" placeholder="Paris" required>
                </div>
            </div>
            <button class="btn btn-success" id="submit">Confirmer ma commande</button>
      </form>`
      
      itemSelection.insertAdjacentHTML('beforeend', htmlFormulaire);

// Bouton +
    let increaseBtn = document.querySelectorAll('.increase_btn');
    increaseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            let product = btn.closest('.product');
            increaseQty(product);
        })
    })

// Bouton -
    let decreaseBtn = document.querySelectorAll('.decrease_btn');
    decreaseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            let product = btn.closest('.product');
            decreaseQty(product);
        })
    })

// Bouton Trash
    let removeProductBtn = document.querySelectorAll('.trash');
    removeProductBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            let product = btn.closest('.product');
            deleteProduct(product);
        })
    })
    
// Bouton Annuler ma Commande
    let clearCartBtn = document.getElementById('clearCartBtn');
    clearCartBtn.addEventListener('click', () => {
        clearCart();
        alertEmptyCart();
    });

// Bouton Commander
    let contactForm = document.querySelector('.contactform');
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        orderDetails = getForm();
        postForm(orderDetails);
    });

// Affichage de l'info Panier Vide
    } else {
        alertEmptyCart();
    }
}


///////////// FONCTIONS /////////////

//fonction pour diminuer la quantité (quand la quantité est à 0, le produit est supprimé du panier)
function decreaseQty (product) {
    itemDetail.forEach ((item) => { //boucle pour trouver le produit correspondant
        if (item.id == product.dataset.productid && item.lense == product.dataset.productlense) { // si l'id et la lentille du produit sélectionné (dans data-attribute) correspond
            item.qty--; // quantity -
            localStorage.setItem('panier', JSON.stringify(itemDetail)); //ajoute la nouvelle donnée au localStorage

            if (item.qty === 0) { // si la quantité atteint 0, le produit est supprimé
                deleteProduct(product);
            }
            quantityDisplay(); // mets la page à jour
        }
    });
}

// fonction pour augmenter la quantité
function increaseQty (product) {

    itemDetail.forEach ((item) => {
        if (item.id == product.dataset.productid && item.lense == product.dataset.productlense) {
            item.qty++;
            localStorage.setItem('panier', JSON.stringify(itemDetail));
            quantityDisplay();
        }
    });
}

// fonction pour supprimer un produit
function deleteProduct (product) {
        itemDetail.forEach ((item, index) => {
        if (item.id == product.dataset.productid && item.lense == product.dataset.productlense) {
            itemDetail.splice(index, 1); // 
            localStorage.setItem('panier', JSON.stringify(itemDetail));
            quantityDisplay();
        }
    });
}

//fonction info panier vide
function alertEmptyCart () {
let htmlError=
`<div class="alert alert-info m-3" role="alert">
    Votre panier est vide.
</div>`;
itemSelection.innerHTML = htmlError;
}

//fonction pour confirmer l'annulation du panier, puis le vider si on clique 'OK' (vide le local storage + affichage info Panier Vide)
function confirmAlertEmptyCart () {
    if (confirm ('Cette action va vider le contenu de votre Panier, si vous souhaitez annuler votre commande, veuillez cliquez sur OK')) {
        localStorage.removeItem('panier');
        alertEmptyCart();
    }
}


// fonction pour envoyer le formulaire
function getForm () {
    //récupération des informations personnelles
    let contact = {
        'firstName': document.getElementById('firstname').value,
        'lastName': document.getElementById('lastname').value,
        'address': document.getElementById('address').value,
        'city': document.getElementById('city').value,
        'email': document.getElementById('email').value
    }

    // récupération des infos du produit choisi (id) et ajouté à productInfo
    let products = [];

    if (itemDetail !== null) {
        itemDetail.forEach(product => {
            products.push(product.id);
        })
    }
    //les informations personnelles et celles du produit sont envoyées dans la fonction post()
    return JSON.stringify({ contact, products });
};


function postForm(orderDetails) {
    console.log(orderDetails);
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode:'cors',
        body: orderDetails
    })
    .then(response => {
        return response.json();
    })
    .then(order => {
        localStorage.setItem('contact', orderDetails);
        localStorage.setItem('orderId', JSON.stringify(order.orderId));
        localStorage.setItem('total', JSON.stringify(totalPrice));
        localStorage.removeItem('panier');
        window.location.replace("./confirm.html");

        console.log(totalPrice);
    })
}