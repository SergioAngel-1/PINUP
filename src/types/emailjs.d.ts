declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  interface SendFormOptions {
    serviceId: string;
    templateId: string;
    userId: string;
    templateParams?: Record<string, unknown>;
  }

  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, unknown>,
    publicKey: string
  ): Promise<EmailJSResponseStatus>;

  export function sendForm(
    serviceId: string,
    templateId: string,
    form: HTMLFormElement | string,
    publicKey: string
  ): Promise<EmailJSResponseStatus>;

  export function init(publicKey: string): void;
}