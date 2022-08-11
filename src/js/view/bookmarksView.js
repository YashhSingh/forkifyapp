import icons from 'url:../../img/icons.svg';
import View from "./view.js";
import previewView from "./previewView.js"

class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _default_error_message = 'We could not find that recipe, please try another one';
    _success_message = '';

    addhandlerBookmark(handler) {
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');

    }

}
export default new bookmarksView()