import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface NotesAppResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
}

export const NotesAppResetPasswordEmail = (
    {
        userFirstname,
        resetPasswordLink = 'https://sawikr.github.io/radoslaw-sawicki-frontend-react-notesapp/#/notes/auth/register',
    }: NotesAppResetPasswordEmailProps) => {

    return (
        <Html>
            <Head />
            <Preview>NotesApp reset your password</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/*<Img src="/static/launcherWebTwo.png" alt="NotesApp logo" height="40" width="40" />*/}
                    <Section>
                        <Text style={text}>Hi {userFirstname},</Text>
                        <Text style={text}>
                            Someone recently requested a password change for your NotesApp
                            account. If this was you, you can set a new password here:
                        </Text>
                        <Button
                            style={button}
                            href={resetPasswordLink}
                        >
                            Reset password
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to change your password or didn&apos;t
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>
                            To keep your account secure, please don&apos;t forward this email
                            to anyone.
                        </Text>
                        <Text style={text}>
                            For more information about NotesApp, visit the{' '}
                            <Link style={anchor} href="https://github.com/Sawikr/radoslaw-sawicki-frontend-react-notesapp">
                                NotesApp repository.
                            </Link>
                        </Text>
                        <Text style={text}>NotesApp Team!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default NotesAppResetPasswordEmail;

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
};

const text = {
    fontSize: '16px',
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
};

const button = {
    background: '#79589f',
    borderRadius: '5px',
    border: '0 solid #79589f',
    color: 'white',
    padding: '10px 10px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    width: '100%',
};

const anchor = {
    textDecoration: 'underline',
};