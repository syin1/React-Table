// import React from '../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { Button, Table } from 'semantic-ui-react/dist/commonjs';
// import PropTypes from '../../../Library/Caches/typescript/2.9/node_modules/@types/prop-types';
import React from 'react';
import PropTypes from 'prop-types';

export function VehicleRow(props) {
  return (
    <Table.Row>
      <Table.Cell>{props.vehicle.id}</Table.Cell>
      <Table.Cell>{props.vehicle.make}</Table.Cell>
      <Table.Cell>{props.vehicle.model}</Table.Cell>
      <Table.Cell>{props.vehicle.year}</Table.Cell>
      <Table.Cell>{props.vehicle.package}</Table.Cell>
      <Table.Cell>{props.vehicle.fuelType}</Table.Cell>
      <Table.Cell>{props.vehicle.transmission}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          onClick={() => props.addFavorite(props.vehicle)}
          color={props.vehicle.favorite ? 'google plus' : 'twitter'}
          icon={props.vehicle.favorite ? 'heart' : 'heart outline'}
        />
      </Table.Cell>
    </Table.Row>
  );
}

VehicleRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired
};
