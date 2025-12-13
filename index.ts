import { API_URL, API_KEY } from "./config.ts"

const random_list=(min=-100, max=100, lengthMas = Math.floor(Math.random() * (100-20+1) + 20))=>{
   const list:number[] = []
   for(let i=0; i<lengthMas; i++){
      list.push(Math.floor(Math.random() * (max-min+1) + min))
   }
   console.log(list)
   return list
}

const mySort=(list:number[])=>{

   const bubbleSort = (list:number[])=>{

      for (let i=0; i<list.length; i++){
         let isSwap = false
         for (let j=0; j<list.length -1 -i; j++){
            if(list[j]>list[j+1]){
               isSwap = true
               const x = list[j]
               list[j] = list[j+1]
               list[j+1] = x
            }
         }
         if(!isSwap) break
      }
      return list
   }

   const quickSort = (list:number[]):number[]=>{ 

      if (list.length <= 1) return list

      const pivot = list[Math.floor(list.length/2)]
      const left = []
      const right = []

      for (const el of list) {
         if (el < pivot) left.push(el)
         else if (el > pivot) right.push(el)
         else continue
      }
      return quickSort(left).concat(pivot, quickSort(right))
   }

   const sortAlgoritmList = [bubbleSort,quickSort]

   const sortAlgoritm = sortAlgoritmList[Math.floor(Math.random() * (1-0+1)+0)]
   const sortedList = sortAlgoritm(list)

   console.log(sortedList)
   return sortedList
}

const send = async (sortedList:number[])=>{
   const sortedList_json = JSON.stringify(sortedList)
   try {
      await fetch(API_URL,{
         method: "POST",
         // headers: { 'postman-token': API_KEY },
         headers: {"Content-Type": "application/json"},
         body: sortedList_json
      })
      .then(res=>res.json())
      .then(data=>console.log("Успех: ", data))
   } catch (error) {
      console.log("Ошибка: ", error)
   }
}
send(mySort(random_list()))