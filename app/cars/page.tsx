'use client'
import CardCar from "../components/card-car"
import Search from "../components/search"
import { getAllCars } from "../firebase/utils"
import { useState, useEffect } from 'react';
import { Car } from "../firebase/types";

interface Props {
    car: Car[],
    onDataSend: (data: string) => void;
}

const Cars: React.FC<Props> = ({ car }: Props) => {
    const [cars, setCars] = useState<Car[]>();
    const [searchCity, setSearchCity] = useState<String>('');

    useEffect(() => {
      async function getCars() {
        const data = await getAllCars();
        setCars(data)
      }
  
      getCars();
    }, []);

    const handleInputChange = (inputValue: string) => {
        setSearchCity(inputValue);
    };

    return (
        <>
            <Search getCars={cars} onInputChange={handleInputChange} />
            <div className="container">
                <p className="text-center my-4">Résultats</p>
                <div className="flex cards-block flex-wrap">
                    {
                        cars?.filter((car) => 
                            car.city.toLowerCase().includes(searchCity?.toLowerCase())
                        ).map((filteredCar, id) => (
                            <CardCar key={id} getCar={filteredCar}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Cars;
  