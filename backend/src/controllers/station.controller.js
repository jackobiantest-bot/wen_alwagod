import HttpStatus from 'http-status-codes';
import * as StationService from '../services/station.service';

/**
 * Controller to get all stations available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllStations = async (req, res, next) => {
  try {
    const data = await StationService.getAllStations();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All stations fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single station
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getStation = async (req, res, next) => {
  try {
    const data = await StationService.getStation(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Station fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new station
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newStation = async (req, res, next) => {
  try {
    const data = await StationService.newStation(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Station created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a station
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateStation = async (req, res, next) => {
  try {
    const data = await StationService.updateStation(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Station updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a station
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteStation = async (req, res, next) => {
  try {
    await StationService.deleteStation(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Station deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
