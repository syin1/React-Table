// import React, {
//   Component
// } from '../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import React, { Component } from 'react';

// import ReactDOM from '../../../Library/Caches/typescript/2.9/node_modules/@types/react-dom';

import {
  Button,
  Container,
  Header,
  Icon,
  Menu
} from 'semantic-ui-react/dist/commonjs';

import CoinList from './coinList';

class App extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 0em' }}>
        <Menu borderless secondary>
          <Menu.Item>
            <Header>Cryptocurrency Prices</Header>
          </Menu.Item>
          <Menu.Item position="right">
            <Button
              color="facebook"
              as="a"
              href="https://github.com/syin1/React-Table"
            >
              <Icon name="github" />
              Project Source
            </Button>
          </Menu.Item>
        </Menu>

        <CoinList />
      </Container>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('contents'));
export default App;
