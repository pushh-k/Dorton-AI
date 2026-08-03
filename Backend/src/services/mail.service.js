import "../config/env.js"
import { BrevoClient } from "@getbrevo/brevo"
import nodemailer from "nodemailer"

let brevoClient
let smtpTransporter

function getBrevoClient() {
  if (brevoClient) {
    return brevoClient
  }

  const apiKey = process.env.BREVO_API_KEY?.trim()

  if (!apiKey) {
    throw new Error("BREVO_API_KEY must be configured")
  }

  brevoClient = new BrevoClient({ apiKey })
  return brevoClient
}

function hasSmtpConfig() {
  return Boolean(
    (process.env.SMTP_USER?.trim() || process.env.EMAIL?.trim()) &&
    (process.env.SMTP_PASS?.trim() || process.env.APP_PASSWORD?.trim())
  )
}

function getSmtpTransporter() {
  if (smtpTransporter) {
    return smtpTransporter
  }

  if (!hasSmtpConfig()) {
    throw new Error("SMTP_USER and SMTP_PASS (or EMAIL and APP_PASSWORD) must be configured")
  }

  const port = Number(process.env.SMTP_PORT || 587)
  smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: port === 465,
    family: 4,
    auth: {
      user: process.env.SMTP_USER?.trim() || process.env.EMAIL?.trim(),
      pass: process.env.SMTP_PASS?.trim() || process.env.APP_PASSWORD?.trim(),
    },
  })

  return smtpTransporter
}

async function sendEmailWithSmtp({ to, html, subject, text }) {
  const senderEmail = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim() || process.env.EMAIL?.trim()
  const senderName = process.env.SMTP_FROM_NAME?.trim() || process.env.BREVO_FROM_NAME?.trim() || "Dorton AI"

  if (!senderEmail) {
    throw new Error("SMTP_FROM or SMTP_USER must be configured")
  }

  return getSmtpTransporter().sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to,
    subject,
    html,
    text,
  })
}

async function sendEmailWithBrevo({ to, html, subject, text }) {
  const senderEmail = process.env.BREVO_FROM_EMAIL?.trim()
  const senderName = process.env.BREVO_FROM_NAME?.trim() || "Dorton AI"

  if (!senderEmail) {
    throw new Error("BREVO_FROM_EMAIL must be configured")
  }

  return getBrevoClient().transactionalEmails.sendTransacEmail({
    sender: {
      email: senderEmail,
      name: senderName,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
    textContent: text,
  })
}

export async function sendEmail({ to, html, subject, text }) {
  if (process.env.BREVO_API_KEY?.trim()) {
    return sendEmailWithBrevo({ to, html, subject, text })
  }

  if (hasSmtpConfig()) {
    return sendEmailWithSmtp({ to, html, subject, text })
  }

  throw new Error("Configure BREVO_API_KEY and BREVO_FROM_EMAIL, or SMTP credentials")
}
