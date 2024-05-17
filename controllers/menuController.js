const Menu = require('../models/Menu');

exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate('restaurant');
        res.json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMenu = async (req, res) => {
    const { date, description, image, restaurant } = req.body;

    try {
        const newMenu = new Menu({
            date,
            description,
            image,
            restaurant
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMenu = async (req, res) => {
    const { id } = req.params;
    const { date, description, image, restaurant } = req.body;

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, {
            date,
            description,
            image,
            restaurant
        }, { new: true });

        res.json(updatedMenu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMenu = async (req, res) => {
    const { id } = req.params;

    try {
        await Menu.findByIdAndDelete(id);
        res.json({ message: 'Menu deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
