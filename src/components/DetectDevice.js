function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return "phone";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "phone";
  } else {
    return "computer";
  }
}

export default detectDevice;
