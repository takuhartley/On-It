// const express = require("express");
// const router = express.Router();
// const { check, validationResult } = require("express-validator");
// // Middleware
// const auth = require("../../middleware/auth");

// // Models
// const Profile = require("../../models/Profile");
// const User = require("../../models/User");

// // @route      GET api/profile/me
// // @desc       Get current users profile
// // @access     Private
// router.get("/me", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.user.id
//     }).populate("user", ["name"]);

//     // If no profile
//     if (!profile) {
//       return res.status(400).json({ msg: "There is no profile for this user" });
//     }
//     // If is profile
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route      POST api/profile
// // @desc       Create or update user profile
// // @access     Private

// // router.post(
// //   "/",
// //   [
// //     auth,
// //     [
// //       check("status", "Status is required")
// //         .not()
// //         .isEmpty(),
// //       check("skills", "Skills is required")
// //         .not()
// //         .isEmpty()
// //     ]
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }

// //     const {
// //       company,
// //       location,
// //       website,
// //       bio,
// //       skills,
// //       status,
// //       githubusername,
// //       youtube,
// //       twitter,
// //       instagram,
// //       linkedin,
// //       facebook
// //     } = req.body;

// //     // Build profile object
// //     const profileFields = {};
// //     profileFields.user = req.user.id;
// //     if (company) profileFields.company = company;
// //     if (website) profileFields.website = website;
// //     if (location) profileFields.location = location;
// //     if (bio) profileFields.bio = bio;
// //     if (status) profileFields.status = status;
// //     if (githubusername) profileFields.githubusername = githubusername;
// //     if (skills) {
// //       profileFields.skills = skills.split(",").map(skill => skill.trim());
// //     }

// //     // console.log(profileFields.skills);

// //     // Build SOcial Object
// //     profileFields.social = {};
// //     if (youtube) profileFields.social.youtube = youtube;
// //     if (twitter) profileFields.social.twitter = twitter;
// //     if (facebook) profileFields.social.facebook = facebook;
// //     if (linkedin) profileFields.social.linkedin = linkedin;
// //     if (instagram) profileFields.social.instagram = instagram;

// //     try {
// //       let profile = await Profile.findOne({ user: req.user.id });

// //       if (profile) {
// //         // Update
// //         profile = await Profile.findOneAndUpdate(
// //           { user: req.user.id },
// //           { $set: profileFields },
// //           { new: true }
// //         );
// //         // Entire Profile
// //         return res.json(profile);
// //       }
// //       // Create
// //       profile = new Profile(profileFields);

// //       // Save
// //       await profile.save();
// //       res.json(profile);
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).send("Server Error");
// //     }
// //   }
// // );

// // @route      GET api/profile
// // @desc       Get all profile
// // @access     Public
// // router.get("/", async (req, res) => {
// //   try {
// //     const profiles = await Profile.find().populate("user", ["name", "avatar"]);
// //     res.json(profiles);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // // @route      GET api/profile/user/user_id
// // // @desc       Get profile by user ID
// // // @access     Public
// // router.get("/user/:user_id", async (req, res) => {
// //   try {
// //     const profile = await Profile.findOne({
// //       user: req.params.user_id
// //     }).populate("user", ["name", "avatar"]);

// //     if (!profile) return res.status(400).json({ msg: "Profile is not found" });

// //     res.json(profile);
// //   } catch (err) {
// //     console.error(err.message);
// //     if (err.kind == "ObjectId") {
// //       return res.status(400).json({ msg: "Profile is not found" });
// //     }
// //     res.status(500).send("Server Error");
// //   }
// // });

// // @route      PUT api/profile/experience
// // @desc       Add profile experience
// // @access     Private
// // router.put(
// //   "/experience",
// //   [
// //     auth,
// //     [
// //       check("title", "Title is required")
// //         .not()
// //         .isEmpty(),
// //       check("company", "Company is required")
// //         .not()
// //         .isEmpty(),
// //       check("from", "From date is required")
// //         .not()
// //         .isEmpty()
// //     ]
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }
// //     // Array destructuring
// //     const {
// //         title,
// //         company,
// //         location,
// //         from,
// //         to,
// //         current,
// //         description
// //     } = req.body
    
// //     const newExp = {
// //         title,
// //         company,
// //         location,
// //         from,
// //         to,
// //         current,
// //         description
// //     }

// //     try {
// //       // Get user
// //       const profile = await Profile.findOne({ user: req.user.id})

// //       profile.experience.unshift(newExp);

// //       await profile.save()
// //       res.json(profile);
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).send("Server Error");
// //     }
// //   }
// // );

// module.exports = router;
