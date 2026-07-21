import * as yup from 'yup';
import { proxy } from 'valtio/vanilla';
import i18n from 'i18next';
import resources from './resources.js';
import view from './view.js';

const app = () => {

  yup.setLocale({
    string: {
        url:'feedback.invalidUrl',
      },
    mixed: {
      required:'feedback.emptyInput',
      notOneOf:'feedback.alreadyExists',
    },
  });

  const schema = (feeds) => yup.string()
                  .required()
                  .url()
                  .notOneOf(feeds);

  const validate = (url, feeds) => {
      return schema(feeds)
      .validate(url)
      .then(() => null)
      .catch(error => error.message)
  };

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources,
  });

  const state = proxy({
    feeds: [], 
    posts: [],
    form: {
      feedback: null,
      valid: false,
    }
  });

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
  };


  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = elements.input.value.trim();
    const error = await validate(url, state.feeds);
    if (error) {
      state.form.feedback = error;
      state.form.valid = false;
    } else {
      state.feeds.push(url);
      state.form.feedback = 'feedback.success';
      state.form.valid = true;
    }
  });

  view(state, elements, i18nextInstance);

};

export default app;