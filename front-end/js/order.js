//Récuperer l'id de commande via le serveur en utilisant le stockage de l'id dans le localStorage
const responseId = localStorage.getItem("responseId");

//Recuper le prix total de la commande de la page panier
const totalPrice = localStorage.getItem("totalPrice");

// Affichage du prix et de l'id sur la page order
const orderPriceId = document.getElementById("box-order");

const orderConfirmation = `
<div class="container-order">
    <h2>Confirmation de votre commande</h2>
    <div>
        <p>Nous vous remercions de votre commande</p>
        <p>Votre n° de commande et le: <span class="font-id-order">${responseId}</span> est à bien été prise en compte</p>
        <p>Le montant total de votre commande se porte à : <span class="font-price-order">${totalPrice / 100
    }.00 €</span></p>
    </div>
</div>   
`;

//Injecter le code html pour l'afficher sur la page order
orderPriceId.insertAdjacentHTML("afterbegin", orderConfirmation);

//Supprimer orderId + totalPrice du localStorage
function deleteKeyLocalStorage(key) {
    localStorage.removeItem(key);
}

deleteKeyLocalStorage("totalPrice");
deleteKeyLocalStorage("responseId");
deleteKeyLocalStorage("panier");

//Retourner sur la page d'accueil après le tableau de confirmation de commande
if(responseId == null || totalPrice == null){
    window.location.href="index.html";
}