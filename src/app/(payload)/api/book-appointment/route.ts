import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { submissionData } = body

    const emailField = submissionData.find((item: any) =>
      item.field.toLowerCase().includes('email'),
    )

    const nameField = submissionData.find((item: any) => item.field.toLowerCase().includes('name'))

    const clientEmail = emailField?.value
    const clientName = nameField?.value || 'Client'

    const htmlFields = submissionData
      .map((item: any) => `<p><strong>${item.field}:</strong> ${item.value}</p>`)
      .join('')

    /* EMAIL TO YOU */
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: 'New Appointment Booking From Website',
      html: `
        <h2>New Website Appointment Request</h2>
        ${htmlFields}
      `,
    })

    /* CONFIRMATION EMAIL TO CLIENT */
    if (clientEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: clientEmail,
        subject: 'Appointment Request Received',
        html: `
          <div style="font-family:Arial;padding:20px">
            <h2>Hello ${clientName},</h2>
            <p>
              Thank you for booking an appointment with us. 
              We have received your request and our team will contact you shortly to confirm your appointment.
            </p>

            <p><strong>Your submitted details:</strong></p>

            ${htmlFields}

            <br/>
            <p>Best regards,<br/>Team</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
