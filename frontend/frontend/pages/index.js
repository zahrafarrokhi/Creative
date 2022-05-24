import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import VirtualizedPage from '../components/SplashScreen'
import { useState } from 'react'

export default function Home() {
  const [index, setIndex] = useState(0)
  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
    <div style={{width: '100px', height: '100px'}}>
     <VirtualizedPage index={index} setIndex={setIndex}>
       {({index}) => {
         return <div style={{width: '100%', height: '100%', backgroundColor: index % 2 ? 'red' : 'blue'}}>
           {index}
         </div>
       }}
     </VirtualizedPage>
    </div>
    </div>
  )
}
