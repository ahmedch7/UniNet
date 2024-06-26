import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { blacklistedTokens } from "../utils/blackList.js";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

// send validation email
export const sendValidationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "No user found with that email" });
    }

    const validationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // 6-digit code
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
      return res
        .status(400)
        .send({ error: "Invalid or expired validation code." });
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
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const templatePath = path.resolve("emailTemplates", "forgotPassword.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    const resetURL = `http://${req.headers.host}/api/auth/reset-password/${resetToken}`;
    const htmlToSend = template({ resetURL });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);

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
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: "Password reset token is invalid or has expired." });
    }

    res.status(200).send({ message: "Password reset token is valid." });
  } catch (error) {
    res.status(500).send(error);
  }
};
//reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Validate the new password
    if (newPassword.length < 6) {
      return res.status(400).send({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ error: "Password reset token is invalid or has expired" });
    }

    // Update the password field
    user.motDePasse = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the user, triggering the pre-save middleware
    await user.save();

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Read the Handlebars template file
    const templatePath = path.resolve("emailTemplates", "resetPassword.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");

    // Compile the template
    const template = handlebars.compile(templateSource);

    // Prepare data to be passed into the template
    const context = {
      user: {
        prenom: user.prenom, // Replace with appropriate user properties
      },
    };

    // Generate HTML for the email using the compiled template
    const htmlToSend = template(context);

    // Send mail with defined transport object
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Successfully Reset",
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: "Password has been reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send({ error: "An error occurred while resetting the password" });
  }
};

// Inscription
export const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { nom, prenom, email, motDePasse, dateDeNaissance, numTel, entreprise, role, niveauxEducatif, universiteAssociee } = req.body;

    // Create a new user object
    const user = new User({
      nom,
      prenom,
      email,
      motDePasse,
      dateDeNaissance,
      numTel,
      entreprise,
      role,
      niveauxEducatif,
      universiteAssociee,
    });

    // If an avatar is uploaded, save its path to the user profile
    if (req.file) {
      user.avatar = req.file.path;
    }

    // Save the user to the database
    await user.save();

    // Generate validation code
    const validationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const validationCodeExpires = Date.now() + 3600000; // 1 hour

    user.validationCode = validationCode;
    user.validationCodeExpires = validationCodeExpires;
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    // Read email template
    const templatePath = path.resolve("emailTemplates", "accountActivation.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    // Generate email content
    const htmlToSend = template({ validationCode });

    // Set up email options
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Account Activation",
      html: htmlToSend,
    };

    // Send validation email
    await transporter.sendMail(mailOptions);

    // Send response
    res.status(201).send({ message: "User registered. Validation email sent." });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Connexion
export const signin = async (req, res) => {
  try {
    const { email, motDePasse, token, rememberMe } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(motDePasse))) {
      return res
        .status(400)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .send({ error: "Your account is not active. Please contact support." });
    }

    if (user.twoFactorEnabled) {
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token,
      });
      if (!verified) {
        return res.status(400).send({ error: "Invalid 2FA token" });
      }
    }

    const authToken = user.generateAuthToken(rememberMe);

    // Save long-lived token if rememberMe is true
    if (rememberMe) {
      user.longLivedToken = authToken;
      await user.save();
    }

    res.send({ user, token: authToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

// setup 2FA
export const setupTwoFactorAuth = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "No user found with that email" });
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;
    await user.save();

    const otpauth = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: email,
      issuer: "uninet",
    });

    QRCode.toDataURL(otpauth, (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).send({ error: "Error generating QR code" });
      }
      res.status(200).send({ qrCodeUrl });
    });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};
// Verify 2FA token
export const verifyTwoFactorAuth = async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "No user found with that email" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (!verified) {
      return res.status(400).send({ error: "Invalid token" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.status(200).send({ message: "2FA enabled successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};
// disable 2FA status
export const disableTwoFactor = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you send userId in the request body

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Disable 2FA
    user.twoFactorEnabled = false;
    user.twoFactorSecret = undefined; // Clear the 2FA secret
    await user.save();

    res
      .status(200)
      .send({ message: "Two-Factor Authentication disabled successfully" });
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Server error. Unable to disable Two-Factor Authentication",
      });
  }
};
