let url = 'http://localhost:3000/api/cameras';
let itemSelection = document.getElementById('main_item-selection');
let totalPrice = 0; //variable dpour le prix total
let totalArticle = 0; // variable pour le nombre total d'articles
quantityDisplay()

function quantityDisplay () {

    if (localStorage.getItem('panier') !== null) {
        
        let itemDetail = JSON.parse(localStorage.getItem('panier')); //on récupère le panier en le 'traduisant' grâce à parse
        totalPrice = 0; //on initialise la quantité à 0
        totalArticle = 0;

        let html = '';

        itemDetail.forEach ((product, index) => {

        totalPrice = totalPrice + (product.price * product.qty);
        totalArticle = totalArticle + product.qty;
        html += 
        `<div class="card mb-3 p-2" style="max-width: 700px;">
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
                            <button type="button" class="btn btn-light btn-sm decrease_btn" id="${1 + product.id + product.lense}"> - </button>
                            ${product.qty} 
                            <button type="button" class="btn btn-light btn-sm increase_btn" id="${2 + product.id + product.lense}"> + </button>
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
        `<form class="needs-validation p-5" novalidate>
            <h2 class="h5 m-2 mb-4 text-center">Informations personnelles</h2>
            <div class="form-row">
                <div class="col mb-3">
                    <label for="validationCustom03">Email</label>
                    <input type="email" class="form-control" id="validationCustomUsername" placeholder="Email" aria-describedby="inputGroupPrepend" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom01">Prénom</label>
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Prénom" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="validationCustom02">Nom</label>
                    <input type="text" class="form-control" id="validationCustom02" placeholder="Nom" required>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom04">Adresse</label>
                    <input type="text" class="form-control" id="validationCustomUsername" placeholder="Adresse" aria-describedby="inputGroupPrepend" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="validationCustom04">Complément d'adresse</label>
                    <input type="text" class="form-control" id="validationCustomUsername" placeholder="Adresse" aria-describedby="inputGroupPrepend" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom05">Ville</label>
                    <input type="text" class="form-control" id="validationCustom03" placeholder="Ville" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom06">Code Postal</label>
                    <input type="text" class="form-control" id="validationCustom05" placeholder="Code Postal" required>
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">J'accepte les conditions générales de vente.</label>
                    <div class="invalid-feedback">
                        Vous devez accepter les conditions.
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" type="submit">Commander</button>
      </form>`
      
      itemSelection.insertAdjacentHTML('beforeend', htmlFormulaire);

// ecoute du bouton +
    let increaseBtn = document.querySelectorAll('.increase_btn');
    increaseBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            increaseQty(e, itemDetail);
            console.log(btn.id);
        })
    })

// ecoute du bouton -
    let decreaseBtn = document.querySelectorAll('.decrease_btn');
    decreaseBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            decreaseQty(e, itemDetail);
        })
    })

// ecoute du bouton Trash
    let removeProductBtn = document.querySelectorAll('.trash');
    removeProductBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            deleteProduct(e, itemDetail);
        })
    })
    
// ecoute du bouton Annuler ma Commande
    let clearCartBtn = document.getElementById('clearCartBtn');
    clearCartBtn.addEventListener('click', () => {
        clearCart();
        alertEmptyCart();
    });

    
    } else { //alerte panier vide
        alertEmptyCart();
    }
}


//fonction pour vider la totalité du panier dans localStorage
function clearCart () {
    localStorage.removeItem('panier');
}

//fonction info panier vide
function alertEmptyCart () {
let htmlError=
`<div class="alert alert-info m-3" role="alert">
    Votre panier est vide.
</div>`;
itemSelection.innerHTML = htmlError;
}

//fonction pour confirmer l'annulation du panier, puis le vider si click OK
function confirmAlertEmptyCart () {
    if (confirm ('Cette action va vider le contenu de votre Panier, si vous souhaitez annuler votre commande, veuillez cliquez sur OK')) {
        clearCart();
        alertEmptyCart();
    }
}

//fonction pour diminuer la quantité
function decreaseQty (e, item) {
    //selection du bon id
    //.qty--;
    //storage stringify
    console.log('decrease');
}

// fonction pour augmenter la quantité
function increaseQty (e, item) {
    //.qty++;
    console.log('increase');
}

function deleteProduct (e, item) {
    //.qty.length === 0;
    console.log('delete');
}

