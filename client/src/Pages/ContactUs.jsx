import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const ContactCard = ({ icon, title, children }) => (
  <Paper
    elevation={2}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      p: 2.5,
      borderRadius: 2,
      transition: "transform 0.25s, box-shadow 0.25s",
      "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
    }}
  >
    {icon}
    <Box>
      <Typography sx={{ fontWeight: 700, color: "#2c3e50" }}>{title}</Typography>
      <Typography sx={{ color: "#636e72" }}>{children}</Typography>
    </Box>
  </Paper>
);

const ContactUs = () => {
  const { axios } = useAppContext();
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact, message } = formData;

    if (!name.trim() || !email.trim() || !contact.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/contact/contact", { name, email, contact, message });
      if (data.success) {
        toast.success("Thanks for contacting QuickMart!");
        setFormData({ name: "", email: "", message: "", contact: "" });
      } else {
        toast.error(data.message || "Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="main" aria-label="Contact QuickMart" sx={{ bgcolor: "#f9fbfc" }}>
      <Box
        sx={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/contact-us-customer-support-hotline-people-connect-call-customer-support_36325-164.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          py: { xs: 8, md: 12 },
          px: 2,
        }}
        aria-label="Contact Hero"
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
          Contact QuickMart
        </Typography>
        <Typography sx={{ fontSize: "1.125rem", maxWidth: 700, mx: "auto" }}>Have a question, feedback, or need help? We&apos;re here to assist you.</Typography>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: "auto", my: { xs: 6, md: 8 }, px: 2 }} aria-label="Contact Form and Info">
        <Stack direction={{ xs: "column", md: "row" }} spacing={5} justifyContent="space-between">
          <Paper elevation={4} sx={{ flex: "1 1 500px", p: { xs: 3, md: 5 }, borderRadius: 3 }} component="form" onSubmit={handleSubmit} aria-label="Send us a message">
            <Typography variant="h5" sx={{ color: "#2E7D32", mb: 3, fontWeight: 700 }}>
              📩 Send us a Message
            </Typography>

            <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
            <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
            <TextField fullWidth margin="normal" label="Contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Your contact number" required />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
              multiline
              rows={4}
            />

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, py: 1.75, bgcolor: loading ? "#95a5a6" : "#27ae60", fontWeight: 700, "&:hover": { bgcolor: loading ? "#95a5a6" : "#1e8449" } }}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Paper>

          <Stack spacing={3} sx={{ flex: "1 1 300px" }}>
            <ContactCard icon={<MdPhone size={28} color="#27ae60" />} title="Phone">
              <a href="tel:+919876543210" style={{ color: "#636e72", textDecoration: "none" }}>
                +91 98765 43210
              </a>
            </ContactCard>
            <ContactCard icon={<MdEmail size={28} color="#2980b9" />} title="Email">
              <a href="mailto:support@quickmart.com" style={{ color: "#636e72", textDecoration: "none" }}>
                support@quickmart.com
              </a>
            </ContactCard>
            <ContactCard icon={<MdLocationOn size={28} color="#e67e22" />} title="Address">
              <span>123 QuickMart Street, Mumbai, India</span>
            </ContactCard>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactUs;
