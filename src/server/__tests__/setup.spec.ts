import { PM2 } from '../../core/PM2';
import { onListening } from '../setup';

describe('onListening', () => {
	it('should call scheduleAll', () => {
		jest.spyOn(PM2, 'emitReady').mockReturnValue();

		onListening();

		expect(PM2.emitReady).toHaveBeenCalled();
	});
});
