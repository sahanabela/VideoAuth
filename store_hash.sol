pragma solidity ^0.5.10;

//needs to receive and store original video hash and ID
//needs to receive requests for video authentication (input: hash)
//needs to compare received hash with stored hashes
//needs to output ID of original video if a matching hash is found
//needs to output message if no matching hash is found
contract VideoAuth{ //should this contract take an argument?
        bytes32[] public video_hashes; //output of SHA256 a 32 byte hex string

        function store_hash(bytes32 new_hash)private{
		//receive input from backend
                video_hashes.push(new_hash);
        }
	function compare_hash(bytes32 unknown_hash){
		//receive input from backend
		//O(1) search 
		//if match is found, return index (index will be ID)
	}

}
