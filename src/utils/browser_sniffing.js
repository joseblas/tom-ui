export function isIE() {
  const userAgent = navigator.userAgent;
  return userAgent.indexOf('MSIE') !== -1 ||
    userAgent.indexOf('Trident') !== -1;
}
