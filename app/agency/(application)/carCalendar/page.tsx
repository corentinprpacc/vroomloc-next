"use client"

import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
export default function carCalendar() {
  function showFunction(e: any) {
    console.log("click on date: ", e.date)
  }
  return (
    <div className="w-[50vw]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2024-01-27" },
          { title: "event 2", date: "2024-01-20" },
        ]}
        dateClick={(e) => showFunction(e)}
      />
    </div>
  )
}
