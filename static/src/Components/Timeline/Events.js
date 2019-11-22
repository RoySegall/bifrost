import React from 'react';

export default class Events extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: props['events'],
            activeEvent: null
        };
    }

    setEventView(id) {
        this.setState({activeEvent: id})
    }

    hideExtra() {
        this.setState({activeEvent: null})
    }

    List(events) {
        const onClick = (event, key) => {
            event.preventDefault();
            this.setEventView(key);
        };

        return events.map((item, key) => {
            return <div key={key}>
                <a href='#'
                   onClick={(event) => onClick(event, key)}>{item['title']}</a>
            </div>
        })
    }

    EventView() {
        if (this.state.activeEvent === null) {
            return <></>;
        }

        const onClick = (event) => {
            event.preventDefault();
            this.hideExtra();
        };

        return <div className="col-4">
            <a href="#" onClick={(event) => onClick(event)}>Close</a><br/>
            {this.state.events[this.state.activeEvent]['title']}
        </div>
    }

    render() {

        return <div className="row events">
            <div className="col-8">
                <div className="list">
                    {this.List(this.state.events)}
                </div>
            </div>

            {this.EventView()}

        </div>
    }
}
