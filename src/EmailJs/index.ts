import emailjs from '@emailjs/browser';

export interface ContactMessagePayload {
  fullName: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (
  payload: ContactMessagePayload
): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing.');
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: payload.fullName,
        from_email: payload.email,
        message: payload.message,
      },
      publicKey
    );
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Failed to send message. Please try again later.');
  }
};
  