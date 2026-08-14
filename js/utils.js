const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
