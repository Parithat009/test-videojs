import React from 'react'
import Head from 'next/head'
import TestIndex from '../route/TestIndex'

const TestView = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Test Stream</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TestIndex />
    </React.Fragment>
  )
}

export default TestView