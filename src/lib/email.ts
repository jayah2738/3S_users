import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendAnnouncementEmail({
  to,
  announcement,
}: {
  to: string;
  announcement: any;
}) {
  const html = `
    <h2>${announcement.title}</h2>
    <p>${announcement.content}</p>
    <p>Type: ${announcement.type}</p>
    <p>Posted on: ${new Date(announcement.createdAt).toLocaleDateString()}</p>
    <hr>
    <p>This is an automated message from your school portal. Please do not reply to this email.</p>
  `;

  await sendEmail({
    to,
    subject: `New Announcement: ${announcement.title}`,
    html,
  });
} 