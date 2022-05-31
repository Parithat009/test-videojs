import React from 'react'
import dynamic from 'next/dynamic'
// const ScannerComp = dynamic(() => import('../route/Scanner'))
import ScannerComp from '../route/Scanner'

const Scanner = () => {
  return (
    <div>
      <ScannerComp />
      {/* <QrReader
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        style={{
          height: 240,
          width: 320,
        }}
      /> */}


    </div>
  )
}

export default Scanner