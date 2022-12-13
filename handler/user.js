const User = require('../model/modelDB');
const axios = require('axios');
 require('os');
const useragent = require('useragent');

exports.getUser = (req, res) => {
    // Get the ip address of the user
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // Get the user agent of the user
    const userAgent = req.headers['user-agent'];
    // Get the operating system of the user
    const os = useragent.parse(userAgent).os.toString();
    // Get the city and country of the user
    axios.get(`http://api.ipstack.com/${ip}?access_key=748fa255f117382929ee7e7e6689e825&format=1`)
        .then(response => {
            const city = response.data.city;
            const country = response.data.country_name;

            // Insert the data into the database
            User.create({
                ip: ip,
                os: os,
                userAgent: userAgent,
                city: city,
                country: country
            }).then(result => {
                console.log(result.dataValues);
                res.json({ message: 'User data inserted successfully', ip: ip, os: os, userAgent: userAgent, city: city, country_name: country });
            }).catch(err => {
                console.log(err);
            });
        })
        .catch(error => {
            console.log(error);
        });
    
    
};






































// exports.createUser = (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     axios.get(`http://api.ipstack.com/${ip}?access_key=748fa255f117382929ee7e7e6689e825&format=1`).then((response) => {
//         const userAgent = req.headers['user-agent'];
//         const agent = useragent.parse(userAgent);
//         const os = agent.os.toString();
//         // res country
//         const country = response.data.country_name;

//         // res city
//         const city = response.data.city;
//         User.findOne({ where: { ip: ip } }).then((user) => {

//             if (user) {
//                 res.status(200).json({
//                     message: 'User already',
//                     exists: true,
//                     user: user,
//                     country_name: country,
//                     city: city

//                 });
//             } else {
//                 User.create({
//                     ip: ip,
//                     os: os,
//                     userAgent: userAgent,
//                     country: country,
//                     city: city
//                 }).then((user) => {
//                     res.status(200).json({
//                         user:user,
//                         country_name: country,
//                         city: city
//                     });
//                 });
//             }
//         });
//     }
//     );
// };
        
        




