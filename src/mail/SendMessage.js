import {Resend} from "resend";
import NotesAppResetPasswordEmail from "../emails/NotesAppResetPasswordEmail";

// export function send() {
//     const resend = new Resend('re_XRwcXCYS_8hJ8WVmwSd9HvgdTZiDZt1xj');
//     const {data, error} = resend.emails.send({
//         from: 'contact@notesapp.pl',
//         to: 'sawikr10@gmail.com',
//         subject: 'Reset password in NotesApp',
//         //react: NotesAppResetPasswordEmail({userFirstname})
//         text: "It's working!"
//     });
//
//     if (error) {
//         return console.error({error});
//     }
//     console.log({data});
// }