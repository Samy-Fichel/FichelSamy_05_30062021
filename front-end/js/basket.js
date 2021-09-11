//Déclaration variable pour mettre la key et les values qui sont dans le localStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productsLocalStorage);

//*******************AFFICHAGE DES PRODUITS DU PANIER ******************************************************

//Injecter le code HTML
const ElementHtml = document.getElementById("appPanier");
console.log(ElementHtml);

//si panier et vide : affiche panier vide, si panier pas vide aficher les products qui sont dans le localStorage

if (productsLocalStorage === null) {
  const basketEmpty = `
  <div class="container-empty-basket">
    <div class="basket-empty">VOTRE PANIER EST VIDE</div>
  </div>
`;
  ElementHtml.innerHTML = basketEmpty;
} else {
  let productIds = [];
  for (i = 0; i < productsLocalStorage.length; i++) {
    //injection html dans la page panier
    productIds.push(productsLocalStorage[i]._id);
    document.getElementById("table-products").innerHTML += `
        <tr>
          <td>${productsLocalStorage[i].name}</td>
          <td>${productsLocalStorage[i].price / 100}.00€</td>
          <td><img src=${productsLocalStorage[i].imageUrl}
      } width='100' height='70' /></td>
        </tr>
    `;
  }
  console.log ("productIds", productIds);
}

//*******************SUPPRIMER TOUT LES ARTICLES DU PANIER******************************************************
//Html button
const btn_delete_html = `
<div class="btn_delete">
  <button class="btn_button_delete">Vider le panier</button>
</div>
`;
ElementHtml.insertAdjacentHTML("beforeend", btn_delete_html);

//selection de btn_delete
const btn_delete_basket = document.querySelector(".btn_delete");
console.log(btn_delete_basket);

//Code de suppresion de la key du locaStorage
btn_delete_basket.addEventListener("click", (e) => {
  e.preventDefault;
  //Vider le panier entièrement de son contenu
  localStorage.removeItem("panier");

  //alert le panier à été vidé de son contenu
  alert("Le panier à été vidé de sont contenu");

  //recharger la page panier avec windows location
  window.location.href = "basket.html";
});
//*******************END SUPPRIMER TOUT LES ARTICLES DU PANIER******************************************************

/*************************************************PRIX TOTAL DU PANIER**********************************/
let totalBasketProducts = [];

//chercher les prices dans basket Variable + tableau array pour inclure les prix qui sont afficher dans le panier
for (let i = 0; i < productsLocalStorage.length; i++) {
  let priceProducts = productsLocalStorage[i].price;

  //ajouter les prices dans une variable
  totalBasketProducts.push(priceProducts);
  console.log(totalBasketProducts);
}

//Addition des prices grâce à l'utilisation de la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalBasketProducts.reduce(reducer, 0);
console.log(totalPrice);

//Code html du prix total
const htmlPricesproducts = `
<div class='block-price-total'><span class = 'html-prices-products'>Le prix total est de : 
${totalPrice / 100}.00€</span></div>
`;
//Affichage du prix total sur la page panier
ElementHtml.insertAdjacentHTML("beforeend", htmlPricesproducts);
/*************************************************END PRIX TOTAL DU PANIER**********************************/



/*************************************************Envoie des données sur la page order de confirmation de commande**********************************/
//Ecouter le bouton et envoyer le panier
let orderButtonelement = document.getElementById("form-orders");
orderButtonelement.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstNameinputElement = document.getElementById("prenom");
  let firstNameinputElementValue = firstNameinputElement.value;
  let lastNameinputElement = document.getElementById("nom");
  let lastNameinputElementValue = lastNameinputElement.value;
  let addressinputElement = document.getElementById("addresse");
  let addressinputElementValue = addressinputElement.value;
  let cityinputElement = document.getElementById("ville");
  let cityinputElementValue = cityinputElement.value;
  let emailinputElement = document.getElementById("email");
  let emailinputElementValue = emailinputElement.value;
  //let firstNameinputElement = document.getElementById("address");
  //let firstNameinputElementValue = firstNameinputElement.value;*/
  console.log("imput prenom", firstNameinputElementValue)
  //Rajouter if = null affiche un message d'erreur sinon continuer 
  /**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

  /**************************************************************Validation du formulaire de commande Regex ******************************/
  function isNotEmpty(inputId) {
    let inputElement = document.getElementById(inputId);
    if (inputElement.value.length > 0) { // (^) = début de la regex / ($) = fin de la regex ([]) controle des différentes lettres ou caractères) ( {3 = minimum 20= maximum de caractères} = quantificateurs)
      console.log("OK");
      return true;
    } else {
      console.log("Erreur")
      return false;
    }
  }


  if (isNotEmpty("prenom") && isNotEmpty("nom") && isNotEmpty("adresse") && isNotEmpty("ville")) {
    console.log("OK");

    /**************************************************************END Validation du formulaire de commande Regex **************************/
    fetch(`http://localhost:3000/api/teddies/order`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        //1er propriete de l'objet body
        contact: {
          firstName: firstNameinputElementValue,
          lastName: lastNameinputElementValue,
          address: addressinputElementValue,
          city: cityinputElementValue,
          email: emailinputElementValue
        },
        //2eme propriete de l'objet body

        products:
          ["5be9c8541c9d440000665243"]

      })

    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        console.log("Reponse", value);
      })
      .catch(function (err) {
        // Une erreur est survenue
      });

    alert("Mémorisation de la commande effectuée");
    /*************************************************End envoie des données sur la page order de confirmation de commande**********************************/
  } else {
    console.log("KO");
    alert("Veuillez complété le formulaire correctement")
  }

});


