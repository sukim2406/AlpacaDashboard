

// const Alpaca = require('@alpacahq/alpaca-trade-api');
// const API_KEY = "PKNH83ZQOJLFAT902WVU";
// const SECRET_KEY = "lmC129fyQXMOXssuMLP1eotGhlyOPLTneSqoncN2";
// const BASE_URL = "https://paper-api.alpaca.markets/";

// class AlpacaClass{
//     constructor ({ keyId, secretKey, paper=true}){
//         this.alpaca = new Alpaca({
//             keyId: keyId,
//             secretKey: secretKey,
//             paper: paper
//         })
//     }

//     async getAccountInfo() {
//         let data;
//         try {
//             data = await this.alpaca.getAccount();
//         }catch (err){
//             console.log(err);
//         }
//         return data;
//     }
// }