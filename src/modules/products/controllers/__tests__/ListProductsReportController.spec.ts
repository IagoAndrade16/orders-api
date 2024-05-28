import request from 'supertest';

import { find } from '../../../../core/DependencyInjection';
import { DateRange } from '../../../../objects/DateRange';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { ListProductsReportUseCase } from '../../usecases/ListProductsReportUseCase';

let authToken: string;
const userId = '-1';
const route = '/product/report';

const usecase = find(ListProductsReportUseCase);

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

it('should call usecase', async () => {
	jest.spyOn(usecase, 'execute').mockResolvedValue([]);

	const response = await request(app)
		.post(route)
		.send({
			from: '2022-01-01',
			to: '2022-12-31',
		})
		.set({
			Authorization: authToken,
		});

	expect(response.status).toBe(200);
	expect(response.body).toEqual([]);

	expect(usecase.execute).toBeCalledTimes(1);
	expect(usecase.execute).toBeCalledWith({ dateFilters: expect.any(DateRange) });
});
