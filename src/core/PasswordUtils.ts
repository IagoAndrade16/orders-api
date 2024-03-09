export class PasswordUtils {
	static strHasAtLeastOneNumber(str: string): boolean {
		return /\d/.test(str);
	}

	static strHasAtLeastOneLetter(str: string): boolean {
		return /[a-zA-Z]/.test(str);
	}

	static strHasAtLeastOneSpecialChar(str: string): boolean {
		return /[^a-zA-Z\d]/.test(str);
	}

	static strHasAtLeastOneUpperCaseLetter(str: string): boolean {
		return /[A-Z]/.test(str);
	}

	static strHasAtLeastOneLowerCaseLetter(str: string): boolean {
		return /[a-z]/.test(str);
	}
}
