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
                        <p class="card-text m-0" id="${product._id}">Quantité:
                            <button type="button" class="btn btn-light btn-sm decrease_btn" id="${index}"> - </button>
                            ${product.qty} 
                            <button type="button" class="btn btn-light btn-sm increase_btn" id="${index}"> + </button>
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
                <button class="cancel btn btn-sm btn-danger shadow-sm">
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
                <div class="col-6 mb-3">
                    <label for="validationCustom04">Adresse</label>
                    <input type="text" class="form-control" id="validationCustomUsername" placeholder="Adresse" aria-describedby="inputGroupPrepend" required>
                </div>
                <div class="col-6 mb-3">
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



    let decreaseBtn = document.getElementsByClassName('decrease_btn');
    let id = getElementById('${product._id}');
    let decreaseQtyById = decreaseBtn.closest(id);
    console.log(decreaseBtn);
    console.log(decreaseQtyById);
    decreaseQtyById.addEventListener('click', function(){
        decreaseQty(e, itemDetail);
    });
        
        

        
    } else { //alerte panier vide
        let htmlError=
        `<div class="alert alert-info m-3" role="alert">
            Votre panier est vide.
        </div>`
        itemSelection.innerHTML = htmlError;
    }
}



//fonction pour diminuer la quantité
function decreaseQty (item) {
    let index = '';
    item[index].qty--;
}