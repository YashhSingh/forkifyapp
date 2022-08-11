import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data, state = true) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError()
    this._data = data;
    const markup = this._generateMarkup();
    if (!state) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }

  update(data) {
    this._data = data;
    const Newmarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(Newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curelem = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElements);
    // console.log(curelem);

    newElements.forEach((newEl, i) => {
      const curEL = curelem[i]
      // console.log(curEL, newEl.isEqualNode(curEL));

      //UPDATES CHANGED TEXT
      if (!newEl.isEqualNode(curEL) &&
        newEl.firstChild?.nodeValue.trim() !== '') {

        curEL.textContent = newEl.textContent;
      }

      //UPDATE CHANGED ATTRIBUTES
      if (!newEl.isEqualNode(curEL))
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => curEL.setAttribute(attr.name, attr.value));

    })
  }




  _clear() {
    this._parentElement.innerHTML = '';
  };
  renderspinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}svg#icon-loader"></use>
          </svg>
          </div>`
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._default_error_message) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
    </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  };

  renderSuccess(message = this._success_message) {
    const markup = `<div class="message">
          <div>
            <svg>
              <use href="${icons}.svg#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  };
}