import React from "react";

interface NotificationProps {
  title: string;
  message: string;
  read?: boolean;
  onClick?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, message, read, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded cursor-pointer border mb-2 ${
        read ? "bg-gray-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
      }`}
    >
      <h4 className="font-bold">{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
