// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import Home from "./containers/home/Home";
import LogInForm from "./containers/login/Login";
import SignInForm from "./containers/sign-in/SignIn";
import AddEventForm from "./containers/event/AddEvent";
import ListEvents from "./containers/event/ListEvents";
import { connect } from "react-redux";
import { Navbar, Icon } from "react-materialize";
import MyEvents from "./containers/event/MyEvents";
import { clearUser } from "./services/users.service";
import Calendar from "./containers/calendar/Calendar";

/**
 * Mapps dispatch actions to properties of the component
 * @param {Dispatch<S>} dispatch The function that will pass
 * the action to the store
 * @return {any} a map object to the new properties
 */
function mapDispatchToProps(dispatch: any) {
    return {
        logOut: () => dispatch(clearUser()),
    };
}

const AppComponent = ({ isUserLogged, logOut }: any) => {
    const PrivateRoute = ({ children, isAuthenticated, ...rest }: any) => {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isAuthenticated ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    };

    const NotLoggedInRoute = ({ children, isAuthenticated, ...rest }: any) => {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    !isAuthenticated ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    };

    /**
     * Renders the component
     * @return {JSX} the html like element that will be rendered
     */

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
                    <NavLink exact activeClassName='active' to='/'>
                        Home
                    </NavLink>
                    {isUserLogged && (
                        <NavLink
                            exact
                            activeClassName='active'
                            to='/list-events'
                        >
                            List Events
                        </NavLink>
                    )}
                    {isUserLogged && (
                        <NavLink exact activeClassName='active' to='/my-events'>
                            My Events
                        </NavLink>
                    )}
                    {isUserLogged && (
                        <NavLink exact activeClassName='active' to='/add-event'>
                            Add Event
                        </NavLink>
                    )}
                    {isUserLogged && (
                        <NavLink exact activeClassName='active' to='/calendar'>
                            Calendar
                        </NavLink>
                    )}
                    {!isUserLogged && (
                        <NavLink exact activeClassName='active' to='/login'>
                            Login
                        </NavLink>
                    )}
                    {!isUserLogged && (
                        <NavLink exact activeClassName='active' to='/sign-in'>
                            Sign In
                        </NavLink>
                    )}
                    {isUserLogged && (
                        <NavLink exact activeClassName='active' to='/logout'>
                            Logout
                        </NavLink>
                    )}
                </Navbar>
                <hr />
            </header>
            <main className='container'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <NotLoggedInRoute
                        exact
                        path='/login'
                        isAuthenticated={isUserLogged}
                    >
                        <LogInForm />
                    </NotLoggedInRoute>
                    <NotLoggedInRoute
                        exact
                        path='/sign-in'
                        isAuthenticated={isUserLogged}
                    >
                        <SignInForm />
                    </NotLoggedInRoute>
                    <PrivateRoute
                        exact
                        path='/my-events'
                        isAuthenticated={isUserLogged}
                    >
                        <MyEvents />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path='/list-events'
                        isAuthenticated={isUserLogged}
                    >
                        <ListEvents />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path='/add-event'
                        isAuthenticated={isUserLogged}
                    >
                        <AddEventForm />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path='/calendar'
                        isAuthenticated={isUserLogged}
                    >
                        <Calendar />
                    </PrivateRoute>
                    <Route
                        path='/logout'
                        render={() => {
                            logOut();
                            return <Redirect to='/' />;
                        }}
                    />
                </Switch>
            </main>
            <footer></footer>
        </div>
    );
};

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
