class FormPresenter {
    constructor(formComponent, tripModel) {
        this._formComponent = formComponent;
        this._tripModel = tripModel;
        
        this._formComponent.setSubmitHandler(this._handleFormSubmit.bind(this));
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
        
        const formData = this._formComponent.getFormData();
        
        if (formData.destination && formData.date && formData.status) {
            this._tripModel.addTrip(formData);
            this._formComponent.resetForm();
        }
    }
}

export default FormPresenter;