import * as actions from '../../actions/volumeActions';
import { ABC } from '../../constant';

describe('test volume actions', () => {
  it('should return abc', () => {
    const expectedAction = {
      type: ABC,
      payload: 'abc'
    };
    expect(actions.saveComment()).toEqual(expectedAction);
  });
});
