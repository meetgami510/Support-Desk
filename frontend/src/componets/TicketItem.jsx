import React from 'react'
import { Link } from 'react-router-dom'

function TicketItem( {ticket} ) {
  return (
    <div>
      <div className='ticket'>
        <h1>this is my book</h1>
        <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
        <div>{ticket.product}</div>
        console.log(ticket.status);
        <div className={`status status-${ticket.status}`}>
            {ticket.status}
        </div>
        <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View
        </Link>
      </div>
      
    </div>
  )
}

export default TicketItem
