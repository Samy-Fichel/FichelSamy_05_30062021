//Récuperer les ours sur le serveur
function getServerTeddies() {
    fetch("http://localhost:3000/api/teddies")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
            displayHTMLTeddies(value);
        })
        .catch(function(err) {
            // Une erreur est survenue
        });
}

//Afficher un ours dans le HTML 
function displayHTMLTeddies(teddies) {
    //Modifier HTML grâce à la variable "teddy"
    for (let i = 0; i < teddies.length; i++) {
        //i = 2
        const teddy = teddies[i];

        console.log("name: ", teddy);
        const app = document.getElementById("app");
        console.log("Le Div dans le HTML", app);
        app.innerHTML += "<div>" + teddy.name + " " + teddy.price + " " + teddy.description + "</div>";
    }
    return null;
}
//On appelle notre première fonction
// Et on stocke le "return" de cette fonction dans la variable "myVariableTeddies"
const myVariableTeddies = getServerTeddies();
console.log(myVariableTeddies);   