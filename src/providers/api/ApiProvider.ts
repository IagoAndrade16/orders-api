export type ApiProvider = {
	get(url: string, headers?: ApiHeaders): Promise<ApiResponse>;
	post(url: string, params: object, headers?: ApiHeaders, bodyType?: ApiBodyType): Promise<ApiResponse>;
	delete(url: string, params: object, headers?: ApiHeaders): Promise<ApiResponse>;
	download(options: DownloadOptions): Promise<boolean>;
}

export type ApiResponse = {
	statusCode: number;
	data: any;
}

export type ApiHeaders = {
	[key: string]: string;
}

export type ApiBodyType = 'application/json' | 'multipart/form-data';

export type DownloadOptions = {
	url: string;
	outputPath: string;
	method: 'get' | 'post';
	params?: object;
}

export const apiProviderAlias = 'ApiProvider';
