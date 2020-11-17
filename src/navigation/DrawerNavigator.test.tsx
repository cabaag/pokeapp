import { shallow, ShallowWrapper,  } from 'enzyme';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';

describe('<DrawerNavigator />' , () => {
  const wrapper: ShallowWrapper = shallow(<DrawerNavigator />);

  it ('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})