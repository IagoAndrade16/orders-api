export type JwtProvider = {
	generate(input: JwtInput): Promise<JwtResponse>;
	verify(token: string): Promise<object | null>;
}

export type JwtInput = {
	subject: string;
	data?: {[key:string]: any};
}

export type JwtResponse = {
	token: string;
	expInSecs: number;
}

export const jwtProviderAlias = 'JwtProvider';
