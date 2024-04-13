import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import protocol from './document'
import { FETCH_DOCUMENTS, FETCH_ADMIN_DETAILS } from '../gqloperations/queries'

// homepage lists the patients on the left similarly, the following will list all the 
// protocols **of a document
// code similar to homepage 

const Listdocuments = ({ document }) => {
//   const { user, selectedChat } = ChatState()
  
  const [protocols, setprotocols] = useState([])
  const { loading, data, refetch } = useQuery(FETCH_DOCUMENTS, {
    variables: { document_no: user }, // Fetch all protocols of the document
  })

  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.fetchdocumentsByDocumentnumber
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
          const resp = response?.data?.fetchdocumentsByDocumentnumber
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

  return (
    <div
      className="flex-container wrapper"
      style={{ background: 'white', padding: '10px' }}
    >
          {protocols.map((item) => (
            <Protocol key={item.id} data={item} />
          ))}
    </div>
  )

}

export default Listdocuments
