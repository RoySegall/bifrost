import React from 'react';
import {OrderTimeline} from '../../Components/Timeline/Timeline';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Testing OrderTimeline', () => {
    const input = {
        "flights": [
            {
                "id": "38",
                "title": "Flight to Frankfurt",
                "origin": "Tel aviv",
                "destination": "Frakfurt",
                "startingDate": "2020-03-11T07:00:00",
                "endingDate": "2020-03-11T11:00:00",
                "location": {
                    "id": "255",
                    "title": "Ben Gurion Airport",
                    "address": "Ben Gurion Airport, Terminal 3"
                },
                "connectionFlight": null
            },
            {
                "id": "39",
                "title": "Flight to USA",
                "origin": "Frnkfurt",
                "destination": "New York",
                "startingDate": "2020-03-11T14:00:00",
                "endingDate": "2020-03-11T09:00:00",
                "location": {
                    "id": "256",
                    "title": "Frankfurt Airport",
                    "address": "60547 Frankfurt, Germany"
                },
                "connectionFlight": {
                    "id": "38"
                }
            }
        ],
        "pickingCars": [
            {
                "title": "Picking car",
                "id": "23",
                "startingDate": "2020-03-12T10:00:00",
                "endingDate": "2020-03-15T09:00:00",
                "location": {
                    "id": "258",
                    "title": "Avis Car Rental",
                    "address": "John F. Kennedy International Airport, 305 Federal Cir building 305, Jamaica, NY 11430, United States"
                }
            }
        ],
        "accommodations": null,
        "meetingConjunctions": null,
        "lunches": [
            {
                "id": "8",
                "title": "Luch at \"The Grange\"",
                "startingDate": "2020-03-13T12:00:00",
                "endingDate": "2020-03-13T19:24:18.755169",
                "location": {
                    "id": "261",
                    "title": "The Grange",
                    "address": "1635 Amsterdam Ave, New York, NY 10031, United States"
                }
            },
            {
                "id": "9",
                "title": "Goodbye Breakfast at \"Taqueria San Pedro\"",
                "startingDate": "2020-03-14T08:00:00",
                "endingDate": "2020-03-14T12:00:00",
                "location": {
                    "id": "262",
                    "title": "Taqueria San Pedro",
                    "address": "3662 Broadway, New York, NY 10031, United States"
                }
            }
        ],
        "meetings": [
            {
                "id": "4",
                "title": "Luch at \"The Grange\"",
                "startingDate": "2020-03-13T19:24:19.782675",
                "endingDate": "2020-03-13T19:24:19.784639",
                "location": {
                    "id": "260",
                    "title": "Naomi Berrie Diabetes Center",
                    "address": "1150 Saint Nicholas Avenue Columbia University Medical Center Russ Berrie Medical Science Pavilion, New York, NY 10032, United States"
                }
            }
        ],
        "generalEvents": [
            {
                "id": "6",
                "title": "Goodbye Breakfast at \"Taqueria San Pedro\"",
                "startingDate": "2020-03-14T13:30:00",
                "endingDate": "2020-03-14T18:00:00",
                "location": {
                    "id": "268",
                    "title": "Museum of the City of New York",
                    "address": "1220 5th Ave, New York, NY 10029, United States"
                }
            },
            {
                "id": "7",
                "title": "Funtime at \"The Shops at Columbus Circle\"",
                "startingDate": "2020-03-14T18:30:00",
                "endingDate": "2020-03-14T21:00:00",
                "location": {
                    "id": "269",
                    "title": "The Shops at Columbus Circle",
                    "address": "10 Columbus Cir, New York, NY 10019, United States"
                }
            }
        ],
        "timeline": {
            "id": "46",
            "title": "Roy's amazing trip",
            "startingDate": "2020-03-11T07:00:00",
            "endingDate": "2020-03-15T02:00:00"
        }
    };

    const orderedTimeline = OrderTimeline(input);

    expect(orderedTimeline['title']).toBe("Roy's amazing trip");
    expect(orderedTimeline['startingDate']).toBe("2020-03-11T07:00:00");
    expect(Object.keys(orderedTimeline['events'])).toStrictEqual(['11-3-2020', '12-3-2020', '13-3-2020', '14-3-2020']);

    const firstDay = orderedTimeline['events']['11-3-2020'];
    expect(firstDay['timestamp']).toBe(1583884800);
    expect(firstDay['label']).toBe('11-3-2020, Wednesday');
    expect(firstDay['events'][0]).toStrictEqual({
        "id": "38",
        "title": "Flight to Frankfurt",
        "origin": "Tel aviv",
        "destination": "Frakfurt",
        "startingDate": 1583910000,
        "endingDate": 1583924400,
        "location": {
            "id": "255",
            "title": "Ben Gurion Airport",
            "address": "Ben Gurion Airport, Terminal 3"
        },
        "connectionFlight": null,
        "type": "flights"
    });
    expect(firstDay['events'][1]).toStrictEqual({
        "id": "39",
        "title": "Flight to USA",
        "origin": "Frnkfurt",
        "destination": "New York",
        "startingDate": 1583935200,
        "endingDate": 1583917200,
        "location": {
            "id": "256",
            "title": "Frankfurt Airport",
            "address": "60547 Frankfurt, Germany"
        },
        "connectionFlight": {
            "id": "38"
        },
        "type": "flights"
    });

});
