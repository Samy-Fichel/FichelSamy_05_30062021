//Récuperer les ours sur le serveur
function getServerTeddies() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      displayHTMLTeddies(value);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};

//Afficher un ours dans le HTML
function displayHTMLTeddies(teddies) {
  //Modifier HTML grâce à la variable "teddy"
  for (let i = 0; i < teddies.length; i++) {
    //i = 2
    const teddy = teddies[i];
    console.log("name: ", teddy);
    const app = document.getElementById("app");
    console.log("Le Div dans le HTML", app);
    app.innerHTML += ` 
<a href ="/front-end/html/product.html?id=${_id[i]}" class="href-card">
    <div class='card'>
          <div class='box-text'> 
              <p class='name-card'> ${teddy.name} </p> 
              <span class='price-card'> ${teddy.price / 100}.00 € </span> 
          </div>
              <img src=${teddy.imageUrl} width='400' height='280' />
    </div>
</a>
  `;
  }
  return JSON.parse(storage.getItem(panier));
}

//On appelle notre première fonction
// Et on stocke le "return" de cette fonction dans la variable "myVariableTeddies"
const myVariableTeddies = getServerTeddies();
console.log(myVariableTeddies);









//Code pour l'appel des id de chaque produits 
//déclaration de variable
let _id = [];
//Tableau de données avec appel de l'id de chaque Product individuel 
const response = [
  {
    _id: "5be9c8541c9d440000665243"
  },
  {
    _id: "5beaa8bf1c9d440000a57d94"
  },
  {
    _id: "5beaaa8f1c9d440000a57d95"
  },
  {
    _id: "5beaabe91c9d440000a57d96"
  },
  {
    _id: "5beaacd41c9d440000a57d97"
  }
];

//Boucle pour afficher l'objet id 
for (let i = 0; i < response.length; i++)
  //Ont met les données dans la variable id 
  response.forEach((element, i) => {
    _id[i] = element._id;
  });