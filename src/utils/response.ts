import { notification, type NotificationPlacement } from 'ant-design-vue';

export const errorHandler = (
  message: string,
  position: NotificationPlacement | undefined = 'bottomRight',
  description: string = ''
) => {
  notification.error({
    message: message,
    placement: position,
    description: description
  });
};

export const successHandler = (
  message: string,
  position: NotificationPlacement | undefined = 'bottomRight',
  description: string = ''
) => {
  notification.success({
    message: message,
    placement: position,
    description: description
  });
};