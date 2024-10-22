import React, { useContext, useEffect, useRef, useState } from 'react'
import ItemOrder from './ItemOrder'
import AxiosInstance from './../../../../../util/AxiosInstance';
import { AppContext } from './../../../../../util/AppContext';
import styles from './MyOrders.module.css'
import ListRender from '../../../../public/components/listRender/ListRender'
export default function MyOrders() {
  const { dataUser } = useContext(AppContext)
  const marginRef = useRef()

  const arrSatus = [
    {
      id: 0,
      status: 'All'
    },
    {
      id: 1,
      status: 'Pending'
    },
    {
      id: 2,
      status: 'Processing'
    },
    {
      id: 3,
      status: 'Shipping'
    },
    {
      id: 4,
      status: 'Delivered'
    },
    {
      id: 5,
      status: 'Cancelled'
    },
    {
      id: 6,
      status: 'Returned'
    }
  ]


  const [dataOrder, setDataOrder] = useState([])
  const [dataOrderSelected, setDataOrderSelected] = useState([])
  const [statusSelected, setStatusSelected] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    if (marginRef.current) {
      marginRef.current.style.left = `calc((100%/${arrSatus.length}) * ${statusSelected})`
    }
    const newDataOrder = dataOrder.filter(item => statusFilter ? item.status === statusFilter : item)
    setDataOrderSelected(newDataOrder)
  }, [statusSelected, statusFilter, dataOrder])


  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await AxiosInstance.get(`/order/getOrderByUser?page=1&userId=${dataUser?._id}`)
        if (response.statusCode === 200) {
          setDataOrder(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getOrders()
  }, [dataUser?._id])

  return (
    <div className={styles.container}>
      <div className={styles.viewTopTab}>
        {
          arrSatus.map(item =>
            <div
              key={item.id}
              onClick={() => {
                setStatusSelected(item.id)
                setStatusFilter(() => {
                  return item.status === 'All' ? '' : item.status
                })
              }}
              className={`${styles.itemTopTab} ${statusSelected === item.id ? styles.selected : ''}`}>{item.status}</div>
          )
        }
        <div className={styles.bottomLine} ref={marginRef} />
      </div>
      <ListRender
        isTrue={dataOrderSelected.length > 0}
        label={'No orders yet'}
        className={styles.listRender}
        isStartUp={statusFilter}>
        {
          dataOrderSelected && dataOrderSelected.map(item =>
            <ItemOrder key={item._id} data={item} status={item.status} />
          )
        }
      </ListRender>
    </div>
  )
}
