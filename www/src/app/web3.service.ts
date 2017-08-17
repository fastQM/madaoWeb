import { Injectable } from '@angular/core';

@Injectable()
export class Web3Service{

    private web3:any;

    constructor(){
      
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
          window.web3 = new Web3(web3.currentProvider);
        } else {
          console.log('No web3? You should consider trying MetaMask!')
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

          console.log("result:" + web3.eth.accounts)
        })
    }

}