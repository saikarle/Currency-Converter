import { useEffect, useState } from "react";

function useCurrencyinfo(paisa){
    const [date , setData] = useState({})

useEffect(() => {

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${paisa}.json`).then((res)=>{
        res.json().then((res)=>{
            setData(res[paisa])
            console.log(date)
        })
        
    })


}, [paisa]);

    console.log(date)
    return date

}

export default useCurrencyinfo;