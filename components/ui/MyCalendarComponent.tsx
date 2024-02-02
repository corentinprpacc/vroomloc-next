"use client"

import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
type MyCalendarComponentProps = {
  listOrders: object[]
}

function MyCalendarComponent({ listOrders }: MyCalendarComponentProps) {
  function showFunction(e: any) {
    alert("you clicked on a date ! ")
  }

  return (
    <div className="pl-2 pr-2">
      <FullCalendar
        eventBackgroundColor="purple"
        headerToolbar={{
          left: "",
          center: "title",
        }}
        locale="fr"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={listOrders}
        dateClick={(e) => showFunction(e)}
      />
    </div>
  )
}

export default MyCalendarComponent
