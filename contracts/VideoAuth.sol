/********************************************************************************************

Engineer: Jason Cadahia
Project: VideoVouch
Organization: UTD Blockchain and Cryptography Club
Version:
Date:

********************************************************************************************/

pragma solidity ^0.4.17;

contract VideoAuth{ 
        mapping(string=>bool) vouched_videos; // hash map: key: SHA256 string, value: bool

        function store_hash(string new_hash)public returns(bool){ 
          if(vouched_videos[new_hash]==false)
            vouched_videos[new_hash]=true; // only store video if it does not already exist in hash map
          else
            return false; // do not store video if it already exists in hash map
          if(vouched_videos[new_hash]) 
            return true; // return true if hash map was successfully updated with new video hash
          else
            return false;
        }

        function compare_hash(string unknown_hash)public returns(bool){ //view?
          if(vouched_videos[unknown_hash])
            return true;
          else
            return false;
        }
}
