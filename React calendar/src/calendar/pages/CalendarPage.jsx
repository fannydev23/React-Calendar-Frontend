import { useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from '../'

import { Calendar } from 'react-big-calendar'
import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'week');

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
          backgroundColor: '#347CF7',
          borderRadius: '0px',
          opacity: 0.8,
          color: 'white'
        }
    
        return {
          style
        }
    }

    const onDoubleClick = ( event ) => {
      openDateModal();
    }
  
    const onSelect = ( event ) => {
      setActiveEvent( event );
    }
  
    const onViewChanged = ( event ) => {
      localStorage.setItem('lastView', event );
      setLastView( event )
    }


    return (
        <>
            <Navbar/>

            <div>
                <Calendar
                    culture='es'
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    messages={getMessagesES()}
                    style={{ height: 'calc( 100vh - 80px )' }}
                    eventPropGetter={eventStyleGetter}
                    components={{
                      event:CalendarEvent
                    }}
                    defaultView={lastView}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
                />
            </div>

            
            <CalendarModal/>
            <FabAddNew/>
            <FabDelete/>

        </>
    )
}
