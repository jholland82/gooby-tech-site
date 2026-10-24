/**
 * DigitalOcean Serverless Function: contact inquiry handler via Resend
 */

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function main(args = {}) {
  // 1. CORS Preflight
  const method = (args.__ow_method || args.http?.method || 'post').toLowerCase();
  if (method === 'options') {
    return {
      statusCode: 204,
      headers: corsHeaders()
    };
  }

  // 2. Enforce POST
  if (method !== 'post') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: { error: 'Method not allowed. Use POST.' }
    };
  }

  // 3. Extract payload across OpenWhisk / DigitalOcean argument conventions
  let data = { ...args };
  if (typeof args.__ow_body === 'string') {
    try {
      const decoded = Buffer.from(args.__ow_body, args.__ow_isBase64 ? 'base64' : 'utf8').toString('utf8');
      data = { ...data, ...JSON.parse(decoded) };
    } catch (_) {}
  } else if (typeof args.body === 'string') {
    try {
      data = { ...data, ...JSON.parse(args.body) };
    } catch (_) {}
  } else if (typeof args.body === 'object' && args.body !== null) {
    data = { ...data, ...args.body };
  }

  // 4. Honeypot check for bots
  if (data._gotcha || data.website || data.honeypot) {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: { success: true, message: 'Inquiry received.' }
    };
  }

  // 5. Input validation
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const company = (data.company || '').trim();
  const service = (data.service || 'General Engineering Inquiry').trim();
  const budget = (data.budget || 'Not specified').trim();
  const details = (data.details || '').trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !details) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: { error: 'Name, email, and project details are required.' }
    };
  }

  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: { error: 'Please provide a valid email address.' }
    };
  }

  // 6. Environment configuration
  const apiKey = process.env.RESEND_API_KEY || data.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY environment variable');
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: { error: 'Server configuration error: email service key is not configured.' }
    };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || data.CONTACT_TO_EMAIL || 'hello@goobytech.com';
  // Use verified domain email if provided; fallback to Resend testing sender onboarding@resend.dev
  const fromEmail = process.env.CONTACT_FROM_EMAIL || data.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  const subject = `[Project Inquiry] ${service} - ${name}`;

  const textContent = `
New Project Inquiry Received

Name: ${name}
Email: ${email}
Company: ${company || 'Not specified'}
Primary Area of Need: ${service}
Budget Range: ${budget}

Project Details:
----------------------------------------
${details}
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #38bdf8;">Gooby Technologies</h2>
      <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8;">New Project Inquiry Submission</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Client Name</td>
          <td style="padding: 8px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">Client Email</td>
          <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">Company</td>
          <td style="padding: 8px 0; font-size: 15px; color: #334155;">${escapeHtml(company || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">Area of Need</td>
          <td style="padding: 8px 0; font-size: 15px; color: #334155;">${escapeHtml(service)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">Budget Range</td>
          <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(budget)}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
        <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Project Details & Technical Requirements</h3>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 14px; color: #334155; white-space: pre-wrap; font-family: inherit;">${escapeHtml(details)}</div>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px;">Reply to ${escapeHtml(name)}</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  // 7. Send via Resend API
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: subject,
        text: textContent,
        html: htmlContent
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Resend delivery error:', response.status, result);
      return {
        statusCode: response.status,
        headers: corsHeaders(),
        body: {
          error: result.message || 'Email delivery service rejected the request.'
        }
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: {
        success: true,
        id: result.id,
        message: 'Thank you! Your project inquiry has been sent. We will reply within 24 hours.'
      }
    };
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: {
        error: 'An unexpected error occurred while processing your inquiry.'
      }
    };
  }
}

module.exports.main = main;
