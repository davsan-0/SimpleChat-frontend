import notificationSrc from "../audio/notification.mp3";

export const playNotificationSound = () => {
  const notification = new Audio(notificationSrc);
  notification.play().catch((err) => console.log(err));
};
