let url = 'http://localhost:3000/api/cameras';

//Recupère les paramètres passés dans l'url du produit
const chosenCamera = window.location.search;

//Analyse des paramètres de la requête
const urlParams = new URLSearchParams(chosenCamera);

// Récupère le paramètre ID
const productId = urlParams.get('id');


fetch(url) //recherche dans l'url
    .then((response) => {
        response.json().then((elements) => {

            let main = document.getElementById('main');

            //div alert dynamique - 'produit ajouté au panier'
            let divAlert = document.createElement('div');
            divAlert.className = 'alert alert-success text-center hidden';
            divAlert.id = 'alert';
            divAlert.setAttribute('role', 'alert');
            divAlert.textContent = 'Votre produit a bien été ajouté au panier!'
            main.appendChild(divAlert);

            let row = document.createElement('DIV');
            row.className = "row bg-white m-3 shadow-sm radius";        
            main.appendChild(row);

            elements.forEach(element => { //création de la boucle pour trouver les infos des items dans l'API

                if (productId === element._id) {  //création de la structure HTML pour intégrer les infos des items (if -> condition)

                    //div IMAGE
                    let divImg = document.createElement('div');
                    divImg.className = 'col-12 col-md-6 text-center p-2 d-flex align-items-center';
                    row.appendChild(divImg);

                    //image du produit (img)
                    let imgProduct = document.createElement('img');
                    imgProduct.src = element.imageUrl;
                    imgProduct.alt = "photo de l'appareil " + element.name;
                    divImg.appendChild(imgProduct);

                    // div description du produit
                    let divDescription = document.createElement('div');
                    divDescription.className = 'col-12 col-md-6 p-0 text-center d-flex align-items-stretch';
                    row.appendChild(divDescription);

                    //card du produit (card)
                    let cardDescription = document.createElement('DIV')
                    cardDescription.className = 'border-0';
                    divDescription.appendChild(cardDescription);

                    //contenu des caractéristiques (body)
                    let cardBody = document.createElement('DIV');
                    cardBody.className = 'card-body';
                    cardDescription.appendChild(cardBody);

                    //Nom du produit (title)
                    let cardTitle = document.createElement('p');
                    cardTitle.className = 'card-title m-3 text-left font-weight-bold';
                    cardBody.appendChild(cardTitle);
                    cardTitle.innerHTML = element.name; //récupération de l'info

                    //Description head
                    let descriptionHead = document.createElement('p');
                    descriptionHead.className = 'card-text m-2 text-left font-italic';
                    cardBody.appendChild(descriptionHead);
                    descriptionHead.textContent = 'Description du produit:';

                    //Description contenu (description)
                    let description = document.createElement('p');
                    description.className = 'card-text text-justify';
                    cardBody.appendChild(description);
                    description.innerHTML = element.description;

                    //Prix du produit (price)
                    let cardPrice = document.createElement('p');
                    cardPrice.className = 'card-text m-3 font-weight-bold';
                    cardBody.appendChild(cardPrice);
                    cardPrice.innerHTML = element.price;
                    cardPrice.textContent = element.price / 100 + ' ' + '€';//mise en forme (ajout de texte)


                    ///////////////////////// Options du produit //////////////////////


                    //Création de la div englobant txt et options
                    let divSelect = document.createElement('div');
                    divSelect.className = 'd-flex justify-content-between justify-content-lg-around';
                    cardBody.appendChild(divSelect);

                    //Ajout du texte 'Choisir une option'
                    let select = document.createElement('p');
                    select.className = 'card-text m-0 text-left font-italic choose-opt';
                    divSelect.appendChild(select);
                    select.textContent = 'Choisir une option';

                    //Création du formulaire contenant les options
                    let selectList = document.createElement('select');
                    selectList.className = 'form-select';
                    selectList.id = 'list';
                    divSelect.appendChild(selectList);
                    selectList.innerHTML = element.lenses;

                    //Récupération du tableau dans l'api
                    let array = element.lenses;

                    //Boucle pour afficher toutes les options
                    for (let i = 0; i < array.length; i++) {

                        let option = document.createElement('option');
                        option.className = 'option';
                        option.value = array[i];
                        option.text = array[i];
                        selectList.appendChild(option);
                    }

                    //Bouton permettant d'ajouter au panier
                    let cardBtnIndex = document.createElement('a');
                    cardBtnIndex.className = 'btn btn-outline-info m-4';
                    cardBtnIndex.id = 'index-btn';
                    cardBtnIndex.textContent = 'Retour à la liste des produits';
                    cardBtnIndex.setAttribute('role', 'button');
                    cardBtnIndex.href = 'index.html';
                    cardBody.appendChild(cardBtnIndex);

                    //Bouton permettant d'ajouter au panier
                    let cardBtn = document.createElement('button');
                    cardBtn.className = 'btn btn-light m-3 p-2 shadow cart_icon';
                    cardBtn.id = 'addtocart';
                    cardBtn.textContent = 'Ajouter';
                    cardBtn.setAttribute('role', 'button');
                    cardBody.appendChild(cardBtn);

                    let addToCart = document.getElementById('addtocart');
                    addToCart.addEventListener('click', () => {
                        let select = document.getElementById('list');
                        element.selectedLense = select.options[select.selectedIndex].value;
                        addItemCart(element); // appel de la fonction d'ajout au panier
                        alertAnimation(); // appel de la fonction d'animation de l'alerte
                    });
                }
            });
        })
});

////// FONCTION - ANIMATION ALERTE //////
function alertAnimation(){
    let alertClass = document.getElementById('alert');
    alertClass.classList.remove('fadeAlert');
    alertClass.classList.remove('hidden');
    void alertClass.offsetWidth; //renvoie la largeur totale de l'élément (essentiel pour faire fonctionner l'animation css)
    alertClass.classList.add('fadeAlert'); 
}

/////// FONCTION - AJOUT AU PANIER ///////
function addItemCart(newProduct) {

    //Création d'un tableau vide à remplir avec le contenu du panier
    let cartArray = [];
    let isPresent = false;


    //Condition pour ajouter au Panier
    if(localStorage.getItem('panier')) {
    
        //On vérifie ce que contient le panier
        cartArray = JSON.parse(localStorage.getItem('panier'));

        cartArray.forEach (elementInCart => { //On parcourt le tableau pour trouver une correspondance
            if(elementInCart.id == newProduct._id && elementInCart.lense == newProduct.selectedLense){ //si l'élément à ajouter est déjà dans le panier & si il a la même lentille
                elementInCart.qty++;
                isPresent = true;
            }
        })
    }

    if(!isPresent){ //si l'élément à ajouter n'est pas déjà présent dans le panier
        let cartEnter = { // On ajoute les éléments suivants
            'id':newProduct._id,
            'name':newProduct.name,
            'price':newProduct.price/100,
            'lense':newProduct.selectedLense,
            'image':newProduct.imageUrl,
            'qty':1
        }
        // Ajout du des nouveaux éléments au tableau
        cartArray.push(cartEnter);

    }

//ajout du tableau converti en JSON au localStorage
    localStorage.setItem('panier', JSON.stringify(cartArray));
}