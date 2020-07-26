import React, { Component } from 'react'
import {Route,
  Switch, Redirect} from 'react-router-dom'
import Home from './containers/home/Home'
import LogInForm from "./containers/login/Login";
import SignInForm from './containers/sign-in/SignIn'
import AddEventForm from './containers/event/AddEvent'
import ListEvents from './containers/event/ListEvents'
import { connect } from "react-redux";
import { logOut } from './actions/user/UserActions'
import M from 'materialize-css'
import { Navbar, Icon, NavItem } from 'react-materialize'

function mapDispatchToProps(dispatch: any) {
  return {
      logOut: () => dispatch(logOut())
  };
}

class AppComponent extends Component {
  props: Readonly<any>;
  constructor(props: any) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <Navbar
        alignLinks="right"
        brand={<a className="brand-logo" href="/">Logo</a>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          outDuration: 200,
          preventScrolling: true
        }}
      >
        <NavItem href="/">
          Home
        </NavItem>
        {this.props.isUserLogged &&
          <NavItem href="/list-events">
            List Events
          </NavItem>
        }
        {this.props.isUserLogged &&
          <NavItem href="/add-event">
            Add Event
          </NavItem>
        }
        {!this.props.isUserLogged &&
          <NavItem href="/login">
            Login
          </NavItem>
        }
        {!this.props.isUserLogged &&
          <NavItem href="/sign-in">
            Sign In
          </NavItem>
        }
        {this.props.isUserLogged &&
          <NavItem href="/logout">
            Logout
          </NavItem>
        }
        </Navbar>
        <hr />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login">
                <LogInForm />
            </Route>
            <Route exact path="/sign-in">
                <SignInForm />
            </Route>
            <Route exact path="/add-event">
                <AddEventForm />
            </Route>
            <Route exact path="/list-events">
                <ListEvents />
            </Route>
            <Route path='/logout' render={() => {
              this.props.logOut();
              return (
                <Redirect to="/"/>
              )
              } } />
          </Switch>
        </div>
        
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return { isUserLogged: state.setupUser.isUserLogged
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;