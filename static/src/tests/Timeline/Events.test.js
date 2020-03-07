import React from 'react';
import renderer from 'react-test-renderer';
import Events from '../../Components/Timeline/Events';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const dummyEvents = JSON.parse('{"17-11-2019":{"timestamp":1573941600,"events":[{"id":"1","title":"Flight to london","origin":"Tel aviv","destination":"London","startingDate":1573970400,"endingDate":1573984800,"location":{"id":"1","title":"jfk airplain","address":"ff"},"connectionFlight":null,"type":"flightSet"},{"id":"1","title":"Hotel Gibson","location":{"id":"2","title":"Gibson hotel","address":"Gibson hotel, Ireland"},"startingDate":1574006400,"endingDate":1574330400,"hotelName":"Gisbon","room":"312","type":"accommodationSet"}],"label":"17-11-2019, Sunday"},"18-11-2019":{"timestamp":1574028000,"events":[{"id":"2","title":"Demo at clinic in London","location":{"id":"1","title":"jfk airplain","address":"ff"},"startingDate":1574064000,"endingDate":1574067600,"hotelName":"foo","room":"123","type":"accommodationSet"},{"id":"3","title":"Lunch with John","location":{"id":"2","title":"Gibson hotel","address":"Gibson hotel, Ireland"},"startingDate":1574071200,"endingDate":1574076600,"hotelName":"asdasd","room":"221","type":"accommodationSet"},{"title":"Picking car","id":"1","startingDate":1574078400,"endingDate":1574078400,"location":{"id":"2","title":"Gibson hotel","address":"Gibson hotel, Ireland"},"type":"pickingcarSet"},{"id":"2","title":"Picking employees","startingDate":1574096400,"endingDate":1574096400,"members":[{"id":"1"},{"id":"2"}],"location":{"id":"1","title":"jfk airplain","address":"ff"},"type":"meetingconjunctionSet"}],"label":"18-11-2019, Monday"},"19-11-2019":{"timestamp":1574114400,"events":[{"id":"4","title":"Demo at a clinic","location":{"id":"1","title":"jfk airplain","address":"ff"},"startingDate":1574143200,"endingDate":1574148600,"hotelName":"asdas","room":"213","type":"accommodationSet"},{"id":"5","title":"Driving to stonehenge","location":{"id":"1","title":"jfk airplain","address":"ff"},"startingDate":1574150400,"endingDate":1574150400,"hotelName":"33","room":"asdd","type":"accommodationSet"},{"id":"6","title":"Luch","location":{"id":"1","title":"jfk airplain","address":"ff"},"startingDate":1574164800,"endingDate":1574170200,"hotelName":"saasd","room":"asdasd","type":"accommodationSet"},{"id":"7","title":"Driving to manchenter","location":{"id":"2","title":"Gibson hotel","address":"Gibson hotel, Ireland"},"startingDate":1574172000,"endingDate":1574193600,"hotelName":"23213","room":"123123","type":"accommodationSet"}],"label":"19-11-2019, Tuesday"},"20-11-2019":{"timestamp":1574200800,"events":[{"id":"8","title":"demo at a clinic","location":{"id":"1","title":"jfk airplain","address":"ff"},"startingDate":1574236800,"endingDate":1574251200,"hotelName":"21321","room":"213213","type":"accommodationSet"},{"id":"9","title":"Back to the hotel","location":{"id":"2","title":"Gibson hotel","address":"Gibson hotel, Ireland"},"startingDate":1574254800,"endingDate":1574254800,"hotelName":"foo","room":"foo","type":"accommodationSet"}],"label":"20-11-2019, Wednesday"}}');
const filterCallbackMock = jest.fn();

test("Testing the setEventView function", () => {
    const component = mount(<Events events={dummyEvents} selectedEventType={'all'}/>);
    const spy = jest.spyOn(component.instance(), 'setEventView');

    expect(component.state('activeEvent')).toBe(null);
    expect(component.exists('.event-view')).toBe(false);

    // Click on the first event and make sure the state has changed.
    component.find('.title.event-flightSet-id-1').simulate('click');
    expect(component.state('activeEvent')).toStrictEqual({
        "day": "17-11-2019",
        "key": 0
    });

    // Making sure the event has been triggered.
    expect(spy).toHaveBeenCalled();
    expect(component.exists('.event-view')).toBe(true);

    // Click on the second event and make sure the state has changed to that event.
    component.find('.title.event-accommodationSet-id-1').simulate('click');
    expect(component.state('activeEvent')).toStrictEqual({
        "day": "17-11-2019",
        "key": 1
    });

    // Click on event which is already selected and make sure the state changed.
    component.find('.title.event-accommodationSet-id-1').simulate('click');
    expect(component.state('activeEvent')).toBe(null);
    expect(component.exists('.event-view')).toBe(false);
});

test("Testing the removeEventView event", () => {
    const component = mount(<Events events={dummyEvents} selectedEventType={'all'}/>);
    const spy = jest.spyOn(component.instance(), 'removeEventView');

    // Set an event to be viewed.
    component.find('.title.event-accommodationSet-id-1').simulate('click');

    // Making sure the event view exists.
    expect(component.exists('.event-view')).toBe(true);

    // Simulating the event close and making sure the event was triggered.
    component.find('.close-event').simulate('click');
    expect(spy).toHaveBeenCalled();

    // Making sure the event view does not exists.
    expect(component.exists('.event-view')).toBe(false);
});

test("Testing the refactorEndDate method", () => {
    const component = mount(<Events events={dummyEvents} selectedEventType={'all'}/>);
    const instance = component.instance();

    // Making sure that if the event is in the same day we won't display the
    // full date.
    expect(instance.refactorEndDate(1573970400, 1573970400 + 3600)).toBe("07:00");

    // Making sure that when the event is another day we will display the full
    // day.
    expect(instance.refactorEndDate(1573970400, 1573970400 + (84600 * 2))).toBe("19-11-2019 05:00");
});

test('Testing the filter by event type', () => {
    // Testing all the events exists.
    let component = mount(<Events events={dummyEvents} selectedEventType={'all'}/>);

    // Set an event to be viewed.
    expect(component.exists('.title.event-flightSet-id-1')).toBe(true);
    expect(component.exists('.title.event-accommodationSet-id-1')).toBe(true);

    // Testing only flight type exists.
    component = mount(<Events events={dummyEvents} selectedEventType={'flightSet'}/>);
    expect(component.exists('.title.event-flightSet-id-1')).toBe(true);
    expect(component.exists('.title.event-accommodationSet-id-1')).toBe(false);

    // Testing only the accommodation events will be displayed.
    component = mount(<Events events={dummyEvents} selectedEventType={'accommodationSet'}/>);
    expect(component.exists('.title.event-flightSet-id-1')).toBe(false);
    expect(component.exists('.title.event-accommodationSet-id-1')).toBe(true);
});

test("Testing the eventHead, eventBody, EventView function with snapshot", () => {
    const EventComponent = renderer.create(<Events events={dummyEvents} selectedEventType={'all'}/>);
    expect(EventComponent.toJSON()).toMatchSnapshot();
});
