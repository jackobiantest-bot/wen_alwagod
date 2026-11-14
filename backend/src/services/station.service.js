import Station from '../models/station.model';

//get all stations
export const getAllStations = async () => {
  const data = await Station.find();
  return data;
};

//create new station
export const newStation = async (body) => {
  const data = await Station.create(body);
  return data;
};

//update single station
export const updateStation = async (_id, body) => {
  const data = await Station.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single station
export const deleteStation = async (id) => {
  await Station.findByIdAndDelete(id);
  return '';
};

//get single station
export const getStation = async (id) => {
  const data = await Station.findById(id);
  return data;
};
