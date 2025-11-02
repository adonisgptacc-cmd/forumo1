import type { ToastEventDetail } from '../components/toaster';

let counter = 0;

export function showToast(message: string, type: ToastEventDetail['type'] = 'info') {
  const detail: ToastEventDetail = {
    id: ++counter,
    message,
    type,
  };
  window.dispatchEvent(new CustomEvent<ToastEventDetail>('forumo:toast', { detail }));
}
