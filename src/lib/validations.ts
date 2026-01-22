import * as v from 'valibot';

export const registerSchema = v.object({
	name: v.pipe(v.string(), v.nonEmpty('Please enter your name.')),
	email: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your email.'),
		v.email('The email address is badly formatted.')
	),
	password: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your password.'),
		v.minLength(8, 'Your password must have 8 characters or more.')
	)
});

export const loginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your email.'),
		v.email('The email address is badly formatted.')
	),
	password: v.pipe(v.string(), v.nonEmpty('Please enter your password.'))
});

export type RegisterData = v.InferOutput<typeof registerSchema>;
export type LoginData = v.InferOutput<typeof loginSchema>;
