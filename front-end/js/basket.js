//Déclaration variable pour mettre la key et les values qui sont dans le localStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productsLocalStorage); 

//*******************AFFICHAGE DES PRODUITS DU PANIER ******************************************************

//Injecter le code HTML
const ElementHtml = document.getElementById("appPanier");
console.log(ElementHtml);

//si panier et vide : affiche panier vide, si panier pas vide aficher les products qui sont dans le localStorage

if(productsLocalStorage === null){
const basketEmpty = `
  <div class="container-empty-basket">
    <div class="basket-empty">VOTRE PANIER EST VIDE</div>
  </div>
`;
 ElementHtml.innerHTML = basketEmpty;

}else{

   for(i = 0; i < productsLocalStorage.length; i++ ){
     //injection html dans la page panier
    document.getElementById('table-products').innerHTML += `
        <tr>
          <td>${productsLocalStorage[i].name}</td>
          <td>${productsLocalStorage[i].price /100}.00€</td>
          <td>${productsLocalStorage[i]._id}</td>
          <td><img src=${productsLocalStorage[i].imageUrl} width='100' height='70' /></td>
        </tr>
    `;
   } 

}

/*************************************************PRIX TOTAL DU PANIER**********************************/
let totalBasketProducts = [];

 //chercher les prices dans basket Variable + tableau array pour inclure les prix qui sont afficher dans le panier 
 for (let i = 0; i < productsLocalStorage.length; i++){
   let priceProducts = productsLocalStorage[i].price;

   //ajouter les prices dans une variable 
   totalBasketProducts.push(priceProducts)
   console.log(totalBasketProducts);
 }

 //Addition des prices grâce à l'utilisation de la méthode reduce
const reducer = (accumulator,currentValue) => accumulator + currentValue;
const totalPrice = totalBasketProducts.reduce(reducer,0);
console.log(totalPrice);

//Code html du prix total 
const htmlPricesproducts = `
<div class='block-price-total'><span class = 'html-prices-products'>Le prix total est de : ${totalPrice /100}.00€</span></div>
`
//Affichage du prix total sur la page panier 
ElementHtml.insertAdjacentHTML("beforeEnd", htmlPricesproducts);



//Ecouter le bouton et envoyer le panier
let orderButtonelement = document.getElementById("form-orders");
orderButtonelement.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(`http://localhost:3000/api/teddies/order`, {
    method: 'post'
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
});
