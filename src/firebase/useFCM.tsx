import { useEffect, useState } from "react"
import { MessagePayload, onMessage } from "firebase/messaging"
import { messaging } from "~/firebase/config"
import useFCMToken from "./useFCMToken"

const useFCM = () => {
  const fcmToken = useFCMToken()
  const [messages, setMessages] = useState<MessagePayload[]>([])
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmMessaging = messaging
      const unsubscribe = onMessage(fcmMessaging, (payload) => {
        setMessages((messages) => [...messages, payload])
      })

      return () => unsubscribe()
    }
  }, [fcmToken])

  return { fcmToken, messages }
}

export default useFCM
