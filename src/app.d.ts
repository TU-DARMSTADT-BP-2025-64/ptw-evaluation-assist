// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { JwtPayload } from 'jsonwebtoken';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: JwtPayload | null;
			isLoggedIn: boolean; // Login-Status hinzufügen
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
