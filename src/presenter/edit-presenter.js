import EditFormComponent from '../view/edit-form-component.js';

class EditPresenter {
    constructor(tripModel) {
        this._tripModel = tripModel;
        this._currentEditForm = null;
    }

    openEditForm(trip, container) {

        this.closeEditForm();

        this._currentEditForm = new EditFormComponent(trip);

        this._currentEditForm.setSaveHandler((formData) => this._handleSave(formData));
        this._currentEditForm.setCancelHandler(() => this._handleCancel());

        container.appendChild(this._currentEditForm.getElement());

        this._currentEditForm.open();
    }

    closeEditForm() {
        if (this._currentEditForm) {
            this._currentEditForm.close();
            this._currentEditForm.removeElement();
            this._currentEditForm = null;
        }
    }

    _handleSave(formData) {
        try {
            this._tripModel.updateTrip(formData);
            this.closeEditForm();
            console.log('Поездка успешно обновлена');
        } catch (error) {
            alert('Ошибка при сохранении: ' + error.message);
        }
    }

    _handleCancel() {
        this.closeEditForm();
    }
}

export default EditPresenter;