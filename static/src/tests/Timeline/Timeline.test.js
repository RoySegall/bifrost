import React from 'react';
import {OrderTimeline} from '../../Components/Timeline/Timeline';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Testing OrderTimeline', () => {
    const input = {
        "id": "1",
        "title": "Roy's amazing trip",
        "startingDate": "2019-11-17T06:00:00",
        "endingDate": "2019-11-22T18:00:00",
        "flightSet": [{
            "id": "1",
            "title": "Flight to london",
            "origin": "Tel aviv",
            "destination": "London",
            "startingDate": "2019-11-17T08:00:00",
            "endingDate": "2019-11-17T12:00:00",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "connectionFlight": null
        }],
        "pickingcarSet": [{
            "title": "Picking car",
            "id": "1",
            "startingDate": "2019-11-18T14:00:00",
            "endingDate": "2019-11-18T14:00:00",
            "location": {
                "id": "2",
                "title": "Gibson hotel",
                "address": "Gibson hotel, Ireland"
            }
        }],
        "accommodationSet": [{
            "id": "1",
            "title": "Hotel Gibson",
            "location": {
                "id": "2",
                "title": "Gibson hotel",
                "address": "Gibson hotel, Ireland"
            },
            "startingDate": "2019-11-17T18:00:00",
            "endingDate": "2019-11-21T12:00:00",
            "hotelName": "Gisbon",
            "room": "312"
        }, {
            "id": "2",
            "title": "Demo at clinic in London",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "startingDate": "2019-11-18T10:00:00",
            "endingDate": "2019-11-18T11:00:00",
            "hotelName": "foo",
            "room": "123"
        }, {
            "id": "3",
            "title": "Lunch with John",
            "location": {
                "id": "2",
                "title": "Gibson hotel",
                "address": "Gibson hotel, Ireland"
            },
            "startingDate": "2019-11-18T12:00:00",
            "endingDate": "2019-11-18T13:30:00",
            "hotelName": "asdasd",
            "room": "221"
        }, {
            "id": "4",
            "title": "Demo at a clinic",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "startingDate": "2019-11-19T08:00:00",
            "endingDate": "2019-11-19T09:30:00",
            "hotelName": "asdas",
            "room": "213"
        }, {
            "id": "5",
            "title": "Driving to stonehenge",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "startingDate": "2019-11-19T10:00:00",
            "endingDate": "2019-11-19T10:00:00",
            "hotelName": "33",
            "room": "asdd"
        }, {
            "id": "6",
            "title": "Luch",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "startingDate": "2019-11-19T14:00:00",
            "endingDate": "2019-11-19T15:30:00",
            "hotelName": "saasd",
            "room": "asdasd"
        }, {
            "id": "7",
            "title": "Driving to manchenter",
            "location": {
                "id": "2",
                "title": "Gibson hotel",
                "address": "Gibson hotel, Ireland"
            },
            "startingDate": "2019-11-19T16:00:00",
            "endingDate": "2019-11-19T22:00:00",
            "hotelName": "23213",
            "room": "123123"
        }, {
            "id": "8",
            "title": "demo at a clinic",
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            },
            "startingDate": "2019-11-20T10:00:00",
            "endingDate": "2019-11-20T14:00:00",
            "hotelName": "21321",
            "room": "213213"
        }, {
            "id": "9",
            "title": "Back to the hotel",
            "location": {
                "id": "2",
                "title": "Gibson hotel",
                "address": "Gibson hotel, Ireland"
            },
            "startingDate": "2019-11-20T15:00:00",
            "endingDate": "2019-11-20T15:00:00",
            "hotelName": "foo",
            "room": "foo"
        }],
        "meetingconjunctionSet": [{
            "id": "2",
            "title": "Picking employees",
            "startingDate": "2019-11-18T19:00:00",
            "endingDate": "2019-11-18T19:00:00",
            "members": [{"id": "1"}, {"id": "2"}],
            "location": {
                "id": "1",
                "title": "jfk airplain",
                "address": "ff"
            }
        }]
    };

    const orderedTimeline = OrderTimeline(input);

    expect(orderedTimeline['title']).toBe("Roy's amazing trip");
    expect(orderedTimeline['startingDate']).toBe("2019-11-17T06:00:00");
    expect(Object.keys(orderedTimeline['events'])).toStrictEqual(['17-11-2019', '18-11-2019', '19-11-2019', '20-11-2019']);

    const firstDay = orderedTimeline['events']['17-11-2019'];
    expect(firstDay['timestamp']).toBe(1573948800);
    expect(firstDay['label']).toBe('17-11-2019, Sunday');
    expect(firstDay['events'][0]).toStrictEqual({
        id: "1",
        title: "Flight to london",
        connectionFlight: null,
        destination: "London",
        endingDate: 1573992000,
        location: {"address": "ff", "id": "1", "title": "jfk airplain"},
        origin: "Tel aviv",
        startingDate: 1573977600,
        type: "flightSet"
    });
    expect(firstDay['events'][1]).toStrictEqual({
        id: '1',
        title: 'Hotel Gibson',
        location: {
            id: '2',
            title: 'Gibson hotel',
            address: 'Gibson hotel, Ireland'
        },
        startingDate: 1574013600,
        endingDate: 1574337600,
        hotelName: 'Gisbon',
        room: '312',
        type: 'accommodationSet'
    });

});
