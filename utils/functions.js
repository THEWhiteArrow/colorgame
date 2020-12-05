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

const sortArr = arr => {
   const l = arr.length;
   let pmin = 0, pmax = l - 1, p, i;
   do {
      p = -1;
      for (i = pmin; i < pmax; i++)
         if (arr[i].score < arr[i + 1].score) {
            x = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = x;
            if (p < 0) pmin = i;
            p = i;
         };
      if (pmin) pmin--;
      pmax = p;
   } while (p >= 0);

   return arr;
}

module.exports = { findRecord, sortArr }