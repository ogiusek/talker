function initNightMode() {
  const html = document.querySelector('html');
  const mode = Number(localStorage.getItem('nightmode'));

  mode ?
    html?.setAttribute('nightmode', '') :
    html?.removeAttribute('nightmode');
}

initNightMode();

export function toggleNightMode() {
  const html = document.querySelector('html');
  const mode = Number(localStorage.getItem('nightmode'));

  mode ?
    html?.removeAttribute('nightmode') :
    html?.setAttribute('nightmode', '');

  localStorage.setItem('nightmode', Number(!mode) + '');
}

export default toggleNightMode;