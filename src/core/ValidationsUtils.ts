import { ValidationError } from 'yup';

export class ValidationsUtils {
	static formatYupErrors(err: ValidationError): object {
		return err.inner.reduce((acc, err) => ({ ...acc, [err.path as string]: err.message }), {});
	}

	static isImeiValid(imei: string): boolean {
		const etal = /^[0-9]{15}$/;
		if (!etal.test(imei)) return false;
		let sum = 0;
		let mul = 2;
		const l = 14;
		for (let i = 0; i < l; i++) {
			const digit = imei.substring(l - i - 1, l - i);
			const tp = parseInt(digit, 10) * mul;
			if (tp >= 10) sum += (tp % 10) + 1;
			else sum += tp;
			if (mul === 1) mul++;
			else mul--;
		}
		const chk = (10 - (sum % 10)) % 10;
		if (chk !== parseInt(imei.substring(14, 15), 10)) return false;
		return true;
	}

	static isSerialValid(serial: string): boolean {
		return serial.length === 11;
	}

	static isOnlyDigitsOrNull(value: string): boolean {
		return !value || ValidationsUtils.isOnlyDigits(value);
	}

	static isOnlyDigits(value: string): boolean {
		return /^\d+$/.test(value);
	}

	static isArrayUnique(array: any[]) {
		if (!array) return false;
		return array.length === new Set(array).size;
	}

	static isValidDateFormat(dateString?: string): boolean {
		if (!dateString) {
			return false;
		}

		const regex = /^\d{4}-\d{2}-\d{2}$/;
		return regex.test(dateString);
	}

	public static isValidInsuranceNumber(insuranceNumber: string): boolean {
		if (!(insuranceNumber.substring(0, 3) === 'BRA')) {
			return false;
		}

		if (insuranceNumber.substring(3, 5) > '31' || insuranceNumber.substring(3, 5) < '01') {
			return false;
		}

		const validLettersToInsuranceNumber = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
		if (!validLettersToInsuranceNumber.includes(insuranceNumber.substring(5, 6).toLocaleLowerCase())) {
			return false;
		}

		return true;
	}

	static isValidDeviceUid(deviceUid: string): boolean {
		return ValidationsUtils.isImeiValid(deviceUid) || ValidationsUtils.isSerialValid(deviceUid);
	}

	static isValidDiscountPercentageToCupom(v: number): boolean {
		return v > 0 && v <= 100;
	}
}
