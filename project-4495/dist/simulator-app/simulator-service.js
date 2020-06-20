const {Delivery_Status, DeliveryStatusHistory, QueryParamModel} = require("../library-app");
const moment = require("moment");
const _ = require('lodash');
const firebaseService = require('./firebase-service');

module.exports = {
  start: start,
  stop: stop
};

const intervalFrequency = 1000;
const listInterval = {};

function start() {
  firebaseService.getNewDeliveries()
    .then((rs) => {
      _.map(rs, (x) => {
        startEach(x);
      });
    });
}

function stop() {
  _.map(listInterval, (x) => {
    clearInterval(x);
  })
}

function startEach(delivery) {
  if (listInterval[delivery.id] !== null) {
    clearInterval(listInterval[delivery.id]);
  }

  listInterval[delivery.id] = setInterval(async () => {

    let nextStatus;
    let nextPoint = null;
    switch (delivery.currentStatus.status) {
      case Delivery_Status.ORDERED:
        if (!isNext(delivery)) {
          return;
        } else {
          nextStatus = Delivery_Status.PREPARING;
          await firebaseService.updatePoint(delivery.id, delivery.currentStatus.status, nextPoint, []);
        }
        break;
      case Delivery_Status.PREPARING:
        if (!isNext(delivery)) {
          return;
        } else {
          nextStatus = Delivery_Status.WAIT_FOR_PICK_UP;
          await firebaseService.updatePoint(delivery.id, delivery.currentStatus.status, nextPoint, []);
        }
        break;
      case Delivery_Status.WAIT_FOR_PICK_UP:
        if (!isNext(delivery, 1, 2, 100)) {
          return;
        } else {
          let point = await firebaseService.getPoint(delivery.id);
          // console.log(point);
          let currentPaths = []
          if (point && point.points) {
            currentPaths = point.points;
          }
          if (currentPaths.length !== delivery.path_to_restaurant.length) {
            nextPoint = delivery.path_to_restaurant[currentPaths.length];
            await firebaseService.updatePoint(delivery.id, delivery.currentStatus.status, nextPoint);
            return;
          } else {
            nextStatus = Delivery_Status.DELIVERING;
            await firebaseService.updatePoint(delivery.id, delivery.currentStatus.status, nextPoint, []);
          }
        }
        break;
      case Delivery_Status.DELIVERING:
        if (!isNext(delivery, 1, 2, 100)) {
          return;
        } else {
          let point = await firebaseService.getPoint(delivery.id);
          // console.log(point);
          let currentPaths = []
          if (point && point.points) {
            currentPaths = point.points;
          }
          if (currentPaths.length !== delivery.path_to_customer.length) {
            nextPoint = delivery.path_to_customer[currentPaths.length];
            await firebaseService.updatePoint(delivery.id, delivery.currentStatus.status, nextPoint);
            return;
          } else {
            nextStatus = Delivery_Status.DELIVERED;
          }
        }
        break;
      case Delivery_Status.DELIVERED:
        clearInterval(listInterval[delivery.id]);
        await firebaseService.updatePoint(delivery.id, Delivery_Status.DELIVERED, nextPoint, []);
        return;
      default:
        return Promise.resolve();
    }

    console.log(nextStatus);

    const statusHistory = new DeliveryStatusHistory({
      status: nextStatus,
      delivery_id: delivery.id,
      date_time: moment().valueOf()
    });

    await firebaseService.createWithObject(statusHistory);
    await firebaseService
      .getStatusHistoryOfDelivery([new QueryParamModel('delivery_id', QueryParamModel.OPERATIONS.EQUAL, delivery.id)])
      .then((rs) => {
        delivery.setStatusHistory(rs);
      });


  }, intervalFrequency);
}

function isNext(delivery, from = 2, to = 2, time = 1000) {
  if (delivery.timeToNextStatus >= moment().valueOf()) {
    return false;
  }

  delivery.timeToNextStatus = moment().valueOf() + _.random(from, to) * time;
  return true;
}
