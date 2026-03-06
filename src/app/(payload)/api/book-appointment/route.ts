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
<div style="font-family: Arial, Helvetica, sans-serif; background:#f6f7fb; padding:40px 20px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;padding:30px;border:1px solid #e5e7eb;">
    
    <h2 style="margin-top:0;color:primary;">
      Hello ${clientName},
    </h2>

    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Thank you for booking an appointment with <strong>The Dentist LTD</strong>.  
      We have successfully received your request and a member of our team will contact you shortly to confirm your appointment details.
    </p>

    <div style="margin:25px 0;padding:20px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
      <h3 style="margin-top:0;color:primary;font-size:16px;">
        Your Submitted Details
      </h3>

      ${htmlFields}
    </div>

    <p style="color:#374151;font-size:14px;line-height:1.6;">
      If you need to update or cancel your appointment, please contact us and we will gladly assist you.
    </p>

    <p style="margin-top:30px;color:#374151;font-size:14px;">
      Best regards,<br/>
      <strong>The Dentist LTD Team</strong><br/>
      Nakuru, Kenya
      <br/>
      Tel: 0734 003 111
      <br/>info@thedentistltd.co.ke

      
      <br/>
      <a href="https://www.thedentistltd.co.ke" style="color:#2563eb;text-decoration:none;">
        www.thedentistltd.co.ke
      </a>
      
    </p>

  </div>
</div>
`,
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
