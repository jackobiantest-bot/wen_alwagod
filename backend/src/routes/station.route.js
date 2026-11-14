import express from 'express';
import * as stationController from '../controllers/station.controller';
import { newStationValidator } from '../validators/station.validator';
import { stationAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all stations
router.get('', stationController.getAllStations);

//route to create a new station
router.post('', newStationValidator, stationController.newStation);

//route to get a single station by their station id
router.get('/:_id', stationAuth, stationController.getStation);

//route to update a single station by their station id
router.put('/:_id', stationController.updateStation);

//route to delete a single station by their station id
router.delete('/:_id', stationController.deleteStation);

export default router;
