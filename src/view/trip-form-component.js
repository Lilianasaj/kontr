import AbstractComponent from '../framework/view/abstract-component.js';

class TripFormComponent extends AbstractComponent {
    constructor() {
        super();
        this._submitHandler = null;
    }

    getTemplate() {
        return `
            <div class="trip-form">
                <h2>Добавить новую поездку</h2>
                <form id="trip-form">
                    <label for="trip-destination">Путешествие:</label>
                    <input type="text" id="trip-destination" placeholder="Destination" required />
                    <label for="trip-date">Дата:</label>
                    <input type="date" id="trip-date" required />
                    <label for="trip-notes">Заметки:</label>
                    <textarea id="trip-notes" placeholder="Notes" rows="3"></textarea>

                    <fieldset>
                        <legend>Статус поездки:</legend>
                        <label><input type="radio" name="trip-status" value="Planned" required /> Запланировано</label>
                        <label><input type="radio" name="trip-status" value="Completed" required /> Выполнено</label>
                    </fieldset>

                    <button type="submit">Добавить поездку</button>
                </form>
            </div>
        `;
    }

    setSubmitHandler(handler) {
        this._submitHandler = handler;
        this.getElement().querySelector('form').addEventListener('submit', handler);
    }

    getFormData() {
        const form = this.getElement().querySelector('form');
        return {
            destination: form.querySelector('#trip-destination').value,
            date: form.querySelector('#trip-date').value,
            notes: form.querySelector('#trip-notes').value,
            status: form.querySelector('input[name="trip-status"]:checked').value
        };
    }

    resetForm() {
        this.getElement().querySelector('form').reset();
    }
}

export default TripFormComponent;