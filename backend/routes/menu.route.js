import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Menu from '../models/menu.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/menus'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to add new menu
router.post('/add', upload.single('menuPdf'), async (req, res) => {
  try {
    const { month, year, menu } = req.body;
    const pdfPath = req.file ? req.file.filename : null;

    const newMenu = new Menu({
      month,
      year,
      menu,
      pdfPath
    });

    console.log(newMenu.pdfPath);
    const savedMenu = await newMenu.save();
    return res.status(201).json(savedMenu);
  } catch (error) {
    console.log('Error in adding menu', error.message);
    return res.status(500).json({ error: 'Failed to add menu' });
  }
});

// Route to get the latest menu
router.get('/latest', async (req, res) => {
  try {
    const latestMenu = await Menu.findOne().sort({ createdAt:-1 }) ;
    if (!latestMenu) {
      return res.status(404).json({ message: 'No menu found' });
    }
    res.status(200).json(latestMenu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

export default router;
