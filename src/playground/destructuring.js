const person = {
    name: "Andrew",
    age: 26,
    location: {
        city: "Jedovary",
        temp: 33
    }
};
// vezme property name a age z objektu person a ulozi je do novych const age a firstName
//kdyz se nova const jmenuje stejne jako property tak se uvede jen ten nazev
//kdyz chci aby se nova const jmenovala jinak tak to uvedu jako property: novyNazev
//muzu zadat defaultni hodnotu nove const pokud ta property v objektu neexistuje, ve formatu nazev = vychoziHodnota
const { name: firstName = "Anonym", age} = person;
console.log (`${firstName} is ${age}`);


//to same, jen nove const beru z nested objektu person.location
const { city, temp: temperature} = person.location;
console.log (`Je prave ${temperature} v ${city}`);



const book = {
    title: "EGO is the Enemy",
    author: "Ryan Holiday",
    publisher: {
        name: "Penguin"
    }
};

const {name: publisherName = "self-published"} = book.publisher;
console.log(publisherName);






//ARRAY DeSTRUCTURING
//podobne jako object destructuring jen v [], podle poradi v array. Kdy nepotrebuju tak jen carka
const address = ["1299 Julia Fucika", "Moskva", "SSSR", "74698"];

const [street, mesto, , zip = "666"] = address;

console.log(`you are in ${address[1]} a mesto je ${mesto}`)