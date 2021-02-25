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
            let row = document.createElement('DIV');
            row.className = "row bg-white m-3 shadow-sm";
            main.appendChild(row);

            elements.forEach(element => { //création de la boucle pour trouver les infos des items dans l'API

                if (productId === element._id) {  //création de la structure HTML pour intégrer les infos des items (if -> condition)

                    //div IMAGE
                    let divImg = document.createElement('div');
                    divImg.className = 'col-12 col-md-6 text-center p-0 d-flex align-items-center';
                    row.appendChild(divImg);

                    //image du produit (img)
                    let imgProduct = document.createElement('img');
                    imgProduct.src = element.imageUrl;
                    divImg.appendChild(imgProduct);



                    // div description du produit
                    let divDescription = document.createElement('div');
                    divDescription.className = 'col-12 col-md-6 text-center d-flex align-items-stretch';
                    row.appendChild(divDescription);

                    //card du produit (card)
                    let cardDescription = document.createElement('DIV')
                    cardDescription.className = 'card border-0';
                    divDescription.appendChild(cardDescription);

                    //contenu des caractéristiques (body)
                    let cardBody = document.createElement('DIV');
                    cardBody.className = 'card-body';
                    cardDescription.appendChild(cardBody);

                    //Nom du produit (title)
                    let cardTitle = document.createElement('p');
                    cardTitle.className = 'card-title m-3 text-left font-weight-bold';
                    cardBody.appendChild(cardTitle);
                    cardTitle.innerHTML = element.name;                         //récupération de l'info

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
                    cardPrice.textContent = element.price / 100 + ' ' + '€';          //mise en forme (ajout de texte)


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
                    divSelect.appendChild(selectList);
                    selectList.innerHTML = element.lenses;

                    //Récupération du tableau dans l'api
                    let array = element.lenses;
/////////////////   array.unshift('- Lentille -');

                    //Boucle pour afficher toutes les options
                    for (let i = 0; i < array.length; i++) {

                        let option = document.createElement('option');
                        option.className = 'option';
                        option.value = array[i];
                        option.text = array[i];
                        selectList.appendChild(option);
                    }

                    //Bouton permettant d'ajouter au panier
                    let cardBtn = document.createElement('a');
                    cardBtn.href = "product.html?id=" + element._id;            //lien pour récupérer l'id du produit
                    cardBtn.className = 'btn btn-light m-3 p-2 shadow cart';
                    cardBtn.textContent = 'Ajouter';
                    cardBody.appendChild(cardBtn);

                }
            });
        })
    });