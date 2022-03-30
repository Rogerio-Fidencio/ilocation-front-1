import { useState, useEffect } from "react";

export default function useGetLocation() {
    const [coords, setCoords] = useState(null);

    useEffect(() => {

        function onSuccess(position) {
            setCoords([position.coords.latitude, position.coords.longitude, position.timestamp])
        }

        function onError(error) {
            console.log(error.message)
        }

        try {
            navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: false, timeout: 5000,
                maximumAge: Infinity})

        } catch (error) {
            onError(error);
        }
    }, [])

    return {coords}
}