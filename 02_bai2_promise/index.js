// Code without promise
const fs = require("fs");

// Read data1.txt
// fs.readFile("02_bai2_promise/data1.txt", function(err, data1){
//     if(err){
//         console.log("Ko doc dc file 1");
//     }else{
//         console.log(data1.toString());
//         // Read data2.txt
//         fs.readFile("02_bai2_promise/data2.txt", function(err, data2){
//             if(err){
//                 console.log("Loi ko doc dc file 2");
//             }else{
//                 console.log(data2.toString());

//                 // Read file 3
//                 fs.readFile("02_bai2_promise/data3.txt", function(err, data3){
//                     if(err){
//                         console.log("Loi ko doc dc file 3");
//                     }else{
//                         console.log(data3.toString());
//                     }
//                 });
//             }
//         });
//     }
// });
// ====> Callback hell


// Code with promise
// new Promise(function(resolve, reject){
//     // File 1
//     fs.readFile("02_bai2_promise/data1.txt", function(err, data1){
//         if(err){
//             reject(err);
//         }else{
//             resolve(data1);
//         }
//     });
// }).then(function(data1){
//     console.log(data1.toString());
//     // Read file 2
//     return new Promise(function(resolve, reject){
//         fs.readFile("02_bai2_promise/data2.txt", function(err, data2){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data2);
//             }
//         });
//     });
// }).then(function(data2){
//     console.log(data2.toString());
//     // Read file 3
//     return new Promise(function(resolve, reject){
//         fs.readFile("02_bai2_promise/data3.txt", function(err, data3){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data3);
//             }
//         });
//     });
// }).then(function(data3){
//     console.log(data3.toString());
// }).catch(function(err){
//     console.log(err);
// });



// new Promise(function(resolve, reject){
//     // B1: Tong 2 so
//     let tong = 3 + 6;

//     resolve(tong);
// }).then(function(tong){
//     // B2: Chia cho 3
//     let kq = tong / 3;

//     return kq;
// }).then(function(kq){
//     // B3: tru di 1
//     kq = kq - 1;
//     console.log(kq);
// });


// Chu viet lai code doc 3 file data voi Promise

new Promise(function(resolve, reject){
    fs.readFile("02_bai2_promise/data1.txt", function(err, data1){
        if (err){
            reject(err);
        }else {
            resolve(data1);
        };
    });
}).then(function(data1){
    console.log(data1.toString());
    return new Promise(function(resolve, reject){
        fs.readFile("02_bai2_promise/data2.txt", function(err, data2){
            if (err){
                reject(err);
            }else{
                resolve(data2);
            };
        });
    });
}).then(function(data2){
    console.log(data2.toString());
    return new Promise(function(resolve, reject){
        fs.readFile("02_bai2_promise/data3.txt", function(err, data3){
            if (err){
                reject(err);
            }else {
                resolve(data3)
            };
        });
    });
}).then(function(data3){
    console.log(data3.toString());
}).catch(function(err){
    console.log(err);
})