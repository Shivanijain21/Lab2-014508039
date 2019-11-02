const express = require("express");
const router = express.Router();
const { Section } = require("../models/section");
const Owner = require("../models/owner");
const { Item } = require("../models/item");

router.post("/", async (req, res) => {
  data = req.body;
  const restuarant = await Owner.findById(data.restId);
  const section = await restuarant.sections.id(data.sectionId);
  return res.status(200).send(JSON.stringify(section.items));
});

router.get("/section/:id", async (req, res) => {
  id = req.params.id;
  const sections = await Owner.findById(id, "sections");
  if (sections) {
    console.log(sections["sections"]);
    return res.status(200).send(JSON.stringify(sections["sections"]));
  } else res.status(500).send("500");
});

router.get("/:id", async (req, res) => {
  id = req.params.id;
  // fetchQuery = `SELECT * from Item where restId='${id}'`;
  // pool.query(fetchQuery, (err, result) => {
  //   if (!err) {
  //     console.log("fetch item");
  //     let sections = {};
  //     result.forEach(function(e) {
  //       if (sections.hasOwnProperty(e.section)) {
  //         sections[e.section].push(e);
  //       } else {
  //         sections[e.section] = [];
  //         sections[e.section].push(e);
  //       }
  //     });
  //     console.log(sections);
  //     res.writeHead(200, {
  //       "Content-Type": "application/JSON"
  //     });
  //     res.end(JSON.stringify(sections));
  //   } else console.log(err);
  let restaurant = await Owner.findById(id);
  let sections = restaurant.sections;
  return res.status(200).send(sections);
});

router.post("/addSection", async (req, res) => {
  let id = req.body.restId;
  console.log(id);
  let newSection = Object.assign(
    {},
    { sectionName: req.body.sectionName, description: req.body.description }
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
        return res.status(500).send("500");
      }
      const section = updatedRestuarant.sections;
      return res.status(200).send(JSON.stringify(section));
    });
  }
});

router.post("/deleteSection", async (req, res) => {
  data = req.body;
  console.log(data);
  user = await Owner.findById(data.restId);
  section = await user.sections.id(data.sectionId);
  console.log(section);
  try {
    if (section) {
      section.remove();
      user.save(function(err, updatedUser) {
        return res.status(200).send(JSON.stringify(updatedUser.sections));
      });
    } else return res.status(500).send("500");
  } catch {
    () => {
      return res.status(500).send("500");
    };
  }
});

router.post("/editSection", async (req, res) => {
  data = req.body;
  console.log(data);
  const restaurant = await Owner.findById(data.restId);
  const sections = await restaurant.sections.id(data.sectionId);
  if (sections) {
    sections.sectionName = data.sectionName;
    sections.description = data.description;
    restaurant.save(function(err, updatedRestuarant) {
      if (err) {
        return res.status(500).send("500");
      }
      // const section = updatedRestuarant.sections.id(data.sectionId);
      return res.status(200).send(JSON.stringify(updatedRestuarant.sections));
    });
  } else return res.status(500).send("500");
});

router.post("/addItem", async (req, res) => {
  console.log(" i a here");
  data = req.body;
  console.log(data);
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
        return res.status(200).send(JSON.stringify(section.items));
      });
    } else return res.status(500).send("500");
  } else return res.status(500).send("500");
});

router.post("/editItem", async (req, res) => {
  data = req.body;
  console.log(data);
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
        return res.status(200).send(JSON.stringify(section.items));
      });
    } else return res.status(500).send("500");
  } else return res.status(500).send("500");
});

router.post("/deleteItem", async (req, res) => {
  data = req.body;
  console.log(" i am in delete item");
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
      return res.status(200).send(JSON.stringify(section.items));
    });
  } else {
    return res.status(500).send("500");
  }
});

module.exports = router;
