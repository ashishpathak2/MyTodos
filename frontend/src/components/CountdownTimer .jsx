import React, { useEffect, useState } from 'react'

function CountdownTimer({ timeDuration }) {
    const [time, setTime] = useState(timeDuration);

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000)
        }, 1000)
    }, [time])

    const formattedTime = (milliseconds) => {
        let total_secs = parseInt(Math.floor(milliseconds / 1000));
        let total_mins = parseInt(Math.floor(total_secs / 60));
        let total_hrs = parseInt(Math.floor(total_mins / 60));
    

        let seconds = parseInt(total_secs % 60);
        let minutes = parseInt(total_mins % 60);
        let hours = parseInt(total_hrs % 24);

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div>
            {formattedTime(time)}
        </div>
    )
}

export default CountdownTimer 