module.exports = function myGreetings(db) {

    async function storedNames(name, language) {

        if(!name || !language) return
        var checkUser = await db.oneOrNone('select greeted_names from my_greetigs where greeted_names = $1', [name])
        console.log(checkUser)
        if (checkUser === null) {
            await db.none('insert into my_greetigs(greeted_names,counter) values($1, $2)', [name, 1])

        }

        else {
            await db.none('update my_greetigs set counter = counter + 1 where greeted_names = $1', [name])
        }

    }

    async function getCounter() {
        let list = await db.manyOrNone('select * from my_greetigs');
        console.log(list)
        return list.length
    }

    async function getNames() {
        let getNames = await db.manyOrNone('select * from my_greetigs')
        return getNames
    }

    async function getUserCounter(name) {
        let userCounter = await db.oneOrNone('select greeted_names,counter from my_greetigs where greeted_names = $1', [name])
        return userCounter
    }

    async function clear() {
        await db.none('delete from my_greetigs')

  
    }



    return {

        storedNames,
        getCounter,
        getNames,
        getUserCounter,
        clear

    }

}













































