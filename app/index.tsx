import * as React from 'react';
import {Page, Button} from '@shopify/polaris';
import universal from 'react-universal-component';
import './index.css';

const HomeTab = universal(import('./components/Home/Home'));
const FooTab = universal(import('./components/Foo/Foo'));
const BarTab = universal(import('./components/Bar/Bar'));

export default class App extends React.Component {
  state = {selected: 'Home'};

  render() {
    return (
      <Page title="Sewing Kit/ Polaris app">
        <div>
          {this.state.selected === 'Home' && <HomeTab />}

          {this.state.selected === 'Foo' && <FooTab />}

          {this.state.selected === 'Bar' && <BarTab />}

          <Button onClick={() => this.setState({selected: 'Home'})}>
            Home
          </Button>
          <Button onClick={() => this.setState({selected: 'Foo'})}>Foo</Button>
          <Button onClick={() => this.setState({selected: 'Bar'})}>Bar</Button>
        </div>
      </Page>
    );
  }
}
