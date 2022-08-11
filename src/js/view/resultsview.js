import icons from 'url:../../img/icons.svg';
import View from "./view.js";
import previewView from "./previewView.js"

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _default_error_message = 'We could not find that recipe, please try another one';
  _success_message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');

  }

}
export default new ResultsView()