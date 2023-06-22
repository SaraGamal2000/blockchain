
import  cont from"./build/cont.json"
import  React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {create} from "ipfs-http-client";
import {Buffer} from "buffer";

const projectId = "2RIAVMz6xIsbR8GQDtfMfftJv56";
const projectSecret = "722239f62cb74a25c4fc0d5798d2b5b9";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipsfClinet = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Fun_Contract=()=>{
	
	const abi=cont.abi;
	const contractAddress='0xe71739D0984696eABa87A49Ffc42482280384c6F';
	const [out, setOut] = useState([]);
	const [output, setOutput] = useState('');
	const [urlfile,seturlfile]=useState();
	const [hashfile,sethashfile]=useState();
	const [scour,setscour]=useState(null);
	const [Provider, setProvider] = useState(null);
	const [Signer, setSigner] = useState(null);
	const [Contract, setContract] = useState(null);
  
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

	const remove=async(event) =>
	{
		
			event.preventDefault();
		
		 let h = event.target.h.value;
				try 
				{
				const rem = await Contract.removeDNA(h);
				await rem.wait();
				console.log('Transaction successful:', rem);
				} 

				catch (error)
				{
				console.error("this is error",error);
				}
	}
	useEffect((event)=>{
		if(event){
		remove();}
  },[Contract])


////////////////////////////////////////

const getsimiler =async(event) =>{
	
	event.preventDefault();
	
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
}


  
//////////////////////////////////////////////
const getScour =async(event) =>{
	
	event.preventDefault();
	
	let h1 = event.target.h1.value;
	let h2 = event.target.h2.value;
	try {
	  let data = await Contract.calculateSimilarityScore(h1,h2);
	  //await data.wait();
	  console.log('Transaction successful:', data);
	  setscour(data);
	  return data;
	} 
	catch (error) {
	  console.error("this is error",error);
	}

  };
  useEffect((event)=>{
	if (event&& event.preventDefault) {
		getScour();}
  },[Contract])

/////////////////////////////////////////////////
    const upload =async(event) => {
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
	
	};
	useEffect((event)=>{
		if (event&& event.preventDefault) { 
			upload(event);}
	  },[Contract])
  //////////////////////////////////////////////////////

  const Connectwallethand = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountchangehandler(result[0]);
          setconnectButtontext("تم الاتصال");
        })

        .catch((error) => {
          seterroeMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      seterroeMessage("Please install MetaMask browser extension to interact");
    }
  };

  //////////////////////////////////////////////////
  const accountchangehandler = (newAccount) => {
    setdefaultAcount(newAccount);
    getuserbalanc(newAccount);
    updateEthers();
  };
  //////////////////////////////////////////////
  const getuserbalanc = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setuserbalance(ethers.utils.formatEther(balance));
      });
  };
  ///////////////////////////////////////////////////
  const chainChangedhandeler = () => {
    window.location.reload();
  };
  window.ethereum.on("accountchangehandler", accountchangehandler);
  window.ethereum.on("chainChanged", chainChangedhandeler);

const updateEthers = () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);

      let tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);

      let tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
      setContract(tempContract);
  };

  return (
    <div>
      <center>
	   <div>
        <div className="walletCard">
          <h4>'اربط محفظة الميتا ماسك بهذه الواجهة'</h4>

          <button onClick={Connectwallethand}>{connectButtontext}</button>

          <div className="accountdisplay">
            <h5>عنوان البريد:{defaultAcount}</h5>
          </div>
          <div className="balancedisplay">
            <h5>الايثيريم:{userbalance}</h5>
          </div>
          {erroeMessage}
        </div>

		----------------------------------------------------------------------------
          <div> 
            <h6>{"تفاعل مع البلوكتشين من خلال هذه الواجهة"}</h6>

			<div className="container">
					<h6 >اضغط لكي ترفع ملفك علي منصة ipsf</h6>
				
				----------------------------------------------------------------------------
        <form >
          <input type="file" id="inputGroupFile02" className="form-control" onChange={onChange}></input>
					<label className="input-group-text">   ipsfشارك ملفك علي منصة   </label>
					
				</form>
			</div>
			<div className='hash'>
			    <h5>hash of current uploaded file :{hashfile}</h5>
			</div>

     -----------------------------------------------------------------------------------------------------

            <div>
				<form onSubmit={upload}>
				<ul>
					<li><input type="Text"  id="name" /></li>
					<li><input type="Text" id="hash"  /></li>
					<button type={"submit"}> شارك ملفك   </button>
				</ul> 
				</form>
			</div>
           ----------------------------------------------------------------------------
		<div>
			<form onSubmit={remove}>
				<input type="Text"  id="name" />
				<button type={"submit"}> removeDNAfiles</button>
			</form>
		</div>
		----------------------------------------------------------------------------
		<div>
			<form onSubmit={getsimiler}>
				<input type="Text" id="h"  />
				<button type={"submit"}> getSimilarFiles</button>
			</form>
			<div className='similerfile'>
			<p>similer_DNA_is: {out}</p>
			</div>
		</div>
		----------------------------------------------------------------------------
		
         
          <form onSubmit={getScour}>
			<ul>
			<li><input type="Text" id="h1"  /></li>
			<li><input type="Text" id="h2"  /></li>
				<button type={"submit"}> getScourFiles</button>
			</ul>
			</form>
			<div className='Scour'>
			<p>scour of these file = {scour}</p>
			</div>
		</div>
	  </div>
	</center>
 </div>
  )
}
export default Fun_Contract;