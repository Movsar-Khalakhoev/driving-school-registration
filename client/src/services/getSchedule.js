// import useHttp from '../hooks/http.hook'
// import AuthContext from '../context/AuthContext'
// import {useContext} from 'react'
//
// const getSchedule = async date => {
//   const dayInterval = {
//     interval: [9, 17],
//     exclude: [[13, 'Обед']]
//   }
//
//   const data = await request(
//     `http://192.168.56.1:3000/api/schedule/2021-1-6`,
//     'GET',
//     null,
//     {
//       Authorization: `Bearer ${token}`
//     })
//
//
//   const {interval, exclude} = dayInterval
//   const schedule = []
//   for (let i = interval[0]; i <= interval[1]; i++) {
//     const hour = `${i}:00 - ${i+1}:00`
//     const hourInterval = {
//       hour,
//       id: i
//     }
//
//     const excludeInterval = exclude.find(item => item[0] === i)
//
//     if (excludeInterval) {
//       hourInterval['name'] = excludeInterval[1]
//     } else {
//       const RentedInterval = data.schedule.find(item => item.interval === hour)
//
//       if (RentedInterval) {
//         hourInterval['name'] = RentedInterval.name
//       }
//     }
//
//     schedule.push(hourInterval)
//   }
//
//   return schedule
// }
//
// export default getSchedule
