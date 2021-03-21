let main = document.getElementById('main');
let contactInfo = JSON.parse(localStorage.getItem("contact"));
let orderId = JSON.parse(localStorage.getItem("orderId"));
let totalPrice = JSON.parse(localStorage.getItem('total'));

let html = 
`<h2><em>Merci de votre confiance! Votre commande a bien été enregistrée.</em></h2>
<img alt="boîte rose magique" src="./img/magic.svg" class="magic-box"/>
<div class="card">
    <div class="card-body">
        <p id="orderemail"><b>Email :</b> ${contactInfo.contact.email}</p>
        <p id="orderfirstname"><b>Prénom :</b> ${contactInfo.contact.firstName}</p>
        <p id="orderlastname"><b>Nom :</b> ${contactInfo.contact.lastName}</p>
        <p id="orderadress"><b>Adresse :</b> ${contactInfo.contact.address}</p>
        <p id="ordercity"><b>Ville :</b> ${contactInfo.contact.city}</p>
    </div>
    <div class="card-footer bg-transparent">
        <p id="orderid"><b>Numéro de votre Commande :</b> ${orderId}</p>
        <p id="totalprice"><b>Montant total :</b> ${totalPrice} €</p>
    </div>
</div>
`
main.innerHTML = html;

localStorage.removeItem('contact');
localStorage.removeItem('orderId');
localStorage.removeItem('total');