const { Section } = require("../models/section");
const Owner = require("../models/owner");
const { Item } = require("../models/item");

function handle_request(msg, callback) {
  console.log("Inside message service kafka backend");
  console.log(msg);
  switch (msg.path) {
    case "getOwnerItem": {
      getOwnerItem(msg.content, callback);
      break;
    }
    case "getBuyerItem": {
      getBuyerItem(msg.content, callback);
      break;
    }
    case "getOwnerSections": {
      getOwnerSections(msg.content, callback);
      break;
    }
    case "doAddSection": {
      doAddSection(msg.content, callback);
      break;
    }
    case "doDeleteSection": {
      doDeleteSection(msg.content, callback);
      break;
    }
    case "doEditSection": {
      doEditSection(msg.content, callback);
      break;
    }
    case "doAddItem": {
      doAddItem(msg.content, callback);
      break;
    }
    case "doEditItem": {
      doEditItem(msg.content, callback);
      break;
    }
    case "doDeleteItem": {
      doDeleteItem(msg.content, callback);
      break;
    }
  }
}

let getOwnerItem = async (content, callback) => {
  data = content;
  const restuarant = await Owner.findById(data.restId);
  const section = await restuarant.sections.id(data.sectionId);
  callback(null, { status: 200, message: JSON.stringify(section.items) });
  return;
};

let getBuyerItem = async (content, callback) => {
  let restaurant = await Owner.findById(content);
  let sections = restaurant.sections;
  callback(null, { status: 200, message: JSON.stringify(sections) });
  return;
};

let getOwnerSections = async (content, callback) => {
  const sections = await Owner.findById(content, "sections");
  if (sections) {
    console.log(sections["sections"]);
    callback(null, {
      status: 200,
      message: JSON.stringify(sections["sections"])
    });
    return;
  } else callback({ status: 500, data: "500" }, null);
};

let doAddSection = async (content, callback) => {
  let id = content.restId;
  console.log(id);
  let newSection = Object.assign(
    {},
    { sectionName: content.sectionName, description: content.description }
  );
  console.log(newSection);
  let section = new Section(newSection);
  let restuarant = await Owner.findById(id);
  let sections = restuarant.sections;
  if (
    sections &&
    sections.filter(data => data.sectionName === newSection.sectionName)
      .length > 0
  ) {
    return res.status(400).send("400");
  } else {
    sections.push(section);
    restuarant.save(function(err, updatedRestuarant) {
      if (err) {
        callback({ status: 500, data: "500" }, null);
        return;
      }
      const section = updatedRestuarant.sections;
      callback(null, { status: 200, message: JSON.stringify(section) });
      return;
    });
  }
};

let doDeleteSection = async (content, callback) => {
  data = content;
  console.log(data);
  user = await Owner.findById(data.restId);
  section = await user.sections.id(data.sectionId);
  console.log(section);
  try {
    if (section) {
      section.remove();
      user.save(function(err, updatedUser) {
        if (!err) {
          callback(null, {
            status: 200,
            message: JSON.stringify(updatedUser.sections)
          });
          return;
        } else {
          callback(
            {
              status: 500,
              data: "500"
            },
            null
          );
          return;
        }
      });
    } else {
      callback(
        {
          status: 500,
          data: "500"
        },
        null
      );
      return;
    }
  } catch {
    () => {
      callback(
        {
          status: 500,
          data: "500"
        },
        null
      );
      return;
    };
  }
};

let doEditSection = async (content, callback) => {
  data = content;
  const restaurant = await Owner.findById(data.restId);
  const sections = await restaurant.sections.id(data.sectionId);
  if (sections) {
    sections.sectionName = data.sectionName;
    sections.description = data.description;
    restaurant.save(function(err, updatedRestuarant) {
      if (err) {
        callback({ status: 500, data: "500" }, null);
        return;
      } else {
        callback(null, {
          status: 200,
          message: JSON.stringify(updatedRestuarant.sections)
        });
        return;
      }
    });
  } else {
    callback({ status: 500, data: "500" }, null);
    return;
  }
};

let doAddItem = async (content, callback) => {
  data = content;
  let item = new Item(
    Object.assign(
      {},
      {
        price: data.price,
        itemName: data.itemName,
        description: data.description
      }
    )
  );
  const restuarant = await Owner.findById(data.restId);
  if (restuarant) {
    const section = await restuarant.sections.id(data.sectionId);
    if (section) {
      section.items.push(item);
      restuarant.save(function(err, updatedRestuarant) {
        const section = updatedRestuarant.sections.id(data.sectionId);
        callback(null, { status: 200, message: JSON.stringify(section.items) });
        return;
      });
    } else {
      callback({ status: 500, data: "500" }, null);
      return;
    }
  } else {
    callback({ status: 500, data: "500" }, null);
    return;
  }
};

let doEditItem = async (content, callback) => {
  data = content;
  const restuarant = await Owner.findById(data.restId);
  if (restuarant) {
    const section = await restuarant.sections.id(data.sectionId);
    if (section) {
      const item = await section.items.id(data.itemId);
      console.log(item);
      item.itemName = data.itemName;
      item.price = data.price;
      item.description = data.description;
      restuarant.save(function(err, updatedRestuarant) {
        const section = updatedRestuarant.sections.id(data.sectionId);
        callback(null, { status: 200, message: JSON.stringify(section.items) });
        return;
      });
    } else {
      callback({ status: 500, data: "500" }, null);
      return;
    }
  } else {
    callback({ status: 500, data: "500" }, null);
    return;
  }
};

let doDeleteItem = async (content, callback) => {
  data = content;
  const restaurant = await Owner.findById(data.restId);
  const sections = restaurant.sections;
  if (sections) {
    const section = await restaurant.sections.id(data.sectionId);
    const item = await section.items.id(data.itemId);
    console.log(item);
    item.remove();
    console.log(restaurant);
    restaurant.save(function(err, updatedRestuarant) {
      const section = updatedRestuarant.sections.id(data.sectionId);
      callback(null, { status: 200, message: JSON.stringify(section.items) });
      return;
    });
  } else {
    callback({ status: 500, data: "500" }, null);
    return;
  }
};
exports.handle_request = handle_request;
