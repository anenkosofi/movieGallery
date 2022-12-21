export function renderDefaultPicture() {
  const markup =
    '<div class="default-container"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-3/tumbleweed.svg" alt="" class="mover tumbleweed bouncy" /><div class="shadow"></div></div>';
  document
    .querySelector('section')
    .firstElementChild.insertAdjacentHTML('afterend', markup);
}
