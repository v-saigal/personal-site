const { response } = require("express");
const TokenGenerator = require("../models/token_generator");
const Note = require("../models/note")

const NotesController = {
  Index: (req, res) => {
    Note.find().sort( {datePosted: -1} ).find(async (err, notes) => {
      if (err) {
        throw err; //Not sure how to test this?
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ notes: notes, token: token });
    });
  },
  Create: (req, res) => {
    const note = new Note(req.body);
    note.save(async (err) => {
      if (err) {
        throw err; // Not sure how to test this?
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
},
  Delete: (req, res) => {
    Note.deleteOne({_id: req.body._id}, (err) => {
      if (err) {
        throw err; // Not sure how to test this?
      } else {
        res.status(201).json({ message: 'OK' });
      }
    })
  }
}

//   Update: async (req, res) => {
//     Post.findOneAndUpdate(
//       { _id: req.body._id },
//       { $push: { likes: req.body.userId } }
//     ).exec()
//     res.status(200).json({ message: 'like added'})
//   },

//   RemoveLike: async (req, res) => {
//     Post.findOneAndUpdate(
//       { _id: req.body._id },
//       { $pull: { likes: req.body.userId } }
//     ).exec()
//     res.status(200).json({ message: 'like removed'})
//   },


//   Comment: async (req, res) => {


//     Post.findByIdAndUpdate(
//       { _id: req.body._id },
//       { $push:{ comments:{ user_id: req.body.user_id, user_comment: req.body.user_comment }}}
//   ).exec()
//   const token = await TokenGenerator.jsonwebtoken(req.user_id)
//   res.status(200).json({message: "ok", token: token})
//   }
// };

module.exports = NotesController;