const { h, app } = require('hyperapp');
/** @jsx h */
const isBrowser = typeof document !== 'undefined';

const db = window.localStorage || {
  getItem: name => null,
  setItem: (name, value) => null,
};
const savedValue = parseInt(db.getItem('hypercounter'));

const ACTIONS = {
  UP: 'up',
  DOWN: 'down',
  NONE: '-',
};

const state = {
  count: savedValue || 0,
  action: ACTIONS.NONE,
  saved: savedValue || null,
};

const actions = {
  down: () => state => {
    resetAction();
    return { count: state.count - 1, action: ACTIONS.DOWN };
  },
  up: () => state => {
    resetAction();
    return { count: state.count + 1, action: ACTIONS.UP };
  },
  save: () => state => {
    db.setItem('hypercounter', state.count);
    return { saved: state.count };
  },
  clear: () => state => {
    db.clear();
    return { count: 0, saved: null };
  },
  action: value => state => {
    return { action: value };
  },
};

let timeout;
const resetAction = (delay = 1000) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    counter.action(ACTIONS.NONE);
  }, delay);
};

const Button = ({ label, action, disabled = false }) => (
  <button onclick={action} disabled={disabled}>
    {label}
  </button>
);

const SimpleButton = (label, action) => (
  <button onclick={action}>{label}</button>
);

const Article = ({ title = 'counting', text, ...props }) => (
  <article class={`count_${text}`} {...props}>
    <h2>{title}</h2>
    <p>{text}</p>
  </article>
);

const View = (state, actions) => (
  <main>
    <h1>hyperapp counter</h1>
    <output>{state.count}</output>
    {Button({ label: '-', action: actions.down, disabled: state.count <= 0 })}
    {SimpleButton('+', actions.up)}
    {Article({
      text: state.action,
      'data-atributes': 'work',
      style: { color: 'inherit' },
    })}
    <button onclick={actions.save}>save</button>
    <button onclick={actions.clear}>clear</button>
    <footer>{state.saved !== null && <p>saved: {state.saved}</p>} </footer>
  </main>
);

const counter = app(state, actions, View, document.body);
