"use client";
import { useState, useEffect, use } from "react";
import { Menu, MenuButton, Transition } from "@headlessui/react";
import { Fragment } from "react";
import NOTIFICATION_ICON from "../assets/icons/bell.svg";
import Image from "next/image";
import { isLoggedIn } from "@/services/api/auth/getCurrentUserInfo";
import { fetchUserNoti } from "@/services/api/auth/notification-op";
const sampleNotifications: UserNotification[] = [
  {
    id: "1",
    title: "Welcome to our store!",
    content: "Get 10% off",
    createdAt: "2021-09-01T12:00:00.000Z", // "2021-09-01T12:00:00.000Z
    isRead: false,
  },
  {
    id: "2",
    title: "New product available",
    content: "Check out our new products",
    createdAt: "2021-09-02T12:00:00.000Z",
    isRead: false,
  },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace this with actual API fetching logic
        const data = await fetchUserNoti();
        setNotifications(data); // Update with actual fetched data
      } catch (error) {
        console.log("Failed to fetch notifications", error);
        setNotifications(sampleNotifications);
      }
    };
    const checkLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        setNotifications([]);
      } else await fetchNotifications();
      setLogged(loggedIn);
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    // Simulate fetching notifications from an API
  }, []);

  return (
    <Menu as="div" className="relative">
      <MenuButton as="div">
        <button className="p-2 w-10 h-10 border-none outline-none duration-200 rounded-lg background-white hover:bg-secondary-200 active:bg-secondary-300">
          <Image
            src={NOTIFICATION_ICON}
            width={24}
            height={24}
            alt="notification"
            className="object-bottom"
          />
        </button>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {logged ? (
              <>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      {({ active }) => (
                        <li
                          className={`p-4 border-b ${
                            active ? "bg-gray-100" : "bg-white"
                          } ${
                            notification.isRead ? "text-gray-500" : "text-black"
                          }`}
                        >
                          <h4 className="font-bold">{notification.title}</h4>
                          <p className="text-sm">{notification.content}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </li>
                      )}
                    </Menu.Item>
                  ))
                ) : (
                  <li className="p-4 text-gray-500">No notifications</li>
                )}
              </>
            ) : (
              <>
                <li className="p-4 text-gray-500">
                  Please login to view notifications
                </li>
              </>
            )}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
