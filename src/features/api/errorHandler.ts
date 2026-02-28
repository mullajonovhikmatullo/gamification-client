import { toast } from 'sonner';
import type { AxiosError, AxiosResponse } from 'axios';

const baseOptions = {
  duration: 2500,
};

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

/**
 * ToastHelper qabul qilishi mumkin:
 * - string message
 * - axios error
 * - axios response
 */
export const ToastHelper = (
  payload: string | AxiosError | AxiosResponse,
  type?: ToastType,
) => {
  let message = '';
  let status: number | undefined = undefined;

  // Agar string yuborilsa
  if (typeof payload === 'string') {
    message = payload;
  }

  // Agar AxiosError bo'lsa
  else if ((payload as AxiosError).isAxiosError) {
    const err = payload as AxiosError;
    const errorData = err.response?.data as { message?: string } | undefined;
    message = errorData?.message || err.message || 'Nimadir xato ketdi';
    status = err.response?.status;
  }

  // Agar AxiosResponse bo'lsa
  else if ((payload as AxiosResponse).status) {
    const res = payload as AxiosResponse;
    const responseData = res.data as { message?: string } | undefined;
    message = responseData?.message || 'Muvaffaqiyatli';
    status = res.status;
  }

  // Status asosida avtomatik aniqlash
  if (status) {
    if (status >= 200 && status < 300) return toast.success(message, baseOptions);
    if ([400, 422].includes(status)) return toast.error(message, baseOptions);
    if (status === 401) return toast.warning('Avtorizatsiya qilinmagan', baseOptions);
    if (status === 403) return toast.warning('Kirish taqiqlangan', baseOptions);
    if (status === 404) return toast.info('Topilmadi', baseOptions);
    if (status >= 500) return toast.error('Server xatosi', baseOptions);
  }

  // Type asosida aniqlash
  switch (type) {
    case 'success':
      return toast.success(message, baseOptions);
    case 'error':
      return toast.error(message, baseOptions);
    case 'info':
      return toast.info(message, baseOptions);
    case 'warning':
      return toast.warning(message, baseOptions);
    default:
      return toast(message, baseOptions);
  }
};
