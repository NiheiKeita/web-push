'use client'

import { useMount } from "react-use"
import useFCM from "~/firebase/useFCM"

export const TopView = () => {

  useMount(() => {
    // 現在の通知許可状態を取得
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        console.log(`Notification:`, permission)
        alert(permission)
      })
    }
  })
  const { messages, fcmToken } = useFCM()
  console.log(`messages:`, messages)

  return (
    <div>
      <p>fcmToken: {fcmToken}</p>
      <p>messages: {JSON.stringify(messages)}</p>
    </div>
  )
} 