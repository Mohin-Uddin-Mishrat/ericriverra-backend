type TMailContent = {
    to: string;
    subject: string;
    textBody: string;
    htmlBody: string;
    name?: string;
};
declare const sendMail: (payload: TMailContent) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default sendMail;
//# sourceMappingURL=mail_sender.d.ts.map