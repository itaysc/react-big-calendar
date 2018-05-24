import React from 'react'
import events from '../testData/events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar)
const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]
class Dnd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: events,
        }

        this.moveEvent = this.moveEvent.bind(this)
    }

    moveEvent({ event, start, end }) {
        const { events } = this.state

        const idx = events.indexOf(event)
        const updatedEvent = {...event, start, end }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })

        alert(`${event.title} was dropped onto ${event.start}`)
    }

    resizeEvent = (resizeType, { event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id ? {...existingEvent, start, end } :
                existingEvent
        })

        this.setState({
            events: nextEvents,
        })

        alert(`${event.title} was resized to ${start}-${end}`)
    }

    render() {
        return ( <
            DragAndDropCalendar selectable events = { this.state.events }
            onEventDrop = { this.moveEvent }
            resizable onEventResize = { this.resizeEvent }
            defaultView = "day"
            views={['day', 'work_week']}
            defaultDate={new Date(2018, 0, 29)}
            resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            />
        )
    }
}

export default DragDropContext(HTML5Backend)(Dnd)