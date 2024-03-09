namespace Express {
	export type Request = {
		user?: {
			id: number;
		};

		owner?: {
			id: number;
			channel: string;
		}

		subUser?: {
			id: number;
			channel: string;
			adminId: number;
		}
	}
}
