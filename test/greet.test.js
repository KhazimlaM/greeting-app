const assert = require('assert');

const Greetings = require('../greetings');

describe("The Greetings factory function", function () {


    it(' it should return an error message when numeric values are added', function () {
        let greetings = Greetings();
        assert.deepEqual("Please enter a valid name", greetings.greet("Liza123", "english"))

    });


    it('it should return an error message if language is not selected', function () {

        let greetings = Greetings();
        assert.deepEqual("Please select a language", greetings.errorHandling("Anele",))

    });

    it('it should return an error message if language is not selected and name is not entered', function () {

        let greetings = Greetings();
        assert.deepEqual("Please enter a name and select a language", greetings.errorHandling("",))

    });

    it('it should return an error message if the name is not added', function () {

        let greetings = Greetings();
        assert.deepEqual("Please enter your name", greetings.errorHandling("", "english"))

    });


  

    it('it should greet the name passed in', function () {

        let greetings = Greetings();
        assert.deepEqual("Hello, Liza", greetings.greet("Liza", "english"))
        assert.deepEqual("Nda, Sethu", greetings.greet("Sethu", "venda"))
        assert.deepEqual("Molo, Khazi", greetings.greet("Khazi", "xhosa"))

    });

});







