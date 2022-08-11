import icons from 'url:../../img/icons.svg';
import View from "./view.js";

class addrecipeView extends View {
    _success_message = 'Recipe successfully Uploaded 😋😀'
    _parentElement = document.querySelector('.upload');
    _overlay = document.querySelector('.overlay');
    _recipewindow = document.querySelector('.add-recipe-window');
    _addrecipebtn = document.querySelector('.nav__btn--add-recipe');
    _closerecipebtn = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlershowWindow();
        this._addHandlercloseWindow();
    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._recipewindow.classList.toggle('hidden');
    }

    //showing and closing of the modal and form
    _addHandlershowWindow() {
        this._addrecipebtn.addEventListener('click', this._toggleWindow.bind(this));
    }

    _addHandlercloseWindow() {
        this._closerecipebtn.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this));
    }
    //extracting the data from the form functionality
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)]//this data is in array form
            const Objectdata = Object.fromEntries(dataArr)// now with the es19 function (i.e a Object.fromEntries which takes an array of entries and convert them to object form)
            handler(Objectdata)
        })
    }


    _generateMarkup() {

    }
}

export default new addrecipeView();