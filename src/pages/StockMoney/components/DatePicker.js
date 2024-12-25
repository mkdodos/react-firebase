import React, { useEffect, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function DatePicker({ dispatch }) {
    const [fromDate, setFromDate] = useState(new Date().toISOString().substring(0, 10))
    const [toDate, setToDate] = useState(new Date().toISOString().substring(0, 10))


    // 用此月份控制查詢區間
    const [month, setMonth] = useState(new Date().getMonth() + 1)

    // 將日期區間設定為本月第一天和下月第一天    
    const dateProcess = () => {

        const defaultDate = new Date();

        let year = defaultDate.getFullYear();
        let thisMonth = month;
        let nextMonth = month + 1;

        // 月份<10補0才能跟日期input對應
        if (month < 10) {
            thisMonth = "0" + month;
        }

        // 本月第一天
        setFromDate(year + "-" + thisMonth + "-01")

        
        if (nextMonth < 10) {
            nextMonth = "0" + nextMonth;
        }

        // 跨年
        // 如果為13則年份加1,月份變成01
        // 例:2024-12=>2024-13=>2025-01
        if (nextMonth == 13) {
            year += 1;
            nextMonth = "01";
        }

        // 下個月第一天
        setToDate(year + "-" + nextMonth + "-01")
        

    }


    useEffect(() => {
        dateProcess()
    }, [month])








    const handleQuery = () => {
        console.log(month)
        // 將日期傳給 reducer 做查詢動作
        dispatch({ type: "QUERY", payload: { fromDate, toDate } })
        // console.log(fromDate)
    }
    return (
        <div>
            <Button content='previous' onClick={() => setMonth(month - 1)} />
            <Button content='next' onClick={() => setMonth(month + 1)} />


            <Button content='Query' onClick={handleQuery} />
            <Input onChange={(e) => setFromDate(e.target.value)}
                type="date" value={fromDate} />

            <Input onChange={(e) => setToDate(e.target.value)}
                type="date" value={toDate} />

            {/* <Button>查詢</Button> */}
        </div>
    )
}
