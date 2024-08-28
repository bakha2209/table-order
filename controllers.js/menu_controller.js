const Menu = require("../schema/menuSchema");

let menuController = module.exports;

menuController.allMenu = async (req, res) => {
  try {
    console.log(`POST: cont/allMenu`);
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    console.log(`ERROR, cont/allMenu, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

menuController.chosenProduct = async (req, res) => {
  try {
    console.log(`POST: cont/chosenProduct`);
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ msg: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (err) {
    console.log(`ERROR, cont/chosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
