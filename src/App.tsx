import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/home/Home";
import LogInForm from "./containers/login/Login";
import SignInForm from "./containers/sign-in/SignIn";
import AddEventForm from "./containers/event/AddEvent";
import ListEvents from "./containers/event/ListEvents";
import { connect } from "react-redux";
import { logOut } from "./actions/user/UserActions";
import M from "materialize-css";
import { Navbar, Icon, NavItem } from "react-materialize";

/**
 * Mapps dispatch actions to properties of the component
 * @param {Function} dispatch The function that will pass
 * the action to the store
 * @return {any} a map object to the new properties
 */
function mapDispatchToProps(dispatch: Function) {
    return {
        logOut: () => dispatch(logOut()),
    };
}

/**
 * The entry point to the app
 */
class AppComponent extends Component {
    props: Readonly<any>;
    /**
     * Initializes the component
     * @param {any} props properties passed from the parent
     */
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    /**
     * Called after the component mounts and initializes
     * materialize
     */
    componentDidMount() {
        // eslint-disable-next-line new-cap
        M.AutoInit();
    }

    /**
     * Renders the component
     * @return {JSX} the html like element that will be rendered
     */
    render() {
        return (
            <div>
                <header>
                    <Navbar
                        alignLinks='right'
                        brand={
                            <a className='brand-logo' href='/'>
                                Logo
                            </a>
                        }
                        id='mobile-nav'
                        menuIcon={<Icon>menu</Icon>}
                        options={{
                            draggable: true,
                            edge: "left",
                            inDuration: 250,
                            outDuration: 200,
                            preventScrolling: true,
                        }}
                    >
                        <NavItem href='/'>Home</NavItem>
                        {this.props.isUserLogged && (
                            <NavItem href='/list-events'>List Events</NavItem>
                        )}
                        {this.props.isUserLogged && (
                            <NavItem href='/add-event'>Add Event</NavItem>
                        )}
                        {!this.props.isUserLogged && (
                            <NavItem href='/login'>Login</NavItem>
                        )}
                        {!this.props.isUserLogged && (
                            <NavItem href='/sign-in'>Sign In</NavItem>
                        )}
                        {this.props.isUserLogged && (
                            <NavItem href='/logout'>Logout</NavItem>
                        )}
                    </Navbar>
                    <hr />
                </header>
                <main className='container'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login'>
                            <LogInForm />
                        </Route>
                        <Route exact path='/sign-in'>
                            <SignInForm />
                        </Route>
                        <Route exact path='/add-event'>
                            <AddEventForm />
                        </Route>
                        <Route exact path='/list-events'>
                            <ListEvents />
                        </Route>
                        <Route
                            path='/logout'
                            render={() => {
                                this.props.logOut();
                                return <Redirect to='/' />;
                            }}
                        />
                    </Switch>
                </main>
                <footer></footer>
            </div>
        );
    }
}

/**
 * Maps state variables to properties of the component
 * @param {any} state the current state in the store
 * @return {any} object that describes the new properties passed
 * to the component.
 */
function mapStateToProps({ userState }: any) {
    return { isUserLogged: userState.isUserLogged };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
