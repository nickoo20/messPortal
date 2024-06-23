import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  enableHostelChange: {
    type: Boolean,
    default: false,
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
