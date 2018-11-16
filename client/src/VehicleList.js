// import React from '../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import React from 'react';
import { Divider, Segment } from 'semantic-ui-react/dist/commonjs';

import VehicleTable from './VehicleTable';
import VehicleFilter from './VehicleFilter';
// import vehicles from './vehicles.json';

const queryParams = ['_limit', '_order', '_sort', 'q', '_page'];

export default class VehicleList extends React.Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      _sort: 'id',
      _page: 1,
      _limit: 10,
      q: '',
      totalCount: 0,
      direction: null,
      loading: false
    };
    this.loadData = this.loadData.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(clickedColumn) {
    const { _sort, direction } = this.state;

    if (_sort !== clickedColumn) {
      this.setState({
        _sort: clickedColumn,
        direction: 'ascending'
      });

      this.loadData({
        _sort: clickedColumn,
        _page: 1,
        _order: 'asc'
      });

      return;
    }

    this.setState({
      _sort: clickedColumn,
      _page: 1,
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });

    this.loadData({
      _sort: clickedColumn,
      _page: 1,
      _order: direction === 'ascending' ? 'desc' : 'asc'
    });
  }

  componentDidMount() {
    this.loadData({});
  }

  onChangeLimit(event, data) {
    if (data.value !== this.state._limit) {
      this.setState({ _limit: data.value, _page: 1 });
      this.loadData({ _limit: data.value, _page: 1 });
    }
  }

  onSubmitFilter(filter) {
    if (filter !== this.state.q) {
      this.setState({ q: filter, _page: 1, loading: true });
      this.loadData({ q: filter, _page: 1 });
    }
  }

  onChangePage(page) {
    if (page !== this.state._page) {
      this.setState({ _page: page });
      this.loadData({ _page: page });
    }
  }

  addFavorite(vehicle) {
    vehicle.favorite = !vehicle.favorite;
    fetch(`/api/v1/vehicles/${vehicle.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicle)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          var vehicles = this.state.vehicles.slice();
          for (var i = 0; i < vehicles.length; ++i) {
            if (vehicles[i].id === data.id) {
              vehicles[i] = data;
              break;
            }
          }

          this.setState({ vehicles: vehicles });
        });
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
  }

  loadData(params) {
    const current = this.state;
    queryParams.forEach(function(element) {
      if (!(element in params)) {
        params[element] = current[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

    // Make a request without limit first to get the total number of data.
    let totalCountQuery;
    if (params.q !== '') {
      totalCountQuery = `q=${params.q}`;
    }

    fetch('/api/v1/vehicles?' + totalCountQuery).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ totalCount: data.length });
        });
      } else {
        // response.json().then(error => {
        console.log('Failed to load data!');
        // });
      }
      this.setState({ loading: false });
    });

    fetch('/api/v1/vehicles?' + query).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ vehicles: data });
        });
      } else {
        // response.json().then(error => {
        console.log('Failed to load data!');
        // });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
        <Segment>
          <VehicleFilter
            filter={this.state.q}
            totalCount={this.state.totalCount}
            onSubmitFilter={this.onSubmitFilter}
            loading={this.state.loading}
          />
          <Divider />
          <VehicleTable
            vehicles={this.state.vehicles}
            totalCount={this.state.totalCount}
            totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
            currentPage={this.state._page}
            onChangePage={this.onChangePage}
            addFavorite={this.addFavorite}
            column={this.state._sort}
            direction={this.state.direction}
            handleSort={this.handleSort}
            onChangeLimit={this.onChangeLimit}
            limit={this.state._limit.toString()}
          />
        </Segment>
      </div>
    );
  }
}
