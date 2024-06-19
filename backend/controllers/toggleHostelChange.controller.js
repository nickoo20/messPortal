//const Settings = require('../models/Settings'); // Adjust path as needed
import Settings from '../models/setting.model.js';
export const getGlobalSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.status(200).json(settings);
  } catch (err) {
    console.error(`Error fetching global settings: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateGlobalSettings = async (req, res) => {
  try {
    // Ensure the user can only update settings if authorized (e.g., warden)
    // if (req.user.role !== 'warden') {
    //   return res.status(403).json({
    //     message: 'Only wardens can update global settings',
    //   });
    // }

    const { enableHostelChange } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { enableHostelChange },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (err) {
    console.error(`Error updating global settings: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
