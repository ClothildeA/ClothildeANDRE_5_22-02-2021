let url = 'http://localhost:3000/api/cameras';

fetch(url) //recherche dans l'url
    .then((response) => {
        response.json().then((elements) => {

            let main = document.getElementById('main');
            let row = document.createElement('DIV');
            row.className = "row";
            main.appendChild(row);

            elements.forEach(element => { //boucle pour trouver les infos des items dans l'API

                //création de la structure HTML pour intégrer les infos des items

                //div (col)
                let divCol = document.createElement("DIV"); //création de l'élément
                divCol.className = 'col-12 col-md-6 col-lg-3 text-center'; //ajout des classes
                row.appendChild(divCol); //structuration parent/enfant

                //card du produit (card)
                let card = document.createElement('DIV')
                card.className = 'card m-3 shadow-sm rounded-3';
                divCol.appendChild(card);

                //image du produit (img)
                let cardImg = document.createElement('img');
                cardImg.src = element.imageUrl;
                card.appendChild(cardImg);

                //contenu des caractéristiques (body)
                let cardBody = document.createElement('DIV');
                cardBody.className = 'card-body';
                card.appendChild(cardBody);

                //Nom du produit (title)
                let cardTitle = document.createElement('p');
                cardTitle.className = 'card-title m-1';
                cardBody.appendChild(cardTitle);
                cardTitle.innerHTML = element.name; //récupération de l'info


                //Prix du produit (price)
                let cardPrice = document.createElement('p');
                cardPrice.className = 'card-text m-1 font-weight-bold';
                cardBody.appendChild(cardPrice);
                cardPrice.innerHTML = element.price;
                cardPrice.textContent = element.price / 100 + ' ' + '€'; //mise en forme (ajout de texte)

                //Bouton menant à la page produit
                let cardBtn = document.createElement('a');
                cardBtn.href = "product.html?id=" + element._id; //lien pour récupérer l'id du produit
                cardBtn.className = 'btn btn-light m-1 shadow';
                cardBtn.textContent = 'Voir le produit';
                cardBody.appendChild(cardBtn);
            });
        })
    });