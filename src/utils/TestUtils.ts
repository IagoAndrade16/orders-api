import { find } from '../core/DependencyInjection';
import { JwtProvider, jwtProviderAlias } from '../providers/jwt/JwtProvider';

export class TestUtils {
	static async generateAuthToken(userId?: string, isAdmin?: boolean, isEditor?: boolean): Promise<string> {
		const jwtProvider = find<JwtProvider>(jwtProviderAlias);

		const data = {};
		if (isAdmin) {
			Object.assign(data, { isAdmin });
		}

		if (isEditor) {
			Object.assign(data, { role: 'editor' });
		}

		const res = await jwtProvider.generate({ subject: userId?.toString() ?? '-1', data });
		return `Bearer ${res.token}`;
	}

	static expectDatesToBeClose(date1: Date | undefined, date2: Date | undefined, ms?: number): void {
		expect(date1).not.toBeNull();
		expect(date2).not.toBeNull();

		const diff = Math.abs(date1!.getTime() - date2!.getTime());
		expect(diff).toBeLessThanOrEqual(ms ?? 1000);
	}

	static getRandomValidImei(): string {
		return '354476112827609';
	}

	static get validCpf(): string {
		return '80245718389';
	}

	static get validCnpj(): string {
		return '76388465000123';
	}

	static get validPhoneNumber(): string {
		return '5511998746754';
	}

	static get securePassword(): string {
		return '435809';
	}

	static wait(ms: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
}
