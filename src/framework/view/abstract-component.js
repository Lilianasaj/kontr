
class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    getTemplate() {
        throw new Error("Abstract method: getTemplate must be implemented");
    }

    getElement() {
        if (!this._element) {
            this._element = this.createElement(this.getTemplate());
        }
        return this._element;
    }

    createElement(template) {
        const newElement = document.createElement('div');
        newElement.innerHTML = template;
        return newElement.firstElementChild;
    }

    removeElement() {
        this._element = null;
    }
}

export default AbstractComponent;