import React, { useEffect, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function DatePicker() {

    // 用此月份控制查詢區間
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())

    // 年月基數
    const baseNum = year * 12 + month;
    // 基數取商為年份
    const y = Math.floor(baseNum / 12);
    // 月份
    const m = baseNum % 12 + 1;


    const handlePrevious = () => {
        setMonth(month - 1)
    }

    const handleNext = () => {
        setMonth(month + 1)

    }



    return (
        <div>{y}-{m}
            <Button content='上個月' onClick={handlePrevious} />
            <Button content='下個月' onClick={handleNext} />
        </div>
    )
}
