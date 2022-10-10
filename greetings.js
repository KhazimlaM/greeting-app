// Create a function to set names of users and count them

module.exports = function Greetings(getItemNames) {

    var regex = /^[a-zA-Z]{3,}$/

    let name = "";
    let language = "";

  

    function greet(name, language) {
        let greetMessage = "";
        let newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim();


        if (newName === "" || !regex.test(newName)) {
            return "Please enter a valid name"
        }

        else {


            if (language !== null) {
                if (language === "xhosa") {
                    return "Molo, " + name;
                }
                else if (language === "english") {
                    return "Hello, " + name;
                }
                else if (language === "venda") {
                    return "Nda, " + name;
                }
            }

        }
        return greetMessage;
    }


   
    function errorHandling(names, languages) {


        let invalidChar = "";

        if (names == "" && languages == null) {
            invalidChar = "Please enter a name and select a language";
        }

        else if (names == "") {
            invalidChar = "Please enter your name";
        }

        else if (languages == null) {
            invalidChar = "Please select a language";
        }




        return invalidChar;

    }

  
    return {

        greet,
        errorHandling,
        name,
        language,

    }

}






