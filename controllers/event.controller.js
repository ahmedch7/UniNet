const Event = require('../models/Events')

const getEvents = async (req, res) => {

    try {
        const event = await Event.find({})
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body)
        res.status(200).json(event)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }

        // Update status based on Nbplaces and event date
        const currentDate = new Date();
        const eventDate = new Date(event.date);
    
        if (eventDate <= currentDate) {
            event.status = 'Ended';
        } else if (event.Nbplaces === 0) {
            event.status = 'Full';
        }
    

        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findByIdAndDelete(id)
        if (!event) {
            res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json({ message: "Event Deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    getEvents, getEvent, createEvent, updateEvent, deleteEvent
}