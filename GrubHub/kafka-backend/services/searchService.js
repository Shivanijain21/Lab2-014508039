const Owner = require("../models/owner");

function handle_request(msg, callback) {
  console.log("Inside search service kafka backend");
  console.log(msg);
  switch (msg.path) {
    case "allRestuarant": {
      allRestuarant(msg.content, callback);
      break;
    }
    case "searchSpecific": {
      searchSpecific(msg.content, callback);
      break;
    }
  }
}
let allRestuarant = async (data, callback) => {
  console.log("in all restuarants");
  let restuarants = await Owner.find();
  let error = {};
  let response = {};
  if (restuarants) {
    response = {
      status: 200,
      restuarants: JSON.stringify(restuarants)
    };
    callback(null, response);
  } else {
    error = {
      status: 500,
      data: "500"
    };
    callback(error, null);
  }
};

let searchSpecific = async (req, callback) => {
  let searchString = req;
  let filteredRest = [];
  let error = {};
  let response = {};
  let restuarants = await Owner.find();
  if (restuarants) {
    for (let i = 0; i < restuarants.length; i++) {
      let sections = restuarants[i].sections;
      for (let j = 0; j < sections.length; j++) {
        let items = sections[j].items;
        let item = items.filter(item => {
          console.log(item.itemName);
          if (item.itemName === searchString) {
            filteredRest.push(restuarants[i]);
            return item;
          }
          return false;
        });
        if (item) {
          break;
        }
      }
    }
    console.log(filteredRest.length);
    response = {
      status: 200,
      message: JSON.stringify(filteredRest)
    };
    callback(null, response);
  } else {
    error = {
      status: 500,
      data: 500
    };
    callback(error, null);
  }
};
exports.handle_request = handle_request;
