import volumeReducer from '../../reducers/volumeReducer';
import { VOLUME } from '../../constant';

describe('volunme reducer', () => {
  it('should return the initial state', () => {
    expect(volumeReducer(undefined, {})).toEqual({ inspected: {}, list: [] });
  });

  // it('should handle ABC', () => {
  //   expect(
  //     volumeReducer([], {
  //       type: ABC,
  //       payload: '123'
  //     })
  //   ).toEqual(['123']);
  // });
});
