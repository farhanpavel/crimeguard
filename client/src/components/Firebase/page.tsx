'use client'
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { firebaseApp } from './firebase';


const useFcmToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');
  
    useEffect(() => {
      const retrieveToken = async () => {
        try {
          if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
  
            // Request notification permission
            const permission = await Notification.requestPermission();
            setNotificationPermissionStatus(permission);
  
            if (permission === 'granted') {
              const currentToken = await getToken(messaging, {
                vapidKey: 'BELnc4UWGNhilawfUu4iv23Ex7-6e84JMRaMFHq4TDoburxwc1NefCOVL3gpz1xOH7MjnDcDUnI-xIrj-PvNz8E', // Replace with your Firebase project's VAPID key
              });
              if (currentToken) {
                console.log('FCM token:', currentToken);
                setToken(currentToken);
              } else {
                console.log('No registration token available. Request permission to generate one.');
              }
            }
          }
        } catch (error) {
          console.log('Error retrieving token:', error);
        }
      };
  
      retrieveToken();
    }, []);
  
    return { fcmToken: token, notificationPermissionStatus };
  };

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => console.log('Foreground push notification received:', payload));
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
}