
// export const sortData = (data) => {
//   //a copy
//   const sortedData = [...data]
//   sortedData.sort((a,b) => {
//     if(a.cases > b.cases) {
//       return -1
//     }
//     else return 1
//   })
//   return sortedData
// }
export const sortData = (data) => {
  //a copy
  const sortedData = [...data]
  sortedData.sort((a,b) => b.cases - a.cases)
  return sortedData
}
