const Score = require('../models/ranking');

//##########################        FUNCTIONS

const findRecord = async () => {
   const scores = await Score.find({})
   if (scores.length !== 0) {
      return (scores.reduce((prev, current) => {
         return (prev.score < current.score) ? current : prev;
      }))
   } else {
      return { user: 'No data', score: 0 }
   }
}

const sortArr = (arr) => {
   const l = arr.length;
   for (let i = 0; i < l; i++) {
      for (let j = 1; j < l - i; j++) {
         if (arr[j].score > arr[j - 1].score) {
            let x = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = x;
         }
      }
   }
   return arr;
}


module.exports = { findRecord, sortArr }