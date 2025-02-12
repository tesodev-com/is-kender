export function useIsMobile(): boolean {
  return typeof navigator !== 'undefined' ? /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false;
}
