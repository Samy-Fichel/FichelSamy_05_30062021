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
  //si panier n'est pas vide : afficher les products qui sont dans le localStorage
   let arrayProductsBasket = [];

   for(i = 0; i < productsLocalStorage.length; i++ ){
    arrayProductsBasket = arrayProductsBasket + `
  <div class = "container-basket-products">
    <table>
        <tr class="denomination-names">
          <td>Nom</td>
          <td>Prix</td>
          <td>Id</td>
          <td>Image</td>
        </tr>
        <tr>
          <td>${productsLocalStorage[i].name}</td>
          <td>${productsLocalStorage[i].price /100}.00€</td>
          <td>${productsLocalStorage[i]._id}</td>
          <td><img src=${productsLocalStorage[i].imageUrl} width='100' height='70' /></td>
        </tr>
    </table>
  </div>
    `;
   }
    if(i === productsLocalStorage.length){
    //injection html dans la page panier
    ElementHtml.innerHTML = arrayProductsBasket;
   }

}


 

 














































//Récuperer les ours sur le serveur
/*function getServerPanier() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      displayHTMLPanier(value);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

//Afficher un ours dans le HTML
function displayHTMLPanier(panier) {
  //Modifier HTML grâce à la variable "teddy"
  for (let i = 0; i < panier.length; i++) {
    //i = 2
    const basket = panier[i];
    console.log("name: ", basket);
    const appPanier = document.getElementById("appPanier");
    console.log("Le Div dans le HTML", appPanier);
    appPanier.innerHTML +=` 
<a href ="/front-end/html/product.html?id=${_id[i]}" class="href-card">
    <div class='card'>
          <div class='box-text'> 
              <p class='name-card'> ${teddy.name} </p> 
              <span class='price-card'> ${teddy.price / 100}.00 € </span>  
          </div>
              <img src=${teddy.imageUrl} width='400' height='280' />
          <div class='box-button'> 
            <form action="/front-end/html/product.html?id=${_id[i]}"> 
              <button class='btn'>Voir le Produit</button>
            </form>
          </div>
    </div>
</a>
  `;
  }
  return null;
}

let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);

//On appelle notre première fonction
// Et on stocke le "return" de cette fonction dans la variable "myVariableTeddies"
const myVariablePanier = getServerPanier();
console.log(myVariablePanier);*/





