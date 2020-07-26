import React, { Component } from "react";
import { connect } from "react-redux";
import { GameEvent } from '../../types/GameEvent'


class ListEvenetsComponent extends Component {
    state: {events: GameEvent[]} = {events: []};
    props: Readonly<any>;
    constructor(props: any) {
        super(props);
        this.props = props;
        this.state.events = this.props.events.filter((event: GameEvent) => {
            return event.freeSlots > 0;
        })
      }

    render() {
        if (this.state.events.length === 0) {
            return (<div>There are no events available</div>);
        }
        const tableRows = this.state.events.map((event: GameEvent) =>
            <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.game}</td>
                <td>{event.city}</td>
                <td>{event.address}</td>
                <td>{event.slots}</td>
                <td>{event.freeSlots}</td>
            </tr>
        );
        return (
            <div>
                <h1>Available events</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Game Name</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Slots</th>
                            <th>Free slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return { events: state.gameEvents.events
    }
}
const ListEvenets = connect(
    mapStateToProps,
    null
  )(ListEvenetsComponent);
  
export default ListEvenets;