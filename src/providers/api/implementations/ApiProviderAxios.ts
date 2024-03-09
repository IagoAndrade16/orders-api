import axios from 'axios';
import fs from 'fs';
import { request } from 'http';
import { promisify } from 'node:util';
import stream from 'stream';

import {
	ApiBodyType,
	ApiHeaders, ApiProvider, ApiResponse, DownloadOptions,
} from '../ApiProvider';

export class ApiProviderAxios implements ApiProvider {
	static readonly defaultHeaders = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	async get(url: string, headers?: ApiHeaders): Promise<ApiResponse> {
		const axiosRes = await axios.get(url, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		}).catch((err) => err.response);

		return {
			statusCode: axiosRes.status,
			data: axiosRes.data,
		};
	}

	public async post(url: string, params: object, headers?: ApiHeaders, bodyType?: ApiBodyType): Promise<ApiResponse> {
		const axiosRes = await axios.post(url, params, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
				'Content-Type': bodyType ?? 'application/json',
			},
		})
			.catch((err) => err.response);

		return {
			statusCode: axiosRes.status,
			data: axiosRes.data,
		};
	}

	async delete(url: string, params: object, headers?: ApiHeaders): Promise<ApiResponse> {
		console.log('delete params', params);

		const axiosRes = await axios.delete(url, {
			data: params,
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		}).catch((err) => err.response);

		console.log('delete axios res', axiosRes);

		return {
			statusCode: axiosRes.status,
			data: axiosRes.data,
		};
	}

	async download(options: DownloadOptions): Promise<boolean> {
		const writer = fs.createWriteStream(options.outputPath);
		const finished = promisify(stream.finished);

		return axios({
			method: options.method,
			url: options.url,
			data: options.params,
			responseType: 'stream',
		}).then(async (response) => {
			response.data.pipe(writer);
			await finished(writer);
			return true;
		}).catch((err) => {
			console.log(`Error downloading file: ${JSON.stringify(err)}`);
			return false;
		});
	}
}
