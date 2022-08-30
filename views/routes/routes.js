module.exports = function myRoutes(req, res) {

    async function home (req, res) {

        var myName = greetings.name;
        var myLanguage = greetings.language;

        if (myName !== '') {
            var theName = greetings.greet(myName, myLanguage)
            greetings.name = ""
            greetings.language = ""
        }

        let counter = await logic.getCounter();
        res.render('index', {
            theName,
            counter
        })



    }











    return {
        home
    }
}