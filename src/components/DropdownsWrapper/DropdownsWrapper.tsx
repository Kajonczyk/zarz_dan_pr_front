import {Dropdown} from "../Dropdown/Dropdown";
import {City, FuelType} from "../../types";
import {cities, fuelTypeOptions} from "../../assets/dropdownLists";
import {Input} from "../Input/Input";
import "./DropdownsWrapper.style.scss"
import {Button} from "../Button/Button";

interface DropdownsWrapperProps {
    setDestinationFrom: React.Dispatch<React.SetStateAction<City>>,
    setDestinationTo: React.Dispatch<React.SetStateAction<City>>,
    setFuelType: React.Dispatch<React.SetStateAction<FuelType>>,
    setFuelConsumption: React.Dispatch<React.SetStateAction<number>>,
    handleSubmit: () => void
}

export const DropdownsWrapper = ({
                                     setDestinationFrom,
                                     setDestinationTo,
                                     setFuelConsumption,
                                     setFuelType,
                                     handleSubmit
                                 }: DropdownsWrapperProps) => {

    return <div className="dropdownsWrapper flex flex-column">
        <div className="flex">
            <Dropdown onChange={(city: City) => {
                setDestinationFrom(city)
            }} options={cities} label={"Skąd jedziesz?"}/>
            &nbsp;
            <Dropdown onChange={(city: City) => {
                setDestinationTo(city)
            }} options={cities} label={"Dokąd jedziesz?"}/>
        </div>
        <br/>
        <div className="flex">
            <Dropdown onChange={(fuelType: { value: FuelType, label: string }) => {
                setFuelType(fuelType.value)
            }} options={fuelTypeOptions} label={"Rodzaj paliwa"}/>
            &nbsp;
            <div>
                <Input onChange={(e) => {
                    setFuelConsumption(Number(e.currentTarget.value))
                }} label={"Spalanie na 100km"}/>
            </div>
        </div>
        <Button onClick={handleSubmit} text="Oblicz"/>
    </div>
}