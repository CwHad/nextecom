

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/user'
import bcrypt from 'bcrypt'
import dbConnect from '@/utils/dbConnect'

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            async authorize(credentials, req) {
                dbConnect();

                const { email, password } = credentials;
                const user = await User.findOne({ email });

                if(!user) {
                    throw new Error("Invalid email or password");
                }
                
                const isPasswordMatched = await bcrypt.compare(password, user.password);
                if(!isPasswordMatched) {
                    throw new Error("Invalid email or password")
                }

                return user;

            }
        })
    ],
    callbacks: {
        async signIn({user}) {
            const { email, name, image } = user;
            dbConnect();

            console.log("NEXTAUTH_URL ========>:", process.env.NEXTAUTH_URL); 

            let dbUser = await User.findOne({email})
            if(!dbUser) {
                await User.create({
                    email, 
                    name,
                    image,
                })
            }
            return true;
        },
        jwt: async ({ token, user }) => {
            const userByEmail = await User.findOne({email: token.email});
            userByEmail.password = undefined;
            userByEmail.resetCode = undefined;
            token.user = userByEmail;
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}



