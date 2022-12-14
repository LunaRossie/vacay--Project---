const Tech = require('./Tech');
const Adoption = require('./Adoption');

const User = require('./User');

module.exports = {Tech, Adoption, User};

// const User = require('./User');
// const Review = require('./Review');
// const Adopt = require('./Adopt');

// // Define a Driver as having many Cars, thus creating a foreign key in the `car` table
// Review.hasMany(clinic, {
//   foreignKey: 'review_id',
//   onDelete: 'CASCADE',
// });

// // The association can also be created from the Car side
// Category.belongsTo(Review, {
//   foreignKey: 'review_id',
// });

// User.hasMany(Review, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// // The association can also be created from the Car side
// Review.belongsTo(User, {
//   foreignKey: 'user_id',
// });


// mongoose.module = { User, Review, Adopt};