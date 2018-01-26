import * as React from 'react';
import {Page, Button} from '@shopify/polaris';
// import universal from 'react-universal-component';
import './index.css';

const HomeTab = () => <div className="Home">Home is Loaded</div>;
const FooTab = () => <div className="Foo">Foo is Loaded</div>;
const BarTab = () => <div className="Bar">Bar is Loaded</div>;

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
