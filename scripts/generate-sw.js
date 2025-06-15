const fs = require('fs')
const path = require('path')

const templatePath = path.join(__dirname, '../public/firebase-messaging-sw.template.js')
const outputPath = path.join(__dirname, '../public/firebase-messaging-sw.js')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let content = fs.readFileSync(templatePath, 'utf8')

Object.entries(firebaseConfig).forEach(([key, value]) => {
  content = content.replace(`"${key}"`, `"${value}"`)
})

fs.writeFileSync(outputPath, content)
console.log('Service Worker generated successfully!') 