import icons from 'url:../../img/icons.svg';
import View from "./view.js";

class previewView extends View {
    _parentElement = '';


    _generateMarkup() {
        const curId = window.location.hash.slice(1);
        return ` <li class="preview">
          <a class="preview__link ${this._data.id === curId ? 'preview__link--active' : ''}" href="#${this._data.id}">
              <figure class="preview__fig">
                  <img src="${this._data.imageurl}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${this._data.title}</h4>
                  <p class="preview__publisher">${this._data.publisher}</p>
                  <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
          </a>
       </li> `
    }
}

export default new previewView()