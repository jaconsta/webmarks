package email

import (
  "log"
  "fmt"
  "os"

  "github.com/sendgrid/sendgrid-go"
  "github.com/sendgrid/sendgrid-go/helpers/mail"
)

func SendEmail (userEmail string, code string) error {
  emailUser := os.Getenv("EMAIL_USER")
  emailSenderName := os.Getenv("EMAIL_SENDER_NAME")
  sendgridKey := os.Getenv("SENDGRID_API_KEY")

  from := mail.NewEmail(emailSenderName, emailUser)
  subject := "Your access code"
  to := mail.NewEmail("Dear user", userEmail)
  plainTextContent := "This is your code."
  htmlContent := fmt.Sprintf("<h1>Hello.<h1> <p>This is your code %s.</p>", code)
  message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
  client := sendgrid.NewSendClient(sendgridKey)

  _, err := client.Send(message)
  if err !=  nil {
    log.Println("Could not send the authentication CODE email")
    log.Printf("%s", err)
  }
  return err
}
