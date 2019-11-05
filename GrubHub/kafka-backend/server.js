require("dotenv").config({ silent: process.env.NODE_ENV === "development" });
var connection = new require("./kafka/Connection");
//topics files
var Books = require("./services/books.js");
const SignUp = require("./services/signup");
const SignIn = require("./services/signin");
const SearchService = require("./services/searchService");
const OrdersService = require("./services/ordersService");
const MessageService = require("./services/messageService");
const MenuService = require("./services/menuService");
const BuyerService = require("./services/buyerService");
const OwnerService = require("./services/ownerService");
const mongoose = require("mongoose");
const config = require("./config");

mongoose.Promise = global.Promise;
console.log(config.mongoURI);
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb &&&&&&&&&&&&&&&"))
  .catch(err => console.log("error in mongo connect &&&&&&&&&&&&&&&" + err));

function handleTopicRequest(topic_name, fname) {
  console.log("topic name" + topic_name);
  console.log("fname" + fname);
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  console.log("consumer &&&&&&&&&&&&&&");
  console.log(consumer);
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    switch (topic_name) {
      case "sign_up":
        SignUp.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "sign_in":
        SignIn.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "search_topic":
        SearchService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "order_topic":
        OrdersService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "message_topic":
        MessageService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "menu_topic":
        MenuService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "buyer_topic":
        BuyerService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
      case "owner_topic":
        OwnerService.handle_request(data.data, function(err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
    }
  });
}
function response(data, res, err, producer) {
  console.log("after handle" + res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
        err: err
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function(err, data) {
    if (err) {
      console.log("error in producer send" + err);
    } else console.log("producer send" + data);
  });
  return;
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book", Books);
handleTopicRequest("sign_up", SignUp);
handleTopicRequest("sign_in", SignIn);
handleTopicRequest("search_topic", SearchService);
handleTopicRequest("order_topic", OrdersService);
handleTopicRequest("message_topic", MessageService);
handleTopicRequest("menu_topic", MenuService);
handleTopicRequest("buyer_topic", BuyerService);
handleTopicRequest("owner_topic", OwnerService);
