// Create a function to set names of users and count them

module.exports = function Greetings(getItemNames) {

    var storedNames = {}
    var regex = /^[a-zA-Z]{3,}$/

    let name = "";
    let language = "";

    function setNames(name) {

        if (storedNames[name] === undefined) {
            storedNames[name] = 1;
        }
        else {
            storedNames[name]++;
        }

    }


    // Create a function to greet the name with the selected language and create a regular expression condition


    function greet(name, language) {
        let greetMessage = "";
        let newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim();


        if (newName === "" || !regex.test(newName)) {
            return "Please enter a valid name"
        }

        else {

            setNames(name);

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


    // Get the length of values in the object but first convert it into a list/array

    function countNames(name) {
        let counter = Object.keys(storedNames);
        return counter.length;
    }

    // Create a function that returns the stored names
    function namesReturned() {

        console.log(storedNames)

        return storedNames
    }

    // handling erros when theres no names, nothing selected and when names contain numeric values

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

    function reset() {
        storedNames = {}
    }





return {
    
    setNames,
    countNames,
    greet,
    namesReturned,
    errorHandling,
    name,
    language,
    reset,

}

}






