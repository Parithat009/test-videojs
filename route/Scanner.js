import React from 'react'
import {QrReader} from 'react-qr-reader'

const ScannerComp = () => {

  const handleScan = (data) => {
    console.log(data)
  }

  const handleError = (err) => {
    console.error(err)
  }

  return (
    <div>
      <button>open camera</button>
      <QrReader
        // delay={1000}
        // facingMode='environment'
        // resolution={5000}
        // className='qr-reader box'
        // showViewFinder={true}
        // onError={handleError}
        // onScan={handleScan}
        delay={1000}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  )
}

export default ScannerComp