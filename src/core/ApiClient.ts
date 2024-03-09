import axios from 'axios';

export type IHttpResponse = {
	statusCode: number;
	data: any;
}

export class ApiClient {
	private static axiosConfig = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/json',
		},
	};

	public static async get(url: string) {
		return axios.get(url, ApiClient.axiosConfig);
	}

	public static async post(url: string, params: object): Promise<IHttpResponse> {
		const axiosRes = await axios.post(url, params, ApiClient.axiosConfig)
			.catch((err) => err.response);

		return {
			statusCode: axiosRes.status,
			data: axiosRes.data,
		};
	}
}
