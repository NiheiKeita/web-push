"use client"

import { useEffect, useState } from "react"
import { getToken, isSupported } from "firebase/messaging"
import { messaging } from "~/firebase/config"
import useNotificationPermissionStatus from "./useNotificationPermissionStatus"

const useFCMToken = () => {
  const permission = useNotificationPermissionStatus()
  const [fcmToken, setFcmToken] = useState<string | null>(null)

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window === "undefined") return
      if (!("serviceWorker" in navigator)) return
      if (permission !== "granted") return
      if (!messaging) return

      try {
        const isFCMSupported = await isSupported()
        if (!isFCMSupported) return

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        })
        setFcmToken(token)
      } catch (error) {
        console.error('FCMトークン取得エラー:', error)
      }
    }

    retrieveToken()
  }, [permission])

  return fcmToken
}

export default useFCMToken
