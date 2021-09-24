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
  //let productIds = [];
  for (i = 0; i < productsLocalStorage.length; i++) {
    //injection html dans la page panier
    //productIds.push(productsLocalStorage[i]._id);
    document.getElementById("table-products").innerHTML += `
        <tr>
          <td>${productsLocalStorage[i].name}</td>
          <td>${productsLocalStorage[i].price / 100}.00€</td>
          <td><img src=${productsLocalStorage[i].imageUrl}
      } width='100' height='70' /></td>
        </tr>
    `;
  }
  //console.log("productIds", productIds);
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
      champTextEmpty(`missing-${inputId}`);
      /*****Contrôle du remplissage des champ du formulaire*****************/
      function champTextEmpty(id) {
        document.getElementById(`${id}`).textContent = "";
      };
      console.log("OK");
      return true;
    } else {
      champText(`missing-${inputId}`);
      console.log("Erreur")
      return false;
      function champText(querySelectorId) {
        document.querySelector(`#${querySelectorId}`).textContent = "Veuillez bien compléter ce champ";
      };
    }

  }

  /************ Start Regex Email ***********************/
  const regExEmail = (value) => {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);
  }

  function emailControl() {
    //Controle regex de l'email
    const lEmail = emailinputElement.value;
    if (regExEmail(lEmail)) {
      return true;
    } else {
      alert("L'email n'est pas valide");
      document.getElementById("missing-email").textContent = "Veuillez bien compléter ce champ";
    }
    return false;
  }

  /************ End Regex Email **************************/

  if (isNotEmpty("prenom") && isNotEmpty("nom") && isNotEmpty("addresse") && isNotEmpty("ville") && emailControl("email")) {
    console.log("OK");

    //Mettre le prix total dans le localStorage
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    

    /**************************************************************END Validation du formulaire de commande Regex **************************/
    let productIds = [];
    for (i = 0; i < productsLocalStorage.length; i++) {
      //injection html dans la page panier
      productIds.push(productsLocalStorage[i]._id);
    }

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
        products: productIds

      })

    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (response) {
        console.log("Reponse", response);
        let orderId = response.orderId;
        console.log("OrderId", orderId);
        localStorage.setItem("responseId", response.orderId);

      })
      .catch(function (err) {
        // Une erreur est survenue
      });

    alert("Mémorisation de la commande effectuée");
    window.location.href = "/front-end/html/order.html";

    /*************************************************End envoie des données sur la page order de confirmation de commande**********************************/
  } else {

    console.log("KO");
    alert("Veuillez compléter le formulaire correctement");
  }
});
