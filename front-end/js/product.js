//récuperer la chaîne de requête dans l'url
const stringId_url = window.location.search;
console.log(stringId_url);

//Extraction de l'id en utilisant la méthode du constructeur URLSearchParams()
const urlSearchParams = new URLSearchParams(stringId_url);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

getServerTeddy(id);

function getServerTeddy(teddyId) {
  fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log("Reponse", value);
      displayHTMLTeddy(value);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

function displayHTMLTeddy(teddy) {
  const nameElement = document.getElementById("name");
  const priceElement = document.getElementById("price");
  const imgElement = document.getElementById("img");
  const descriptionElement = document.getElementById("description");
  const colorsElement = document.getElementById("colors");
  nameElement.innerHTML = teddy.name;
  priceElement.innerHTML = `${teddy.price / 100}.00 €`;
  colorsElement.innerHTML = teddy.colors;
  imgElement.setAttribute("src", teddy.imageUrl);
  descriptionElement.innerHTML = teddy.description;

  var selectedList = [],
    selectBox = document.getElementById("colors"),
    i;

  for (i = 0; i < selectBox.options.length; i++) {
    if (selectBox.options[i].selected) {
      selectedList.push(selectBox.options[i]);
    }
  }
}

//select + boucle pour afficher les couleurs // Comment ajouter des options dans un select
//Faire le panier avec ajout au panier + garder les produits en memoire dans la page panier
