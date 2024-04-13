import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'

import { FETCH_PROTOCOL, FETCH_ADMIN_DETAILS } from '../gqloperations/queries'

// homepage lists the patients on the left similarly, the following will list all the 
// protocols of a document
// code similar to hoempage 
const Listdocuments = ({ document }) => {
//   const { user, selectedChat } = ChatState()
  
  const [protocols, setprotocols] = useState([])
  const { loading, data, refetch } = useQuery(FETCH_PROTOCOL, {
    variables: { docId: user }, // Fetch all protocols of the docter
  })

  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.fetchprotocolByDocumentId
      console.log(resp)
      if (resp && resp.length > 0) {
        setprotocols(resp)
      }
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetch().then((response) => {
          const resp = response?.data?.fetchprotocolByDocumentId
          console.log(resp)
          if (resp && resp.length > 0) {
            setprotocols(resp)
          }
        })
      },
      protocols ? 10000 : 0
    )

    return () => clearInterval(interval)
  }, [refetch])

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [dropdown2Visible, setDropdown2Visible] = useState(true) // State for Dropdown2 visibility

  const handleToggle = () => {
    setDropdownVisible(!dropdownVisible)
    setDropdown2Visible(!dropdown2Visible) // Toggle Dropdown2 visibility
  }

  return (
    <div
      className="flex-container wrapper"
      style={{ background: 'white', padding: '10px' }}
    >
      <div
        className={`column ${dropdownVisible ? 'hidden' : 'visible'}`}
        style={{
          width: 'full',
          overflow: 'hidden',
          background: '#F4F4FF',
          borderRadius: '10px',
        }}
     
      >
        <div
        >
          {patients.map((item) => (
            <Dropdown key={item.id} data={item} />
          ))}
        </div>
      </div>

    </div>
  )

}

export default Dropdown
