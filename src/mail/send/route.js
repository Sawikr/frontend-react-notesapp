import NotesAppResetPasswordEmailProps from '../send/emails/NotesAppResetPasswordEmail';
import { Resend } from "resend";
import * as z from "zod"

const sendRouteSchema = z.object({
    userFirstname: z.string().min(2),
});

export async function POST() {
    const {userFirstname} = sendRouteSchema;

    const resend = new Resend('re_SDh2ttmU_MKg1E3PXqdFxe3XrWqDrC4bH');
    //await resend.apiKeys.create({name: 'Production'});

    const {data, error} = await resend.emails.send({
        from: 'NotesApp <contact@notesapp.pl>',
        to: ['sawikr10@gmail.com'],
        subject: `${userFirstname} has a message!`,
        react: NotesAppResetPasswordEmailProps({userFirstname}),

        headers:
                {
                    'X-Entity-Ref-ID': 'SDh2ttmU_MKg1E3PXqdFxe3XrWqDrC4bH',
                    'Access-Control-Allow-Origin': '*'
                },
        mode: "no-cors"
    });

    if (data) {
        console.log('Send email: POST()!');
    }
    if (error) {
        console.log('Error!');
    }

}