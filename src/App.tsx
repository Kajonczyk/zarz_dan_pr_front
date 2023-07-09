import {useCallback, useEffect, useRef, useState} from 'react'
import {City, FuelPrice, FuelType} from "./types";
import {DropdownsWrapper} from "./components/DropdownsWrapper/DropdownsWrapper";
import {getCenter, getDistance} from "geolib"
import {MapContainer, Marker, TileLayer} from "react-leaflet";

function App() {

    const [destinationFrom, setDestinationFrom] = useState<City>()
    const [destinationTo, setDestinationTo] = useState<City>()
    const [fuelType, setFuelType] = useState<FuelType>()
    const [fuelConsumption, setFuelConsumption] = useState(0)
    const [fuelPrices, setFuelPrices] = useState<FuelPrice>()
    const [calculatedConsumption, setCalculatedConsumption] = useState<number>()

    const mapRef = useRef<any>()

    useEffect(() => {
        fetch("http://localhost:4200/").then(d => d.json()).then(data => setFuelPrices(data))
    }, [])

    const getDistanceBetweenCords = () => {
        return Math.ceil((getDistance([destinationFrom!.lon, destinationFrom!.lat], [destinationTo!.lon, destinationTo!.lat]) / 1000) * 1.1)
    }

    const handleSubmit = () => {
        const distanceBetweenPointsInKm = getDistanceBetweenCords()
        const price = Math.ceil((distanceBetweenPointsInKm * fuelConsumption) * Number(fuelPrices![fuelType])) / 100
        setCalculatedConsumption(price)
        mapRef.current?.setView(getCenterPoint(), 5)
    }

    const getCenterPoint = useCallback(() => {
        if(!destinationFrom?.lat || !destinationTo?.lat){
            return []
        }
        const {longitude, latitude} = getCenter([
            {latitude: destinationFrom!.lat, longitude: destinationFrom!.lon},
            {latitude: destinationTo!.lat, longitude: destinationTo!.lon}
        ])

        return [latitude, longitude]
    },[destinationFrom?.lat, destinationTo?.lon])

    const renderMap = useCallback(() => {
        const center = getCenterPoint()
        return  <div className={"mapWrapper"}><MapContainer
            ref={mapRef}
            className="markercluster-map"
            center={center}
            zoom={5}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />

            <Marker position={[destinationFrom!.lat, destinationFrom!.lon]}/>
            <Marker position={[destinationTo!.lat, destinationTo!.lon]}/>
        </MapContainer></div>
    }, [destinationFrom?.lat, destinationTo?.lon])

    return (
        <div className="app flex items-center flex-column">
            <div onClick={() => console.log(destinationFrom, destinationTo)}>tester</div>
            <DropdownsWrapper handleSubmit={handleSubmit} setFuelType={setFuelType}
                              setFuelConsumption={setFuelConsumption}
                              setDestinationTo={setDestinationTo} setDestinationFrom={setDestinationFrom}/>

            {calculatedConsumption ?
                <div className={"appResult"}>Twój koszt podróży to: {calculatedConsumption}zł</div> : <div></div>}

            {destinationFrom?.lat && destinationTo?.lat && renderMap()}
        </div>
    )
}

export default App
