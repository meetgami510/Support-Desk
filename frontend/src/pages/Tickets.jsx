import React from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getTickets,reset } from '../features/tickets/ticketSlice'
import Spinner from '../componets/Spinner'
import BackButton from '../componets/BackButton'
import TicketItem from '../componets/TicketItem'

function Tickets() {
    const {tickets} = useSelector((state) => state.tickets)

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(getTickets());
    // },[dispatch])
    useEffect(()=> {
        dispatch(getTickets())
    },[dispatch])

    if(!tickets) {
        return <Spinner/>
    }
  return (
    <>
    <BackButton/>
     <h1>Tickets</h1>
     <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map((ticket) => {
            console.log(ticket);
            <TicketItem key={ticket._id} ticket={ticket}/>
        })}
     </div>
    </>
  )
}

export default Tickets
