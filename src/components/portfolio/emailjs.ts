// EmailJS configuration.
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (choose Gmail) -> copy the Service ID
// 3. Create an Email Template with the variables:
//    {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    and set "To Email" to your Gmail address -> copy the Template ID
// 4. Account -> General -> copy the Public Key
// Paste all three below. These are publishable values, safe in the code.

export const EMAILJS_SERVICE_ID = "";
export const EMAILJS_TEMPLATE_ID = "";
export const EMAILJS_PUBLIC_KEY = "";

export const emailjsConfigured =
  Boolean(EMAILJS_SERVICE_ID) && Boolean(EMAILJS_TEMPLATE_ID) && Boolean(EMAILJS_PUBLIC_KEY);
