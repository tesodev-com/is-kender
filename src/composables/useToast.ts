import ToastServices from '@/components/Toast/ToastServices';

export function useToast() {
  return {
    add: ToastServices.add,
    removeAll: ToastServices.removeAll
  };
}