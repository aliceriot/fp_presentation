const R = require('ramda');

const S = require('sanctuary');

const {
  Just,
  Nothing,
  Right,
  Left
} = S;

let zip = R.curry((s1, s2) => (
  s1.split('').map((char, idx) => [
    char, s2[idx]
  ])
));

const guard = func => (...args) => {
  if (R.any(R.isNil, args)) {
    return S.Nothing;
  } else {
    return S.Just(func(...args));
  }
};

const getm = R.curry((prop, obj) => (
  S.toMaybe(R.prop(prop, obj))
));
