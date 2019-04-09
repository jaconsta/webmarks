package email

import (
  "log"
  "fmt"
  "net/smtp"
  "os"
)

func SendEmail (userEmail string, code string) error {
  emailUser := os.Getenv("EMAIL_USER")
  emailSenderName := os.Getenv("EMAIL_SENDER_NAME")
  emailPassword := os.Getenv("EMAIL_PASSWORD")
  emailHost := os.Getenv("EMAIL_HOST")
  emailSmtpSender := os.Getenv("EMAIL_SMTP_SENDER")

  // Auth information
  auth := smtp.PlainAuth(
    "",
    emailUser,
    emailPassword,
    emailHost,
  )
  message := fmt.Sprintf(
    "From: %s<%s>\r\n" +
    "To: %s\r\n" +
    "Subject: Your access code\r\n" +
    "<h1>Hello.<h1> <p>This is your code %s.</p>",
    emailSenderName, emailUser, userEmail, code,
  )

  // Connect and send Email
  err := smtp.SendMail(
    emailSmtpSender,
    auth,
    emailUser,
    []string{userEmail},
    []byte(message),
  )
  if err != nil {
    log.Printf("%s", err)
  }
  return err
}
