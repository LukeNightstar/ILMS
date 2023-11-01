"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {Draggable, DropArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import {useEffect, useState} from 'react'
import {EventSourceInput} from '@fullcalendar/core/index.js'
import {AddEventDialog} from "@/app/(dashboard)/(routes)/calendar/_components/add-event";
import DeleteEventDialog from "@/app/(dashboard)/(routes)/calendar/_components/del-event";

interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function CalendarTestPage() {
    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0
    })

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    return {title, id, start}
                }
            })
        }
    }, [])

    function handleDateClick(arg: {
        date: Date,
        allDay: boolean
    }) {
        setNewEvent({...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime()})
        setShowModal(true)
    }

    function addEvent(data: DropArg) {
        const event = {...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime()}
        setAllEvents([...allEvents, event])
    }

    function handleDeleteModal(data: {
        event: {
            id: string
        }
    }) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))
    }

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
    }

    return (
        <>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'today dayGridMonth,timeGridWeek'
                }}
                locale={"ko"}
                events={allEvents as EventSourceInput}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick={handleDateClick}
                drop={(data) => addEvent(data)}
                eventClick={(data) => handleDeleteModal(data)}
            />

            <DeleteEventDialog
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDelete={handleDelete}
                handleCloseModal={handleCloseModal}
            />

            <AddEventDialog
                showModal={showModal}
                setShowModal={setShowModal}
                handleSubmit={handleSubmit}
                newEvent={newEvent}
                handleChange={handleChange}
                handleCloseModal={handleCloseModal}
            />
        </>
    )
}