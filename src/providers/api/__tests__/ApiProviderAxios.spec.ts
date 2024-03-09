import axios from 'axios';

import { ApiProviderAxios } from '../implementations/ApiProviderAxios';

const apiProviderAxios = new ApiProviderAxios();

describe('get', () => {
	it('should call axios.get with correct data', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'get').mockResolvedValue({ status: 204, data });

		const res = await apiProviderAxios.get(url, headers);

		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith(url, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 204, data });
	});

	it('should return error if axios.get throws', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 400, data } });

		const res = await apiProviderAxios.get(url, headers);

		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith(url, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 400, data });
	});
});

describe('post', () => {
	it('should call axios.post with correct data', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const params = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'post').mockResolvedValue({ status: 204, data });

		const res = await apiProviderAxios.post(url, params, headers);

		expect(axios.post).toHaveBeenCalledTimes(1);
		expect(axios.post).toHaveBeenCalledWith(url, params, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 204, data });
	});

	it('should return error if axios.post throws', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const params = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'post').mockRejectedValue({ response: { status: 400, data } });

		const res = await apiProviderAxios.post(url, params, headers);

		expect(axios.post).toHaveBeenCalledTimes(1);
		expect(axios.post).toHaveBeenCalledWith(url, params, {
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 400, data });
	});
});

describe('delete', () => {
	it('should call axios.delete with correct data', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'delete').mockResolvedValue({ status: 204, data });

		const res = await apiProviderAxios.delete(url, data, headers);

		expect(axios.delete).toHaveBeenCalledTimes(1);
		expect(axios.delete).toHaveBeenCalledWith(url, {
			data,
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 204, data });
	});

	it('should return error if axios.delete throws', async () => {
		const url = 'http://test.com';
		const data = { test: 'test' };
		const headers = {
			test: 'test',
		};

		jest.spyOn(axios, 'delete').mockRejectedValue({ response: { status: 400, data } });

		const res = await apiProviderAxios.delete(url, data, headers);

		expect(axios.delete).toHaveBeenCalledTimes(1);
		expect(axios.delete).toHaveBeenCalledWith(url, {
			data,
			headers: {
				...ApiProviderAxios.defaultHeaders,
				...headers,
			},
		});

		expect(res).toEqual({ statusCode: 400, data });
	});
});
