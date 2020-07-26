import React, { FormEvent, Component, ChangeEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { addGameEvent } from '../../actions/GameEventActions'
import { connect } from "react-redux";
import { GameEvent } from '../../types/GameEvent'

function mapDispatchToProps(dispatch: any) {
    return {
        addGameEvent: (event: GameEvent) => dispatch(addGameEvent(event))
    };
}

class AddEvent extends Component {
    state: Readonly<GameEvent>;
    props: Readonly<any>;
    constructor(props: any) {
        super(props);
        this.props = props;
        this.state = new GameEvent();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    validateForm() {
        return this.state.name.length > 0 && this.state.game.length > 0 
        && this.state.city.length > 0 && this.state.address.length > 0
        && this.state.slots > 0 && this.state.freeSlots > 0;
    }

    handleSubmit(event: FormEvent) {
        event.preventDefault();
        this.props.addGameEvent(this.state);
        this.setState(new GameEvent());
    }

    handleChange(event: ChangeEvent<any>) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        if (!this.props.isUserLogged) {
            return (<div>Please log in!</div>);
        }
        return (
            <div className="AddEvent">
                <h1>Add Event</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name">
                        <FormLabel>Event Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="game">
                        <FormLabel>Game Name</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.game}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="city">
                        <FormLabel>City</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="address">
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            value={this.state.address}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="slots">
                        <FormLabel>Slots</FormLabel>
                        <FormControl
                            value={this.state.slots}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup controlId="freeSlots">
                        <FormLabel>Free Slots</FormLabel>
                        <FormControl
                            value={this.state.freeSlots}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </FormGroup>
                    <Button block disabled={!this.validateForm()} type="submit">
                        Create event
                    </Button>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return { isUserLogged: state.setupUser.isUserLogged
    }
}
const AddEventForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEvent);
  
export default AddEventForm;