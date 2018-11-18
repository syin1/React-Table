import React from 'react';
import { shallow } from 'enzyme';
import VehicleTablePagination from './coinTablePagination';
import 'isomorphic-fetch';
import PropTypes from 'prop-types';

describe('VehicleTablePagination', () => {
  it('should render correctly', () => {
    shallow(
      <VehicleTablePagination
        onChangePage={() => {}}
        totalPages={100}
        currentPage={1}
        showPages={5}
      />
    );
  });
});
