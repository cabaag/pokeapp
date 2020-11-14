import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Paginator, { PaginatorProps } from './Paginator';

const onChangePage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

const defaultProps: PaginatorProps = {
  count: 100,
  loading: false,
  onChangePage
}

function setup(customProps?: Partial<PaginatorProps>): ShallowWrapper {
  return shallow(
    <Paginator {...defaultProps} {...customProps} />
  )
}

describe('<Paginator />', () => {
  let wrapper: ShallowWrapper;


  beforeEach(() => {
    wrapper = setup();
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders buttons', () => {
    const buttons = wrapper.find("[test-id='page-button']")
    expect(buttons).toHaveLength(5);
  })

  it('disable buttons', () => {
    onChangePage.mockReset();
    wrapper = setup({
      loading: true,
    });
    const nextButton = wrapper.find("[test-id='next']")
    nextButton.simulate('click')
    expect(onChangePage).toHaveBeenCalledTimes(0);
  })

});