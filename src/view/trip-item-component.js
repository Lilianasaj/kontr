import AbstractComponent from '../framework/view/abstract-component.js';

class TripItemComponent extends AbstractComponent {
    constructor(trip) {
        super();
        this._trip = trip;
        this._deleteHandler = null;
        this._editHandler = null;
    }

    getTemplate() {
        const statusText = this._trip.status === 'Completed' ? 'Выполнено' : 'Запланировано';
        const statusClass = this._trip.status === 'Completed' ? 'trip-status-completed' : 'trip-status-planned';
        
        return `
            <li class="trip-item" data-id="${this._trip.id}">
                <div class="trip-info">
                    <h3 class="trip-destination">${this._trip.destination}</h3>
                    <p class="trip-date"><strong>Дата:</strong> ${this.formatDate(this._trip.date)}</p>
                    <p class="trip-notes"><strong>Заметки:</strong> ${this._trip.notes || 'Нет заметок'}</p>
                    <p class="trip-status ${statusClass}"><strong>Статус:</strong> ${statusText}</p>
                </div>
                <div class="trip-actions">
                    <button class="edit-btn" type="button" data-id="${this._trip.id}"> Редактировать</button>
                    <button class="delete-btn" type="button" data-id="${this._trip.id}"> Удалить</button>
                </div>
            </li>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }

    setDeleteHandler(handler) {
        this._deleteHandler = handler;
        const deleteBtn = this.getElement().querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', this._handleDelete.bind(this));
        }
    }

    setEditHandler(handler) {
        this._editHandler = handler;
        const editBtn = this.getElement().querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', this._handleEdit.bind(this));
        }
    }

    _handleDelete(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this._deleteHandler) {
            this._deleteHandler(this._trip.id);
        }
    }

    _handleEdit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('Edit button clicked for trip:', this._trip.id); // Для отладки
        if (this._editHandler) {
            this._editHandler(this._trip);
        }
    }

    removeElement() {

        const deleteBtn = this.getElement().querySelector('.delete-btn');
        const editBtn = this.getElement().querySelector('.edit-btn');
        
        if (deleteBtn) {
            deleteBtn.removeEventListener('click', this._handleDelete);
        }
        if (editBtn) {
            editBtn.removeEventListener('click', this._handleEdit);
        }
        
        super.removeElement();
    }
}

export default TripItemComponent;