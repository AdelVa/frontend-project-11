import * as yup from 'yup'
import { proxy } from 'valtio/vanilla'
import view from './view.js'

const app = () => {

  const schema = (feeds) => yup.string()
                  .required('Не должно быть пустым')
                  .url('Ссылка должна быть валидным URL')
                  .notOneOf(feeds, 'RSS уже существует')

  const validate = (url, feeds) => {
      return schema(feeds)
      .validate(url)
      .then(() => null)
      .catch(error => error.message)
  }

  const state = proxy({
    feeds: [], 
    posts: [],
    form: {
      error: null,
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
      state.form.error = error;
      state.form.valid = false;
    } else {
      state.feeds.push(url);
      state.form.error = null;
      state.form.valid = true;
    }
  });

  view(state, elements);

};

export default app;