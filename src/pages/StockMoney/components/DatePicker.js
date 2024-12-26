import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function DatePicker() {


    const [fromDate, setFromDate] = useState(new Date().toISOString().substring(0, 10))
    const [toDate, setToDate] = useState(new Date().toISOString().substring(0, 10))


    // 用此月份控制查詢區間
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)


    // 按上個月
    const handlePreviousMonth = () => {



        // let month = new Date().getMonth() ;

        let date = month;


        // setMonth(month+1)




        setMonth(month - 1)
        // setFromDate(month-1)




        // 1 do not need to be changed to 0
        // minus year
        if (month == 1) {
            setMonth(12)
            setYear(year - 1)
            setFromDate((year - 1) + "-" + 12 + "-01")
        } else {
            let tempM = month - 1;

            if (tempM < 10) {
                tempM = "0" + tempM;
            }
            setFromDate(year + "-" + tempM + "-01")
        }










    }
    // 按下個月
    const handleNextMonth = () => {


        setMonth(month + 1)


        // 12 do not need to be changed to 13
        // plus year
        if (month == 12) {
            setMonth(1)
            setYear(year + 1)
            setFromDate((year + 1) + "-01-01")
        } else {
            let tempM = month + 1;

            if (tempM < 10) {
                tempM = "0" + tempM;
            }

            setFromDate(year + "-" + tempM + "-01")
        }

    }
    return (
        <div>
            {year} - {month}
            <br></br> {fromDate}





            <Button content='上個月' onClick={handlePreviousMonth} />
            <Button content='下個月' onClick={handleNextMonth} />


            <Input onChange={(e) => setFromDate(e.target.value)}
                type="date" value={fromDate} />

            <Input onChange={(e) => setToDate(e.target.value)}
                type="date" value={toDate} />


        </div>
    )
}
