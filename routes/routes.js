module.exports = function myRoutes(greetings, db) {

    async function home(req, res) {

        var myName = greetings.name;
        var myLanguage = greetings.language;

        if (myName !== '') {
            var theName = greetings.greet(myName, myLanguage)
            greetings.name = ""
            greetings.language = ""
        }

        let counter = await db.getCounter();
        res.render('index', {
            theName,
            counter
        })



    }
    async function errorMessage (req, res) {

        let name = req.body.nameEntered
        let language = req.body.myButton
        if (!name || !language) {
            req.flash('info', greetings.errorHandling(name, language));
            
        } else {
            greetings.name = name
            greetings.language = language
            await db.storedNames(name,language);
        }


        res.redirect('/');

    }

    async function returnedNames(req, res) {

        let names = await db.getNames()

        res.render('actions',{
            names
        }
        )
    };

    async function countedNames(req, res) {
        let Names = req.params.name
        let Times = await db.getUserCounter(Names)
        console.log(Times)
        res.render('names', {
            Names,
            Times

        });
    }

    async function resetButton(req, res) {

        await db.clear()

        res.redirect('/')
    }


    return {
        home,
        returnedNames,
        countedNames,  
        resetButton,
        errorMessage
    }

}
