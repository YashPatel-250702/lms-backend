export function RegistrationSuccessEmail(name: string): string {
    return `
  <div style="max-width: 600px; margin: auto; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 12px rgba(0,0,0,0.1);">
  <div style="text-align: center;">
  <img src="https://bitlabs.com/logo.png" alt="bitLabs LMS Logo" style="height: 60px; margin-bottom: 16px;" />
  <h1 style="color: #4CAF50;">Welcome to bitLabs LMS 🎓</h1>
  </div>
   
      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
  <p style="font-size: 15px;">
        We're thrilled to have you on board! Your registration is now complete, and you're all set to begin your learning journey.
  </p>
   
      <div style="background-color: #e8f5e9; padding: 16px; border-radius: 8px; margin: 20px 0;">
  <p style="margin: 0 0 10px 0;"><strong>Here’s what you can do next:</strong></p>
  <ul style="padding-left: 20px; margin: 0;">
  <li>📚 Browse and enroll in available courses</li>
  <li>📈 Track your progress and achievements</li>
  <li>📝 Participate in quizzes and assessments</li>
  <li>💬 Engage in discussions and get support</li>
  </ul>
  </div>
   
      <div style="text-align: center; margin: 30px 0;">
  <a href="https://v0-lms-website-development.vercel.app/" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Login to Your Account</a>
  </div>
   
      <p style="font-size: 14px; line-height: 1.6;">
        If you have any questions or need help getting started, feel free to reach out to our support team at 
  <a href="mailto:support@bitlabslms.com" style="color: #1e88e5;">support@bitlabslms.com</a>.
  </p>
   
      <p style="font-size: 14px;">Happy learning! 🚀</p>
   
      <p style="font-size: 14px;"><strong>The bitLabs Team</strong></p>
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
  <p style="font-size: 12px; color: #888; text-align: center;">
        © ${new Date().getFullYear()} bitLabs LMS. All rights reserved.
  </p>
  </div>
    `;
  }