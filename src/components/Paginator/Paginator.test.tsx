import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Paginator, { PaginatorProps } from './Paginator';

const onChangePage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

const defaultProps: PaginatorProps = {
  count: 250,
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

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders buttons', () => {
    const buttons = wrapper.find("[test-id^='page-button-']")
    expect(buttons).toHaveLength(5);
  })

  it('should fire change page', () => {
    onChangePage.mockReset();
    const buttons = wrapper.find("[test-id='page-button-0']")
    buttons.simulate('press')
    expect(onChangePage).toHaveBeenCalledTimes(1);
  })

  it('should disable last button', () => {
    wrapper = setup({
      loading: true,
    });
    const lastButton = wrapper.find("[test-id='last']")
    expect(lastButton.prop('disabled')).toBeTruthy();
  })

  it('should fire first changePage', () => {
    onChangePage.mockReset();
    const prevButton = wrapper.find("[test-id='first']")
    prevButton.simulate('press')
    expect(onChangePage).toHaveBeenCalledTimes(1);
  })

  it('should fire next changePage', () => {
    onChangePage.mockReset();
    const lastButton = wrapper.find("[test-id='last']")
    lastButton.simulate('press')
    expect(onChangePage).toHaveBeenCalledTimes(1);
  })

});