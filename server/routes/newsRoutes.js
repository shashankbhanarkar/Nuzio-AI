const express = require("express");

const User = require("../models/User");
const News = require("../models/News");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// PERSONALIZED NEWS
// ==========================================

router.get(
  "/personalized",
  authMiddleware,
  async (req, res) => {

    try {

      // Get logged-in user

      const user = await User.findById(
        req.userId
      );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }


      // Get preferences

      const {
        language,
        profession,
        interests,
      } = user;


      // Match user's preferences with news

      const news = await News.find({

        language: language,

        $or: [

          {
            category: profession,
          },

          {
            tags: {
              $in: interests,
            },
          },

        ],

      })
      .sort({
        publishedAt: -1,
      })
      .limit(20);


      res.json({

        count: news.length,

        preferences: {
          language,
          profession,
          interests,
        },

        news,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Failed to get personalized news",
      });

    }

  }
);


module.exports = router;