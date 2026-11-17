import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `New portfolio contact from ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Message</title>

        <style>
        body{
            margin:0;
            padding:0;
            background:#f4f7fb;
            font-family:Arial,Helvetica,sans-serif;
        }

        .wrapper{
            width:100%;
            padding:40px 20px;
        }

        .container{
            max-width:650px;
            margin:auto;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 15px 40px rgba(0,0,0,.08);
        }

        .header{
            background:linear-gradient(135deg,#4f46e5,#7c3aed);
            color:white;
            text-align:center;
            padding:40px 30px;
        }

        .header h1{
            margin:0;
            font-size:30px;
        }

        .header p{
            margin-top:10px;
            opacity:.9;
            font-size:15px;
        }

        .content{
            padding:35px;
        }

        .card{
            background:#f8fafc;
            border-left:5px solid #4f46e5;
            border-radius:12px;
            padding:18px 22px;
            margin-bottom:18px;
        }

        .label{
            color:#6b7280;
            font-size:13px;
            text-transform:uppercase;
            letter-spacing:1px;
            margin-bottom:5px;
        }

        .value{
            color:#111827;
            font-size:16px;
            font-weight:600;
        }

        .message{
            background:white;
            border:1px solid #e5e7eb;
            border-radius:12px;
            padding:20px;
            line-height:1.8;
            color:#374151;
            font-size:15px;
        }

        .footer{
            text-align:center;
            padding:25px;
            background:#f9fafb;
            color:#9ca3af;
            font-size:13px;
        }

        .badge{
            display:inline-block;
            background:#eef2ff;
            color:#4f46e5;
            padding:8px 18px;
            border-radius:50px;
            font-weight:bold;
            margin-top:15px;
        }
        </style>

        </head>

        <body>

        <div class="wrapper">

        <div class="container">

        <div class="header">
        <h1>📨 New Contact Message</h1>
        <p>A visitor submitted a new inquiry from your website.</p>

        <div class="badge">
        New Notification
        </div>
        </div>

        <div class="content">

        <div class="card">
        <div class="label">👤 Full Name</div>
        <div class="value">${name}</div>
        </div>

        <div class="card">
        <div class="label">📧 Email Address</div>
        <div class="value">
        <a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">
        ${email}
        </a>
        </div>
        </div>

        <div class="card">
        <div class="label">💬 Message</div>

        <div class="message">
        ${message.replace(/\n/g, "<br>")}
        </div>

        </div>

        </div>

        <div class="footer">

        <p>
        This email was automatically generated from your website contact form.
        </p>

        <p>
        © ${new Date().getFullYear()} • Your Company
        </p>

        </div>

        </div>

        </div>

        </body>
        </html>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
