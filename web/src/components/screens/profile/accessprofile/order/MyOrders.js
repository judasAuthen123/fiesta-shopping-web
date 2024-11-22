import React, { useContext, useEffect, useRef, useState } from 'react'
import ItemOrder from './ItemOrder'
import AxiosInstance from './../../../../../util/AxiosInstance';
import { AppContext } from './../../../../../util/AppContext';
import styles from './MyOrders.module.css'
import ListRender from '../../../../public/components/listRender/ListRender'
import { useTranslation } from 'react-i18next';
export default function MyOrders() {
  const { t } = useTranslation()
  const { dataUser } = useContext(AppContext)
  const marginRef = useRef()

  const arrSatus = [
    {
      id: 0,
      status: 'All',
      value: t('Profile.Article.Orders.toptab.all')
    },
    {
      id: 1,
      status: 'Pending',
      value: t('Profile.Article.Orders.toptab.pending')
    },
    {
      id: 2,
      status: 'Processing',
      value: t('Profile.Article.Orders.toptab.processing')
    },
    {
      id: 3,
      status: 'Shipping',
      value: t('Profile.Article.Orders.toptab.shipping')
    },
    {
      id: 4,
      status: 'Delivered',
      value: t('Profile.Article.Orders.toptab.delivered')
    },
    {
      id: 5,
      status: 'Cancelled',
      value: t('Profile.Article.Orders.toptab.cancelled')
    },
    {
      id: 6,
      status: 'Returned',
      value: t('Profile.Article.Orders.toptab.returned')
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
  }, [statusSelected, statusFilter, dataOrder, arrSatus.length])


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
              className={`${styles.itemTopTab} ${statusSelected === item.id ? styles.selected : ''}`}>{item.value}</div>
          )
        }
        <div className={styles.bottomLine} ref={marginRef} />
      </div>
      <ListRender
        isTrue={dataOrderSelected.length > 0}
        label={t('Profile.Article.Orders.listEmpty')}
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
