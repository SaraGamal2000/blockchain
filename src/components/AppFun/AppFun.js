
import cont from"./contracts/cont.json"
import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {create} from "ipfs-http-client";
//import Web3 from 'web3';
import { Buffer } from "buffer";
//const web3 = new Web3('HTTP://127.0.0.1:7545')
const projectId = "2RIAVMz6xIsbR8GQDtfMfftJv56";
const projectSecret = "722239f62cb74a25c4fc0d5798d2b5b9";
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const ipsfClinet= create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
	authorization: auth,
},
})

const Fun_Contract=()=>{
	
	const abi=cont.abi;
	const contractAddress='0x280c2E536D68c965082bEB0c25a448279Dc1F25E';
	const [out, setOut] = useState([]);
	const [output, setOutput] = useState('');
	const [urlfile,seturlfile]=useState();
	const [hashfile,sethashfile]=useState();
	const [Provider, setProvider] = useState(null);
	const [Signer, setSigner] = useState(null);
	const [Contract, setContract] = useState(null);
    //const [Web3Api,setWeb3Api]=useState({web3:null})
	const [erroeMessage,seterroeMessage]=useState(null);
	const [connectButtontext,setconnectButtontext]=useState('اتصل بحفظة الميتاماسك');
	const [defaultAcount,setdefaultAcount]=useState(null);
	const [userbalance,setuserbalance]=useState(null);
	const [funretrieveDNA,setfunretrieveDNA]=useState(null)
	

	const onChange=async(e)=>{
				let  file=e.target.files[0];
					try
				   {
					const addfile=await ipsfClinet.add(file)
					const hash =addfile.path
					sethashfile(hash);
					console.log("this is the hash",hash);
					const url = `https://ipfs.infura.io/ipfs/${addfile.path}`
					seturlfile(url);
					console.log("this is the url",url);
					}
					
					catch(e){
						console.log("error to upload file is :",e)
					}
		}
	
////////////////////////////////////////////////////////
const remove =async(even) =>{
	even.preventDefault();
		
		let name_r = even.target.name_r.value;
	try {
	  const rem = await Contract.removeDNA(name_r).call({from:defaultAcount});
	  await rem.wait();
	  console.log('Transaction successful:', rem);
	} 
	catch (error) {
	  console.error("this is error",error);
	}
  }
  


////////////////////////////////////////
// e.preventDefault();
	// let h = e.target.h.value;
const getsimiler =async(event) =>{
	
	//event.preventDefault();
	
	let h = event.target.h.value;
	try {
	  let data = await Contract.getSimilarFiles(h);
	  //await data.wait();
	  console.log('Transaction successful:', data);
	  setOut(data);
	  return data;
	} 
	catch (error) {
	  console.error("this is error",error);
	}

  };
  useEffect(()=>{
	getsimiler();
  },[Contract])
/////////////////////////////////////////////////
    const sethandler =async(event) => {
		event.preventDefault();
		
		let name = event.target.name.value;
		let hash = event.target.hash.value;
		try
	   {
			
			let valu = await Contract.uploadSingleDNA(name,hash);
			await valu.wait();
			console.log('Transaction successful:', valu);
	   }
		catch(error){
			
			console.error('Transaction failed:',error);
		}
	
	}

	//////////////////////////////////////////////////////

	const Connectwallethand=async()=>{
		
		if (window.ethereum && window.ethereum.isMetaMask) {
			    window.ethereum.request({method:'eth_requestAccounts'})
			    .then(result =>{
			        accountchangehandler(result[0]);
			        setconnectButtontext('تم الاتصال');
			    })
			
			.catch(error => {
				seterroeMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			seterroeMessage('Please install MetaMask browser extension to interact');
		}
	}
	  
	  
//////////////////////////////////////////////////
	  const accountchangehandler=(newAccount)=>{
		setdefaultAcount(newAccount);
   		getuserbalanc(newAccount);
		   updateEthers();

		
	}  
	//////////////////////////////////////////////
	const getuserbalanc =(address)=>{
		window.ethereum.request({method:'eth_getBalance',params:[address,'latest']})
		.then(balance=>{
	     setuserbalance(ethers.utils.formatEther(balance))
		})
	
	}
	///////////////////////////////////////////////////
	 const chainChangedhandeler =()=>{
		window.location.reload();
		
	 }
	window.ethereum.on('accountchangehandler',accountchangehandler)
	window.ethereum.on('chainChanged',chainChangedhandeler)

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
		setContract(tempContract);	
	}
	
		
    return (
        <div>
			<center>
         <div className='walletCard'>
            
            <h4>'اربط محفظة الميتا ماسك بهذه الواجهة'</h4>
       
	    <button onClick={Connectwallethand}>{connectButtontext}</button>
      
	   <div className='accountdisplay'>
        
		<h5>عنوان البريد:{defaultAcount}</h5>
	   </div>
	   <div className='balancedisplay'>
	   <h5>الايثيريم:{userbalance}</h5>
	   </div>
	   {erroeMessage}
        </div>




           <div> 
            <h4>{"تفاعل مع البلوكتشين من خلال هذه الواجهة"}</h4>

			<div className="container">
					<h5 >اضغط لكي ترفع ملفك علي منصة ipsf</h5>
				<form >
					
					<input type="file" id="inputGroupFile02" className="form-control" onChange={onChange}></input>
					<label className="input-group-text">   ipsfشارك ملفك علي منصة   </label>
					
				</form>
			</div>



			<div className='hash'>
			    <h5>hash of current uploaded file :{hashfile}</h5>
			</div>



            <div>
				<form onSubmit={sethandler}>
				<ul>
					<li><input type="Text"  id="name" /></li>
					<li><input type="Text" id="hash"  /></li>
					<button type={"submit"}> شارك ملفك   </button>
				</ul> 
				</form>
			</div>

		<div>
			<form onSubmit={remove}>
				<input type="Text"  id="name" />
				<button type={"submit"}> removeDNAfiles</button>
			</form>
		</div>
		<div>
			<form onSubmit={getsimiler}>
				<input type="Text" id="h"  />
				<button type={"submit"}> getSimilarFiles</button>
			</form>
			<div className='similerfile'>
			<p>similer_DNA_is: {out}</p>
			</div>
		</div>




			{/* <form onSubmit={callretrieveDNA}>
			<ul>
				<li><input type="Text"  id="arg" /></li>
                <button type={"submit"}> استدعي ملفك   </button>
				<h5>ملفك: {funretrieveDNA}</h5>
			</ul> 
			</form>
			</div> */} 
			</div>
{/* // for="inputGroupFile02" */}
			

			
			</center>
        </div>
    )
}
export default Fun_Contract; 