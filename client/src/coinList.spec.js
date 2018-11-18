import React from 'react';
import { shallow } from 'enzyme';
import VehicleList from './coinList';
import 'isomorphic-fetch';

describe('VehicleList', () => {
  it('should render correctly', () => {
    shallow(<VehicleList />);
  });
});
