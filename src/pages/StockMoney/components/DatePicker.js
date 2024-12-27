import React, { useEffect, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function DatePicker({ dispatch }) {

    // 用此月份控制查詢區間
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())


    const [fromDate, setFromDate] = useState(new Date().toISOString().substring(0, 10))
    const [toDate, setToDate] = useState(new Date().toISOString().substring(0, 10))





    const handlePrevious = () => {
        setMonth(month - 1)
    }

    const handleNext = () => {
        setMonth(month + 1)

    }

    // change month the same time change date
    useEffect(() => {


        // 年月基數
        let baseNum = year * 12 + month;
        // 基數取商為年份
        let y = Math.floor(baseNum / 12);
        // 月份
        let m = baseNum % 12 + 1;
        // fill 0 if m < 10 
        if (m < 10) {
            m = "0" + m;
        }
        setFromDate(y + '-' + m + '-01')

        // toDate plus one month 
        baseNum = year * 12 + month + 1;
        y = Math.floor(baseNum / 12);
        m = baseNum % 12 + 1;

        if (m < 10) {
            m = "0" + m;
        }

        // toDate need to minus one day to equal the end of the month        
        const tempDate = new Date(y + '-' + m + '-01').addDays(-1)
        setToDate(tempDate.toISOString().substring(0, 10))

        // console.log(testDate.toISOString().substring(0, 10))

    }, [month])



    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf()); // (1)
        dat.setDate(dat.getDate() + days);  // (2)
        return dat
    }






    const handleQuery = () => {
        console.log(month)
        // 將日期傳給 reducer 做查詢動作
        dispatch({ type: "QUERY", payload: { fromDate, toDate } })
        // console.log(fromDate)
    }


    return (
        <div>
            {/* {y}-{m} */}
            {/* <br></br>{fromDate}
            <br></br>{toDate} */}
            {/* <Button content='上個月' onClick={handlePrevious} /> */}
            <Button icon="arrow alternate circle left"
                onClick={handlePrevious} />
            <Button content='Query' onClick={handleQuery} />
            <Button icon="arrow alternate circle right"
                onClick={handleNext} />

            <Input onChange={(e) => setFromDate(e.target.value)}
                type="date" value={fromDate} />

            <Input onChange={(e) => setToDate(e.target.value)}
                type="date" value={toDate} />



        </div>
    )
}
