import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({});

export const { signIn, signOut, useSession } = authClient;

export const signInWithGithub = () =>
	signIn.social({ provider: 'github', callbackURL: '/dashboard' });
