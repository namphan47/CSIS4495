const _ = require('lodash');
const {
  Courier,
  Customer,
  Delivery,
  DeliveryStatusHistory,
  ENUM_TABLES,
  Meal,
  Order,
  OrderItem,
  Restaurant,
  Delivery_Status,
  QueryParamModel
} = require("../library-app");

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://csis-4495-fc74e.firebaseio.com',
});

module.exports = {
  getDB: getDB,
  getNewDeliveries: getNewDeliveries,
  createWithObject: createWithObject,
  getStatusHistoryOfDelivery: getStatusHistoryOfDelivery,
  updatePoint: updatePoint,
  getPoint: getPoint
};

var fireStore = admin.firestore();
var db = admin.database();

const TABLES = {
  [ENUM_TABLES.customer]: {
    name: ENUM_TABLES.customer,
    class: Customer
  },
  [ENUM_TABLES.courier]: {
    name: ENUM_TABLES.courier,
    class: Courier
  },
  [ENUM_TABLES.restaurant]: {
    name: ENUM_TABLES.restaurant,
    class: Restaurant
  },
  [ENUM_TABLES.meal]: {
    name: ENUM_TABLES.meal,
    class: Meal
  },
  [ENUM_TABLES.order]: {
    name: ENUM_TABLES.order,
    class: Order
  },
  [ENUM_TABLES.delivery]: {
    name: ENUM_TABLES.delivery,
    class: Delivery
  },
  [ENUM_TABLES.order_item]: {
    name: ENUM_TABLES.order_item,
    class: OrderItem
  },
  [ENUM_TABLES.delivery_status_history]: {
    name: ENUM_TABLES.delivery_status_history,
    class: DeliveryStatusHistory
  }
};

function getDB(object) {
  return fireStore.collection(object.name).get()
    .then((snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        // update id
        data['id'] = id;
        array.push(data);
      });
      return array;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
    .then((rs) => {
      return convertToClassObject(rs, object.class);
    });
};

function getNewDeliveries() {
  return getDB(TABLES[ENUM_TABLES.delivery])
    .then((rs) => {
      // mapping status
      return getDeliveryStatusHistory()
        .then((histories) => {
          _.map(rs, (delivery) => {
            delivery.setStatusHistory(_.filter(histories, (x) => x.delivery_id === delivery.id));
          });
          return rs;
        })
    })
    .then((rs) => {
      return _.filter(rs, (x) => x.currentStatus.status !== Delivery_Status.DELIVERED);
    })
    .then((rs) => {
      return getCourier()
        .then((couriers) => {
          _.map(rs, (delivery) => {
            delivery.courier = _.find(couriers, x => x.id === delivery.courier_id);
          });
          return rs;
        });
    });
}

function getDeliveryStatusHistory() {
  return getDB(TABLES[ENUM_TABLES.delivery_status_history]);
}

function getCourier() {
  return getDB(TABLES[ENUM_TABLES.courier]);
}

function convertToClassObject(data, modelClass) {
  const array = [];
  _.map(data, (x) => {
    const model = new modelClass(x);
    array.push(model);
  });
  return array;
}

function createWithObject(object) {
  const id = fireStore.collection(getTable(object.constructor.name)).doc().id;
  const collection = fireStore.collection(getTable(object.constructor.name));
  return collection.doc(id).set(object.getData())
    .then(() => {
      object.id = id;
    });
}

function getTable(className) {
  return _.find(TABLES, (table) => {
    return table.class.name === className;
  }).name;
}

function getStatusHistoryOfDelivery(queryParams) {
  return this.getDB(TABLES[ENUM_TABLES.delivery_status_history], queryParams);
}

function getPoint(id) {
  let points = db.ref("points/" + id);
  return new Promise((resolve, reject) => {
    points.once("value", function (data) {
      let point = data.val();
      resolve(point);
    })
  });
}

function updatePoint(id, status, currentPoint, currentArray) {
  let points = db.ref("points/" + id);
  points.once("value", function (data) {
    let point = data.val();
    let array = [];
    if (point !== null && !!point.points) {
      array = point.points || [];
    }
    if (currentArray) {
      array = currentArray;
    }
    if (currentPoint) {
      array.push(currentPoint);
    }
    points.update({
      status: status,
      current: currentPoint,
      points: array
    });
  });
}
