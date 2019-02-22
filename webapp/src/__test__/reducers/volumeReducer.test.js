import volumeReducer from '../../reducers/volumeReducer';
import { ABC } from '../../constant';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(volumeReducer(undefined, {})).toEqual([]);
  });

  it('should handle ABC', () => {
    expect(
      volumeReducer([], {
        type: ABC,
        payload: '123'
      })
    ).toEqual(['123']);
  });
});
