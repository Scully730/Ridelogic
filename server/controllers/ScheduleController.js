import { getPlaces } from '../services/PlacesService';
import { getScheduleTimes } from '../services/ScheduleService';

export const fetchPlaces = async () => {
  const places = await getPlaces();
  return places;
};

export const fetchSchedule = async (userLocation, destination) => {
  const times = await getScheduleTimes(userLocation, destination);
  return times;
};
