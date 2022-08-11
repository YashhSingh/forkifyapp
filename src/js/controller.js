import 'core-js/stable'; // polyfilling everything else 
import 'regenerator-runtime/runtime'  //pollyfilling async await 
// import { loadRecipe } from './model.js'
// import { state } from './model.js'
import * as model from './model.js'
import { render } from 'sass';
import { SETTIME } from './config.js'
import recipeView from './view/recipeView.js';
import searchViews from './view/searchView.js';
import resultsView from './view/resultsview.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addrecipeView from './view/addrecipeView.js';



// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 1 getting hash id 
    const id = window.location.hash.slice(1) //getting hash dynamically from window location 

    if (!id) return;

    // 2 rendering spinner while loading
    recipeView.renderspinner();

    resultsView.update(model.getSearchresults());
    bookmarksView.update(model.state.bookmarks)
    // 3 loading recipe 
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 4 the loaded recipe
    recipeView.render(model.state.recipe)

    // 5 bookmarked recipes



  } catch (err) {
    console.log(err);
    recipeView.renderError();  //ye bhi publisher subscriber pattern me hai 
  }
}

// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes); //same codes -->> !! violating DRY principle

// A better way ___ with loop because we want to run same function on both events ---> in recipeview addhandler

//Search results functionality

const controlsearchResults = async function () {
  try {
    resultsView.renderspinner()
    //part 1 => getting searched item
    const ItemSearched = searchViews.getSearchedItem()

    if (!ItemSearched) return;
    //part 2 => loading searched item
    await model.loadsearchResults(ItemSearched);

    //part 3 => rendering all searched items
    resultsView.render(model.getSearchresults());

    //part 4 => displaying page buttons
    paginationView.render(model.state.search);


  } catch (err) {
    console.log(err);
  }
};

const control_pagination = function (go_to_page) {
  resultsView.render(model.getSearchresults(go_to_page));

  paginationView.render(model.state.search)
}

const controlServings = function (newServing) { // new servings me updateto kar k variabl hai jo ki addHandlerservings function inside recipeView me h 
  model.updateServings(newServing);
  recipeView.update(model.state.recipe)
}
//explanation of this above functionality in notebook


//Bookmark Functionality

const ControlBookmarks = function () {
  try {
    // 1 Add/Delete bookmarks
    if (!model.state.recipe.bookmarked) {
      model.AddBookMark(model.state.recipe)

    } else {
      model.DeleteBookmark(model.state.recipe.id)
    }
    // console.log('bookmarked', model.state.recipe);

    // 2 updating the UI of bookmarks
    recipeView.update(model.state.recipe);

    // 3 rendering the Bookmarks
    bookmarksView.render(model.state.bookmarks)
  } catch (err) {
    console.log(err);
  }
}
const controlbookmarkrefreshed = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controluploadrecipe = async function (dataPassed) {
  try {
    // console.log(dataPassed);
    //rendering spinner
    addrecipeView.renderspinner()


    //uploading recipe

    await model.Upload_recipe(dataPassed)
    console.log(model.state.recipe);

    //rendering the uploaded recipe
    recipeView.render(model.state.recipe)

    //showing success message
    addrecipeView.renderSuccess();
    // console.log(SETTIME);

    //rendering bookmark
    bookmarksView.render(model.state.bookmarks)

    //change ID in url without reloading the whole page
    // window.history.pushState(null, '', `#${model.state.recipe.id}`)

    //shutting off the modal after the submission 
    setTimeout(function () {
      addrecipeView._toggleWindow()
    }, SETTIME * 1000)

  } catch (err) {
    console.error(`😂${err}`);
    addrecipeView.renderError(err);
  }

}

const init = function () {
  bookmarksView.addhandlerBookmark(controlbookmarkrefreshed)
  recipeView.addHandler(controlRecipes);
  recipeView.addhandlerServings(controlServings);
  recipeView.addhandlerBookmark(ControlBookmarks);
  searchViews.addHandlerSearch(controlsearchResults);
  paginationView._addhandler_page(control_pagination);
  addrecipeView.addHandlerUpload(controluploadrecipe);
}
// this init function is done because of publisher subscriber function---> read explanation from notebook
init();