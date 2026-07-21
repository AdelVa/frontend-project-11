import { subscribe } from 'valtio/vanilla'

const view = (state, elements, i18nextInstance) => {

    subscribe(state.form, () => {
        elements.feedback.classList.remove('text-danger', 'text-success');
        elements.feedback.classList.add(state.form.valid ? 'text-success' : 'text-danger');
        elements.feedback.textContent = i18nextInstance.t(state.form.feedback);


        elements.input.classList.toggle("is-invalid", !state.form.valid);
        if (state.form.valid) {
            elements.input.value = '';
            elements.input.focus();
        };
    });
}   

export default view;