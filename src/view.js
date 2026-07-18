import { proxy, subscribe, snapshot } from 'valtio/vanilla'

export default (state, elements) => {

    subscribe(state.form, () => {
    if (state.form.valid) {
        elements.feedback.textContent = "RSS успешно загружен";
        elements.feedback.classList.remove('text-danger');
        elements.feedback.classList.add('text-success');

        elements.input.classList.remove('is-invalid');
        elements.input.value = '';
        elements.input.focus();

    } else {
        elements.feedback.textContent = state.form.error;
        elements.feedback.classList.remove('text-success');
        elements.feedback.classList.add('text-danger');

        elements.input.classList.add('is-invalid');
    }
    });

};