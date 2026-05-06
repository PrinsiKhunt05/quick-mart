import jwt from 'jsonwebtoken';

// Single seller/admin — configure SELLER_EMAIL, SELLER_PASSWORD, optional SELLER_NAME in .env

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const inputEmail = String(email || '').trim().toLowerCase();
    const inputPassword = String(password || '').trim();

    const sellerEmail = process.env.SELLER_EMAIL ? String(process.env.SELLER_EMAIL).trim().toLowerCase() : '';
    const sellerPassword = process.env.SELLER_PASSWORD ? String(process.env.SELLER_PASSWORD).trim() : '';
    const sellerName = process.env.SELLER_NAME ? String(process.env.SELLER_NAME).trim() : 'Admin';

    if (!sellerEmail || !sellerPassword) {
      return res.json({ success: false, message: 'Seller login is not configured.' });
    }

    const matched =
      inputEmail === sellerEmail && inputPassword === sellerPassword
        ? { email: sellerEmail, name: sellerName || 'Admin' }
        : null;

    try {
      console.log('[sellerLogin] incoming email:', inputEmail);
    } catch {}

    if (!matched) {
      return res.json({ success: false, message: 'invalid Credintials' });
    }

    const profile = { role: 'admin', email: matched.email, name: matched.name };
    const token = jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('sellerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: 'logged in', profile });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  seller is auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true, profile: req.admin });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  logout seller
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: 'logged Out.' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};