import { createStore } from "redux";

//action generators - fce ktera vrati action objekt, tady se definuje a pak se vlozi do store.dispatch
//payload je parametr, ktery dostaneme jako argument ve store.dispatch - je to objekt, kterym predavame data, tady {incrementBy: 5} ze store.dispatch, defaultne nastavime prazdny objekt

/* const incrementCount = (payload = {}) => ({
    type: "INCREMENT",
    zkouska: "rozhlasu ",
    incrementujBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
}); */

//to vyse jde zjednodusit destructuringem payload objektu, store.dispatch predava objekt {incrementujBy: 8}, ten se pouzije tady v incrementCount, pokud by predavany objekt ve store.dispatch....
//... neobsahoval property incrementujBy nebo by bylo predano neco jineho nez objekt tak se pouzije vychozi hodnota 1
//cely objekt musi mit jeste vychozi hodnotu nastavenou jako prazdny objekt {incrementujBy = 1} = {}, bo kdyby se spustila fce incrementCount() ve store.dispatch bez argumentu tak by to hodilo error (neda se hledat property na neexistujicim objektu)
const incrementCount = ({incrementujBy = 1} = {}) => ({
    type: "INCREMENT",
    incrementujBy // to same jako incrementujBy: incrementujBy
});

const decrementCount = ({decrementujBy = 1} = {}) =>({
    type: "DECREMENT",
    decrementujBy: decrementujBy
});

//tady nemam vychozi hodnotu bo to musi byt zadane
const setCount = ({nastav}) => ({
    type: "SET",
    nastav
});

const resetCount = () => ({
    type: "RESET"
})





//prvni argument je state, druhy argument je action, ta callback funkce se zavola po spusteni na zadani defaultnich hodnot a potom kdykoli se zavola store.dispatch() == to je REDUCER funkce
const store = createStore((state = { count: 0 }, action) => {
    
    switch(action.type) {
        //pokud action byla typu INCREMENT (ve store.dispatch je objekt {type: "INCREMENT"}) tak proved uvedenou zmenu ve state objektu
        case "INCREMENT":
            return {
                count: state.count + action.incrementujBy
                
            };
        case "DECREMENT":
            
            return {
                count: state.count - action.decrementujBy
            };
        case "SET":
            return {
                count: action.nastav
            };

        case "RESET":
            return {
                count: 0
            };
        //action.type neodpovida zadnemu case, tak se provede default -> return state se vraci stejny objekt takze zadna zmena
         default:
            return state;
    }

});


const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


//store.dispatch posila action objekt do store a ten s tim neco udela - nejakou zmenu ve store (zavola tu callback funkci v createStore)

//tady se pri zavolani store.dispatch zavola funkce incrementCount s argumentem {incrementBy: 8}, ta nam vrati jiny objekt s vice informacema, se kterym pak samotny store.dispatch pracuje
//jinymi slovy ten objekt co se vratil z incrementCount je pres store.dispatch poslan jako action objekt do store, kde se s nim dal pracuje
store.dispatch(incrementCount({ incrementujBy: 8}));

/* store.dispatch({
    type: "INCREMENT"
}); */




store.dispatch(decrementCount({decrementujBy: 10}));
store.dispatch(decrementCount());
    



store.dispatch(setCount({nastav: 227}));

store.dispatch(resetCount());
    

//SCHEMA
//store.dispatch(fce vracejici objekt) -> store.dispatch vraci action objekt a ten pouzije reducer fce  -> createStore(reducerFce(action objekt))


