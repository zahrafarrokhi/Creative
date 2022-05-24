import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import VirtualizedPage from '../components/SplashScreen'
import { useState } from 'react'

export default function Home() {
  const [index, setIndex] = useState(0)
  // const test = (a) => { // a = {index: 1, value: ''}
  //   const {index, value} = a;
  // }
  // const index = 4, value = 'aa'
  // test({index, value})
  // const test = ({index, value})
  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
    <div style={{width: '100px', height: '100px'}}>
     <VirtualizedPage index={index} setIndex={setIndex}>
       {( indexmy ) => {
         return <div style={{width: '100%', height: '100%', backgroundColor: indexmy % 2 ? 'red' : 'blue'}}>
            {indexmy} 
         </div>
       }}
     </VirtualizedPage>
    </div>
    </div>
  )
}
