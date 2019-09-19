module.exports = app => {
  app.get("/", (req, res) => {
    res.send("bro you are in the index");
  });
};
