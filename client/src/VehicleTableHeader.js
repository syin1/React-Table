import { Table } from 'semantic-ui-react/dist/commonjs';
// import React from '../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import React from 'react';

export function VehicleTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'id' ? props.direction : null}
          onClick={() => props.handleSort('id')}
        >
          #
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'make' ? props.direction : null}
          onClick={() => props.handleSort('make')}
        >
          NAME
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'model' ? props.direction : null}
          onClick={() => props.handleSort('model')}
        >
          PRICE
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'year' ? props.direction : null}
          onClick={() => props.handleSort('year')}
        >
          CHANGE
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'package' ? props.direction : null}
          onClick={() => props.handleSort('package')}
        >
          MARKET CAP
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'fuelType' ? props.direction : null}
          onClick={() => props.handleSort('fuelType')}
        >
          VOLUME
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'trasmission' ? props.direction : null}
          onClick={() => props.handleSort('transmission')}
        >
          CHART
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'favorite' ? props.direction : null}
          onClick={() => props.handleSort('favorite')}
        >
          WATCHLIST
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
