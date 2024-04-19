import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import Documentcomp from '../components/document'
import { FETCH_DOCUMENTS } from '../gqloperations/queries'

const Protocol_sheet = () => {
  // below is the code for fetching all the documents

  const { loading, data, refetch } = useQuery(FETCH_DOCUMENTS, {
    variables: { doc_no: '1' },
  })
  const [docs, setdocs] = useState([])

  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.fetchdocumentbydocumentid
      console.log(resp)
      if (resp && resp.length > 0) {
        setdocs(resp)
      }
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetch().then((response) => {
          const resp = response?.data?.fetchdocumentbydocumentid
          console.log(resp)
          if (resp && resp.length > 0) {
            setdocs(resp)
          }
        })
      },
      docs ? 10000 : 0
    )
    return () => clearInterval(interval)
  }, [refetch])

  return (
    // <div>
    //   {docs.map((item) => (
    //     <Documentcomp key={item.id} data={item} />
    //   ))}
    // </div>
    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
      {docs.map((item) => (
        <Documentcomp key={item.id} data={item} />
      ))}
    </div>
  )
}

export default Protocol_sheet
