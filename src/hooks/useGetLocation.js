import { useState, useEffect } from "react";

const defaultCoords = [-23.55052, -46.633308];
// var watchID
export default function useGetLocation() {
    const [coords, setCoords] = useState(null);
    // const [timeStamp, setTimeStamp] = useState(null)

    useEffect(() => {

        function onSuccess(position) {
            console.log("mudeiiiiii")
            setCoords([position.coords.latitude, position.coords.longitude, position.timestamp])
            // setTimeStamp(coords.timestamp)
        }

        function onError() {
            console.error('error on get location')
            setCoords(defaultCoords);
        }

        try {
            // var watchID =navigator.geolocation.watchPosition(onSuccess, onError, {
            //     enableHighAccuracy: true,
            //     timeout: 5000
            // })
            // navigator.geolocation.getCurrentPosition(onSuccess, onError)
            navigator.geolocation.watchPosition(onSuccess, onError)
        } catch (error) {
            setCoords(defaultCoords);
        }
    }, [])

    return {coords}
    // return {watchID}
}