import AbstractComponent from '../framework/view/abstract-component.js';

class EditFormComponent extends AbstractComponent {
    constructor(trip) {
        super();
        this._trip = trip;
        this._saveHandler = null;
        this._cancelHandler = null;
        this._isOpen = false;
    }

    getTemplate() {
        if (!this._isOpen) {
            return `<div class="edit-form-container"></div>`;
        }

        return `
            <div class="edit-form-container">
                <div class="edit-form-overlay"></div>
                <div class="edit-form">
                    <h3>Редактировать поездку в ${this._trip.destination}</h3>
                    <form class="edit-trip-form">
                        <label for="edit-destination-${this._trip.id}">Путешествие:</label>
                        <input type="text" id="edit-destination-${this._trip.id}" 
                               value="${this._trip.destination}" required />
                        
                        <label for="edit-date-${this._trip.id}">Дата:</label>
                        <input type="date" id="edit-date-${this._trip.id}" 
                               value="${this._trip.date}" required />
                        
                        <label for="edit-notes-${this._trip.id}">Заметки:</label>
                        <textarea id="edit-notes-${this._trip.id}" rows="3">${this._trip.notes || ''}</textarea>

                        <fieldset>
                            <legend>Статус поездки:</legend>
                            <label>
                                <input type="radio" name="edit-status-${this._trip.id}" 
                                       value="Planned" ${this._trip.status === 'Planned' ? 'checked' : ''} />
                                Запланировано
                            </label>
                            <label>
                                <input type="radio" name="edit-status-${this._trip.id}" 
                                       value="Completed" ${this._trip.status === 'Completed' ? 'checked' : ''} />
                                Выполнено
                            </label>
                        </fieldset>

                        <div class="edit-form-buttons">
                            <button type="submit" class="save-btn">Сохранить</button>
                            <button type="button" class="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    open() {
        this._isOpen = true;
        this.rerender();
        this._bindHandlers();
        document.addEventListener('keydown', this._handleEscKey.bind(this));
    }

    close() {
        this._isOpen = false;
        this.rerender();
        document.removeEventListener('keydown', this._handleEscKey.bind(this));
    }

    rerender() {
        const oldElement = this._element;
        const parentElement = oldElement ? oldElement.parentElement : null;
        
        this._element = null;
        const newElement = this.getElement();
        
        if (parentElement && oldElement) {
            parentElement.replaceChild(newElement, oldElement);
        }
    }

    _bindHandlers() {
        if (this._element && this._isOpen) {
            const form = this._element.querySelector('.edit-trip-form');
            const cancelBtn = this._element.querySelector('.cancel-btn');
            const overlay = this._element.querySelector('.edit-form-overlay');

            if (form) {
                form.addEventListener('submit', this._handleSave.bind(this));
            }
            if (cancelBtn) {
                cancelBtn.addEventListener('click', this._handleCancel.bind(this));
            }
            if (overlay) {
                overlay.addEventListener('click', this._handleCancel.bind(this));
            }
        }
    }

    setSaveHandler(handler) {
        this._saveHandler = handler;
    }

    setCancelHandler(handler) {
        this._cancelHandler = handler;
    }

    _handleSave(evt) {
        evt.preventDefault();
        if (this._saveHandler) {
            const formData = this.getFormData();
            this._saveHandler(formData);
        }
    }

    _handleCancel() {
        if (this._cancelHandler) {
            this._cancelHandler();
        }
    }

    _handleEscKey(evt) {
        if (evt.key === 'Escape') {
            this._handleCancel();
        }
    }

    getFormData() {
        return {
            id: this._trip.id,
            destination: document.querySelector(`#edit-destination-${this._trip.id}`).value,
            date: document.querySelector(`#edit-date-${this._trip.id}`).value,
            notes: document.querySelector(`#edit-notes-${this._trip.id}`).value,
            status: document.querySelector(`input[name="edit-status-${this._trip.id}"]:checked`).value
        };
    }

    removeElement() {
        if (this._element && this._element.parentElement) {
            this._element.parentElement.removeChild(this._element);
        }
        this._element = null;
    }
}

export default EditFormComponent;