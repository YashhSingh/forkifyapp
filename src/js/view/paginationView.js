import icons from 'url:../../img/icons.svg';
import View from "./view.js";

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addhandler_page(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const go_to_page = +btn.dataset.goto;
      console.log(go_to_page);
      handler(go_to_page);
    })
  }

  _generateMarkup() {
    const Number_of_page = Math.ceil(this._data.search_results.length /
      this._data.results_per_page);
    const Current_page = this._data.page;

    console.log(Number_of_page);
    //case 1 if we are on page 1 and there are other pages
    if (Current_page === 1 && Number_of_page > Current_page) {

      return `
            <button data-goto = " ${Current_page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${Current_page + 1}</span>
            <svg class="searc__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //last page
    if (Current_page === Number_of_page && Number_of_page > 1) {

      return `
            <button data-goto = " ${Current_page - 1}" class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
               <use href="${icons}.svg#icon-arrow-left"></use>
             </svg>
             <span>Page ${Current_page - 1}</span>
            </button>`;
    }
    //other page
    if (Current_page < Number_of_page) {

      return `<button data-goto = " ${Current_page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${Current_page - 1}</span>
           </button>
           
           <button data-goto = " ${Current_page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${Current_page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </button>
           `;
    }
    //case 2 if we are on page 1 and there are no other pages

    return '';

  }
}

export default new paginationView();