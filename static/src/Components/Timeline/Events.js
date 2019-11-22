import React from 'react';

export default class Events extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: props['events'],
            activeEvent: 1
        };
    }

    setEventView(id) {
        if (this.state.activeEvent === id) {
            this.hideExtra();
            return;
        }

        this.setState({activeEvent: id})
    }

    hideExtra() {
        this.setState({activeEvent: null})
    }

    eventHead() {
        return <div className="col-12">
            <div className="row head">
                <div className="col-6"><i className="fal fa-hotel"></i></div>
                <div className="col-6 text-right">Today at
                    15:00
                </div>
                <hr/>
            </div>
        </div>
    }

    eventBody(item, key) {
        const onClick = (event, key) => {
            event.preventDefault();
            this.setEventView(key);
        };

        return <div className="col-12">
            <div className="row body">
                <div className="col-6">
                    <a href='#' className="title"
                       onClick={(event) => onClick(event, key)}>
                        {item['title']}
                    </a>
                </div>

                <div className="col-6 text-right">
                    Ends at: Today, 15:30
                </div>

                <div className="col-12">
                    <p>Lorem Ipsum is simply dummy text of
                        the
                        printing and typesetting industry.
                        Lorem
                        Ipsum has been the industry's
                        standard
                        dummy text ever since the 1500s,
                    </p>
                </div>
            </div>
        </div>
    }

    List(events) {
        const col = this.state.activeEvent === null ? 'col-12 full-event' : 'col-6';
        return <div className={"slow-transition " + col}>
            <div className="list">
                {
                    events.map((item, key) => {
                        return <div key={key} className={"row event " + item['type']}>
                            {this.eventHead()}
                            {this.eventBody(item, key)}
                        </div>
                    })
                }
            </div>
        </div>
    }

    EventView() {
        if (this.state.activeEvent === null) {
            return <></>;
        }

        const event = this.state.events[this.state.activeEvent];

        const onClick = (event) => {
            event.preventDefault();
            this.hideExtra();
        };

        return <div className="col-6">

            <div className={"event-view-wrapper " + event['type']}>
                <div className="actions">
                    <a href="#" onClick={(event) => onClick(event)}>
                        <i className="fal fa-times"></i>
                    </a><br/>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h3>{event['title']}</h3>
                    </div>

                    <div className="map">
                        <img className="img-fluid" src={process.env.PUBLIC_URL + '/mps.png'} />
                    </div>
                </div>

            </div>
        </div>
    }

    render() {

        return <div className="row events">
            <div className="col-12 event-separator">
                <hr/>
            </div>

            {this.List(this.state.events)}
            {this.EventView()}
        </div>
    }
}
