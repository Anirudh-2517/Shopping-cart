import axios from 'axios'
import React, { useRef } from 'react'

function Sendemail() {
  const to=useRef("")
  const subject=useRef("")
  const message=useRef("")

  const sendmail=()=>{
    let to1=to.current.value
    let subject1=subject.current.value
    let message1=message.current.value

    const payload={
      to:to1,
      subject:subject1,
      message:message1
    }
    axios.post("http://localhost:9015/api/Email/sendemail",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
  }
  return (
    <div>
        <h1>Send mail</h1>
          <input type='text' className='form-control w-25 m-3' ref={to} placeholder='Send this mail to'></input>
          <input type='text' className='form-control w-25 m-3' ref={subject} placeholder='Enter your subject'></input>
          <input type='text' className='form-control w-25 m-3' ref={message} placeholder='Enter your message'></input>
          <button className='btn btn-primary m-3' onClick={sendmail}>Send Email</button>
    </div>
  )
}

export default Sendemail