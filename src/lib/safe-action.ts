import { createSafeActionClient } from 'next-safe-action';

export const action = createSafeActionClient({
	handleServerError(e) {
		return e.message;
	},
});
