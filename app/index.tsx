import * as React from 'react';
import {Page, Button} from '@shopify/polaris';
import Loadable from 'react-loadable';
import './index.scss';

const Loading = <div> Loading.. </div>;
const HomeTab: any = Loadable({
  loader: () => import('./components/Home/Home'),
  loading: Loading,
});

const FooTab = Loadable({
  loader: () => import('./components/Foo/Foo'),
  loading: Loading,
});

const BarTab = Loadable({
  loader: () => import('./components/Bar/Bar'),
  loading: Loading,
});

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
          <div onMouseEnter={() => FooTab.preload()}>
            <Button onClick={() => this.setState({selected: 'Foo'})}>
              Foo
            </Button>
          </div>
          <div onMouseEnter={() => BarTab.preload()}>
            <Button onClick={() => this.setState({selected: 'Bar'})}>
              Bar
            </Button>
          </div>
        </div>
      </Page>
    );
  }
}
