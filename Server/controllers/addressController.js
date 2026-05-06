import Address from "../models/Address.js"


//  add address
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = req.body.address || req.body;

    if (!payload) {
      return res.status(400).json({ success: false, message: "Address data is required" });
    }

    const normalizedAddress = {
      firstName: payload.firstName || payload.firstname || "",
      lastName: payload.lastName || payload.lastname || "",
      email: payload.email || "",
      street: payload.street || "",
      city: payload.city || "",
      state: payload.state || "",
      zipcode: payload.zipcode || payload.postalCode || "",
      country: payload.country || payload.contry || "",
      phone: payload.phone || "",
    };

    if (!normalizedAddress.street || !normalizedAddress.city || !normalizedAddress.state || !normalizedAddress.zipcode || !normalizedAddress.country || !normalizedAddress.phone) {
      return res.status(400).json({ success: false, message: "Please provide all required address fields" });
    }

    await Address.create({ ...normalizedAddress, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//  get address

export const getAddress = async(req,res) =>{
    try {
        const {userId} = req.body;
        const address = await Address.find({userId});
        const normalizedAddress = address.map((item) => ({
          ...item._doc,
          country: item.country || item.contry || "",
        }));
        res.json({success:true , address: normalizedAddress});
    } catch (error) {
        console.log(error.message);
        res.json({success :false , message : error.message});
    }
}
