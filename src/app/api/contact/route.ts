import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message, userId } = data

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for authentication
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Create a formatted message
    const formattedMessage = `
      New message from your website contact form:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      User ID: ${userId}
      
      Message:
      ${message}
      
      Sent on: ${new Date().toLocaleString()}
    `

    // Log the message for debugging and storage
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      userId,
      timestamp: new Date().toISOString(),
    })

    // Configure email transport if environment variables are set
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: Number.parseInt(process.env.EMAIL_PORT || "587"),
          secure: process.env.EMAIL_SECURE === "true",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        })

        // Send email
        await transporter.sendMail({
          from: `"Website Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.CONTACT_EMAIL || "support@bgremoverpro.com",
          replyTo: email,
          subject: `New Contact Form: ${subject}`,
          text: formattedMessage,
        })

        console.log("Email sent successfully")
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        // Continue execution even if email fails
      }
    } else {
      console.log("Email credentials not configured. Skipping email sending.")
    }

    // Return success response
    return NextResponse.json({ success: true, message: "Contact form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}

