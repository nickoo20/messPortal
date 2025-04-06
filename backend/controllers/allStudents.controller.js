import User from "../models/user.model.js";
export const getAllStudents = async (req, res) => {
  try {
    //let {search}=req.query;
    const search = req.query.search || '';
    console.log(search)
    const { hostelName } = req.user;
    let query = { hostelName: hostelName };
    if (search) {
      const searchConditions = [
        { name: { $regex: search, $options: 'i' } }
      ];

      // Attempt to convert search to a number for registrationNumber matching
      const searchNumber = Number(search);
      if (!isNaN(searchNumber)) {
        searchConditions.push({ registrationNumber: searchNumber });
      }

      query = {
        ...query,
        $or: searchConditions,
      };
    }
    console.log(query)
    ///const {hostelName}=req.user;
    const students = await User.find(query);
    console.log(students)
    res.status(200).json({ students })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}