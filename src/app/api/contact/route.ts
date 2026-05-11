import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, website } = body

    if (website) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const serviceLabel = service ? `<p><strong>Service:</strong> ${service}</p>` : ''
    const phoneLabel = phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''

    if (resend) {
      await resend.emails.send({
        from: 'noreply@csmisr.com',
        to: 'info@csmisr.com',
        replyTo: email,
        subject: `New inquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
            <h2 style="color:#1a1a1a;margin-bottom:16px;">New contact form submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phoneLabel}
            ${serviceLabel}
            <hr style="margin:16px 0;border:none;border-top:1px solid #ddd;" />
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;background:#fff;padding:12px;border-radius:4px;border:1px solid #e0e0e0;">${message}</p>
            <hr style="margin:16px 0;border:none;border-top:1px solid #ddd;" />
            <p style="font-size:12px;color:#888;">Submitted at ${new Date().toISOString()} via csmisr.com</p>
          </div>
        `,
      })
    } else {
      console.log('[contact] RESEND_API_KEY not set — logging submission:', {
        name, email, phone, service,
        message: message.slice(0, 500),
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
