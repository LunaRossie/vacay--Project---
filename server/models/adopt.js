const { Schema, model } = require('mongoose');

const adoptSchema = new Schema({
  tech1: {
    type: String,
    required: true,
  },
  tech2: {
    type: String,
    required: true,
  },
  tech1_votes: {
    type: Number,
    default: 0,
  },
  tech2_votes: {
    type: Number,
    default: 0,
  },
});

const matchup= model('Matchup', matchupSchema);



module.exports = adopt;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection.js');

// class Adopt extends Model {}

// Category.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     category_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     review_id: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: 'review',
//           key: 'id',
//         },
//     },
//  },

//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'adopt',
//   }
// );