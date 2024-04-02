import { Excursion } from "./excursion.modal";
import { Location } from 'src/app/models/location.modal'

export interface Home{
    excursions:Excursion[];
    pickUpLocations: Location[]
}