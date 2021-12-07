'use strict'

module.exports = {
    calculateMatch: (iUser, cUser, companyVector) => {
        let total = 0.0;
        let count = 0.0;
        iUser.forEach((importance, idx) => {
            if (importance == 1) {
                count++;
                console.log("parseFloat(cUser[idx]: ", parseFloat(cUser[idx]))
                console.log("parseFloat(companyVector[idx]): ",parseFloat(companyVector[idx]))
                total += parseFloat(1 - (Math.abs(parseFloat(cUser[idx]) - parseFloat(companyVector[idx])) / 4))
            }
        })
        return total / count;
    }
}