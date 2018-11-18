// import React from '../../../Library/Caches/typescript/2.9/node_modules/@types/react';
// import PropTypes from '../../../Library/Caches/typescript/2.9/node_modules/@types/prop-types';
import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Table } from 'semantic-ui-react/dist/commonjs';

import VehicleDropdownOptions from './VehicleDropdownOptions';
import VehicleTablePagination from './VehicleTablePagination';
import { VehicleRow } from './VehicleRow';
import { VehicleTableHeader } from './VehicleTableHeader';

export default function VehicleTable(props) {
  if (props.coins === undefined) {
    return <div />;
  }
  const vehicleRows = props.coins.map((coin, index) => (
    <VehicleRow key={index} coin={coin} addFavorite={props.addFavorite} />
  ));
  return (
    <div>
      Records per page:{' '}
      <Dropdown
        inline
        options={VehicleDropdownOptions.limitOptions}
        defaultValue={props.limit}
        onChange={props.onChangeLimit}
      />
      Total count: {props.totalCount}.
      <Table celled selectable sortable>
        <VehicleTableHeader
          column={props.column}
          direction={props.direction}
          handleSort={props.handleSort}
        />

        <Table.Body>{vehicleRows}</Table.Body>

        <Table.Footer>
          <VehicleTablePagination
            totalPages={props.totalPages}
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
        </Table.Footer>
      </Table>
    </div>
  );
}

VehicleTable.propTypes = {
  coins: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired
};
