
    const regExprenom = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value)
      }
      function prenomControl(){
        const prenom = firstNameinputElement.value;
        if (regExprenom(prenom)){
          return true;
        }else{
          alert("Prenom: Veillez remplir le champ correctement")
          return false;
        }
      }




      /**************************************************************Validation du formulaire de commande Regex ******************************/
function firstNameValid(){
    let address = document.getElementById('address');
    let addressMissing = document.getElementById("adressMissing");
    let erorr = false;
  
  /******************************************************************** */
  if (address.validity.valueMissing){
    addressMissing.textcontent = "Adresse manquante";
    addressMissing.style.color= "red";
  }else if (addressValidation.test(address.value) == false){
    addressMissing.textContent = "Format Incorrect";
  }
  
  };
  /**************************************************************END Validation du formulaire de commande Regex **************************/