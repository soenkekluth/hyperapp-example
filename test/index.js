import test from 'ava';

test('Insert to DOM', t => {
  // t.plan(2);

  const script = document.createElement('script');
  script.src = './dist/bundle.js';

  script.onload = () =>{
    t.log(window.counter);
    t.truthy(window.counter !== null, 'is not');
  }

  document.body.appendChild(script);

  window.counter.up();
  t.truthy(window.counter !== null, 'is not');
	// t.is(document.querySelector('script'), script);
});
