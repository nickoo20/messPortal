// controllers/userController.js
// const User = require('../models/ser');
import User from '../models/user.model.js'

export const makeStudentRepresentative = async (req, res) => {
    const registrationNumber = parseInt(req.params.registrationNumber,10);
  const user = await User.findOne( {registrationNumber} );
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    const user = await User.findOneAndUpdate(
       {registrationNumber},
      { studentRep: true },
      { new: true } // Return the updated document
    );
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const removeStudentRepresentative = async (req, res) => {
  //const { registrationNumber } = req.params;
  const  registrationNumber = parseInt(req.params.registrationNumber, 10);
  if(registrationNumber)
   console.log(registrationNumber)
   else
   console.log("not here")
  try {
    const user = await User.findOneAndUpdate(
       {registrationNumber} ,
      { studentRep: false },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const findALLMr=async (req, res) => {
  try {
    const students = await User.find({ studentRep: true });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}

