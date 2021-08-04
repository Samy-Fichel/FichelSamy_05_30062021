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
  imgElement.setAttribute("src", teddy.imageUrl);
  descriptionElement.innerHTML = teddy.description;

  colors = teddy.colors;

  let colorsOptions = "";
  
  for (let i = 0; i < colors.length; i++){
    const color = colors[i];

    colorsOptions += `<option value="${color}">${color}</option>` ;
  }

  colorsElement.innerHTML =
  `<select>
    ${colorsOptions}
  </select>
  `;

  console.log ("colorsOptions", colorsOptions);
  console.log ("colors", colors);
}

//select + boucle pour afficher les couleurs // Comment ajouter des options dans un select
//Faire le panier avec ajout au panier + garder les produits en memoire dans la page panier
