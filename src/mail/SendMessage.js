import {Resend} from "resend";
import NotesAppResetPasswordEmail from "../emails/NotesAppResetPasswordEmail";

export async function POST(request: Request) {
    const resend = new Resend('re_XRwcXCYS_8hJ8WVmwSd9HvgdTZiDZt1xj');

    const {userFirstname} = request.json();
    const {data, error} = await resend.emails.send({
        from: 'contact@notesapp.pl',
        to: 'sawikr10@gmail.com',
        subject: 'Reset password in NotesApp',
        react: NotesAppResetPasswordEmail({userFirstname})
    });

    if (error) {
        return console.error({error});
    }
    console.log({data});
}