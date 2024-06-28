import Room from '../models/Room.js';
import Foyer from '../models/Foyer.js';
import Reservation from '../models/Reservation.js';

export const createRoom = async (req, res) => {
  const { roomNumber, type, capacity, foyerId } = req.body;
  try {
    const newRoom = new Room({ roomNumber, type, capacity, availablePlaces: capacity, foyerId });
    await newRoom.save();

    await Foyer.findByIdAndUpdate(foyerId, { $push: { rooms: newRoom._id } });

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error });
  }
};

export const getRooms = async (req, res) => {
  try {
    console.log("getRoom  ")
    const rooms = await Room.find().populate('foyerId');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error getting rooms", error });
  }
};

export const getRoomById = async (req, res) => {
  console.log("getRoomById  ")
  const { id } = req.params;
  try {
    const room = await Room.findById(id).populate('foyerId');
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error getting room", error });
  }
};



export const getRoomByIdFoyer = async (req, res) => {
  console.log("getRoomByIdFoyer  ")
  console.log(req.params)
  const { id } = req.params;
  try {
    const room = await Room.find({foyerId:id}).populate('foyerId');
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error getting room", error });
  }
};


export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { roomNumber, type, capacity, availablePlaces } = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { roomNumber, type, capacity, availablePlaces }, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
};

export const reserveRoom = async (req, res) => {
  const { userId, roomId, places } = req.body;
  try {
    const room = await Room.findById(roomId);

    if (room.availablePlaces < places) {
      return res.status(400).json({ message: "Not enough available places" });
    }

    room.availablePlaces -= places;
    await room.save();

    const newReservation = new Reservation({ userId, roomId, places });
    await newReservation.save();

    res.status(200).json({ message: "Room reserved successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error reserving room", error });
  }
};





export const getRoomReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("getRoomReservationById")
    // Rechercher toutes les réservations pour un restaurant donné par ID
    const reservations = await Reservation.find({ roomId: id })
      .populate('userId', 'nom email') // Ajouter les champs appropriés de votre modèle User (e.g., 'nom' et 'email')
       // Ajouter les champs appropriés du modèle Restaurant (e.g., 'nom')

    // Vérifier si des réservations existent pour ce restaurant
    // if (!reservations || reservations.length === 0) {
    //   return res.status(404).json({ message: 'No reservations found for this restaurant' });
    // }

    // Répondre avec les réservations récupérées
    res.status(200).json(reservations);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Error getting reservations', error });
  }
};
