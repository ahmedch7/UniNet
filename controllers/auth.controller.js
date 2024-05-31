import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { blacklistedTokens } from '../utils/blackList.js';

// send validation email 
export const sendValidationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "No user found with that email" });
    }

    const validationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const validationCodeExpires = Date.now() + 3600000; // 1 hour

    user.validationCode = validationCode;
    user.validationCodeExpires = validationCodeExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Account Activation",
      text: `You are receiving this because you (or someone else) have requested the activation of your account.\n\n
      Please use the following 6-digit code to activate your account:\n\n
      ${validationCode}\n\n
      If you did not request this, please ignore this email.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: "Validation email sent" });
  } catch (error) {
    res.status(500).send(error);
  }
};
// Account validation
export const validateAccount = async (req, res) => {
  try {
    const { email, validationCode } = req.body;
    const user = await User.findOne({ email, validationCode });

    if (!user || user.validationCodeExpires < Date.now()) {
      return res.status(400).send({ error: "Invalid or expired validation code." });
    }

    user.isActive = true; // Mark the account as validated
    user.validationCode = undefined;
    user.validationCodeExpires = undefined;
    await user.save();

    res.status(200).send({ message: "Account successfully validated." });
  } catch (error) {
    res.status(500).send(error);
  }
};
// forget password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "No user found with that email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("reset token", resetToken);
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure
    console.log("reset token expiry = ", resetTokenExpiry);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Votre email
        pass: process.env.EMAIL_PASSWORD, // Votre mot de passe
      },
    });

    const resetURL = `http://${req.headers.host}/api/auth/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetURL}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Sent");
    res.status(200).send({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).send(error);
  }
};
//verify token
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ 
      resetPasswordToken: token, 
      resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(404).send({ message: 'Password reset token is invalid or has expired.' });
    }

    res.status(200).send({ message: 'Password reset token is valid.' });
  } catch (error) {
    res.status(500).send(error);
  }
};
//reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ error: "Password reset token is invalid or has expired" });
    }

    // Update the password field
    user.motDePasse = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the user, triggering the pre-save middleware
    await user.save();

    res.status(200).send({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Inscription
export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const validationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const validationCodeExpires = Date.now() + 3600000; // 1 hour

    user.validationCode = validationCode;
    user.validationCodeExpires = validationCodeExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Account Activation",
      text: `You are receiving this because you (or someone else) have requested the activation of your account.\n\n
      Please use the following 6-digit code to activate your account:\n\n
      ${validationCode}\n\n
      If you did not request this, please ignore this email.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: "User registered. Validation email sent." });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Connexion
export const signin = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(motDePasse))) {
      return res
        .status(400)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

// log out

export const signout = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    blacklistedTokens.add(token);
    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).send({ error: 'Error logging out' });
    console.error(error);
  }
};
