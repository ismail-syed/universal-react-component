import * as React from 'react';
import {Page, Button} from '@shopify/polaris';
import universal from 'react-universal-component';
import './index.css';

const UniversalTab: any = universal(({tab}: any) =>
  import(`./components/${tab}/${tab}`),
);

export default class App extends React.Component {
  state = {selected: 'Home'};

  render() {
    return (
      <Page title="Sewing Kit/ Polaris app">
        <div>
          <UniversalTab tab={this.state.selected} />

          <Button onClick={() => this.setState({selected: 'Home'})}>
            Home
          </Button>
          <div onMouseEnter={() => UniversalTab.preload({tab: 'Foo'})}>
            <Button onClick={() => this.setState({selected: 'Foo'})}>
              Foo
            </Button>
          </div>
          <div onMouseEnter={() => UniversalTab.preload({tab: 'Bar'})}>
            <Button onClick={() => this.setState({selected: 'Bar'})}>
              Bar
            </Button>
          </div>
        </div>
      </Page>
    );
  }
}
