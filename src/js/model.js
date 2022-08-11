import { async } from 'regenerator-runtime'; //for pollyfilling async functions and saving it in a async named variable
import { API_URL, KEY } from './config.js';
import { AJAX } from './helper.js';
import { RES_PER_PAGE } from './config.js';
export const state = {
    recipe: {},
    search: {
        Searched_item: '',
        search_results: [],
        results_per_page: RES_PER_PAGE,
        page: 1
    },
    bookmarks: [],
}
const createRecipeObject = function (data) {
    let { recipe } = data.data;
    return {
        id: recipe.id,
        cookingtime: recipe.cooking_time,
        imageurl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        title: recipe.title,
        sourceurl: recipe.source_url,
        ...(recipe.key && { key: recipe.key }) // ye humne new method se kiya hai . toh ye && operator shortcircuit karta hai
        // toh yaha check hoga ki recipe.key naam se agr hai toh jo && iske bagal wala hai vo execute hoga ki
        // key naam me recipe.key ki value chaldegi aur spread operator se vo object spread hoke waha vo value bas ajayegi
        //aur agar isme recipe.key naam se kch nahi hoga toh && operator k pehle jo hai recipe.key isme false ajayega aur
        // ye sab kuch execute nahi hoga -----> ye kafi usefull shorthand technique hai
    }
}
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data)

        if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
        console.log(state.recipe);
        // console.log(recipe);
    } catch (err) {
        console.log(err);
        throw err
    }
};

export const loadsearchResults = async function (Searched_item) {
    try {
        state.search.Searched_item = Searched_item;
        const data = await AJAX(`${API_URL}?search=${Searched_item}&key=${KEY}`);
        console.log(data);

        state.search.search_results = data.data.recipes.map(elem => {
            return {
                id: elem.id,
                imageurl: elem.image_url,
                publisher: elem.publisher,
                title: elem.title,
                ...(elem.key && { key: elem.key })
            };//creating an object in search results so that we can take these informations and make preview of results in the side bar

        });
        state.search.page = 1  //resetting page number because of a bug note no.4 on notebook
        // console.log(state.search.search_results);

    } catch (err) {
        console.log(err);
        throw err
    }
};

export const getSearchresults = function (page_number = state.search.page) {
    state.search.page = page_number
    const start = (page_number - 1) * state.search.results_per_page; //0
    const end = page_number * state.search.results_per_page;//9
    return state.search.search_results.slice(start, end);
}

// ye above function humne banaya hai taaki hum jon result ayega usse kuch hi items dikhaye fir
// aur baaki items hum next page me dikhaye ye pagination functionality k liye hai.

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing =>
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
    //newQt = oldQt * newservings(ex-8) / oldserving(ex-4) 2 * 8 / 4 = 4

    state.recipe.servings = newServings;
}

//BOOKMARK FUNCTIONALITIES____
const PersistBookmark = function () {
    localStorage.setItem('bookMark', JSON.stringify(state.bookmarks))
}


export const AddBookMark = function (Current_recipe) {
    state.bookmarks.push(Current_recipe);
    console.log(state.bookmarks);
    if (Current_recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    PersistBookmark()
};

export const DeleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(elem => elem.id === id);
    state.bookmarks.splice(index, 1)
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    PersistBookmark()
}

export const Upload_recipe = async function (Newrecipe) {
    try {


        const ingredients = Object.entries(Newrecipe)
            .filter(elem => elem[0].startsWith('ingredient') && elem[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                if (ingArr.length !== 3) throw new Error('Wrong ingredient format!, please use the correct format');


                const [quantity, unit, description] = ingArr
                //note ---> split method is not working because it is called on a string and it returns an array 
                ///here an error occured because these functions are called on string and we were using it on
                // whole array , when we filtered in line 110 we selected elem[1] which is a string and all 
                // the details of quantity and unit and description which we want to destructure that's why we
                // now take that element [1] and use these methods which will now work -- bug solved
                return {
                    quantity: quantity ? +quantity : null, unit, description
                };
            }
            );

        const recipe = {
            cooking_time: +Newrecipe.cookingTime,
            image_url: Newrecipe.image,
            ingredients,
            publisher: Newrecipe.publisher,
            servings: +Newrecipe.servings,
            source_url: Newrecipe.sourceUrl,
            title: Newrecipe.title
        }
        console.log(recipe);
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
        //  ^^ calling sendjson method with 2 arguments
        //  1st is URL and second is jo humko post karna hai
        // api me vo joki h recipe object same as jo humlog 
        // import karte hai
        state.recipe = createRecipeObject(data)
        AddBookMark(state.recipe);
        console.log(state.recipe);

    } catch (err) {
        throw err
    }


}

const init = function () {
    const store = JSON.parse(localStorage.getItem('bookMark'));
    state.bookmarks = store
    console.log(state.bookmarks);
}
init()