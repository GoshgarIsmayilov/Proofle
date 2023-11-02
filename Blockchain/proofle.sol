// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "../zokrates/verifier.sol";

contract Proofle {
    mapping(address => uint256) profileCommitments;
    mapping(address => uint256) preferenceCommitments;
    mapping(address => mapping(address => bool)) likes;
    mapping(address => mapping(address => bool)) verifies;
    mapping(address => address[]) matches;

    address contractOwner;
    uint256 number_of_total_users = 0;
    uint256 number_of_total_likes = 0;
    uint256 number_of_total_dislikes = 0;
    uint256 number_of_total_matches = 0;

    Verifier verifier;

    modifier isContractOwner() {
        require(contractOwner == msg.sender, "You are not the contract owner!");
        _;
    }

    modifier notRegistered(address _address) {
        require(profileCommitments[_address] == 0, "You are already registered!");
        _;
    }

    modifier registered(address _address) {
        require(profileCommitments[_address] != 0, "You are not registered!");
        _;
    }

    modifier isVerified(address _address) {
        require(verifies[msg.sender][_address] == true, "You didn't verify yet!");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
        verifier = new Verifier();
    }

    function register(uint256 _profileCommitment, uint256 _preferenceCommitment) public notRegistered(msg.sender) {
        profileCommitments[msg.sender] = _profileCommitment;
        preferenceCommitments[msg.sender] = _preferenceCommitment;
        number_of_total_users += 1;
    }  

    function dislike(address _to) public registered(msg.sender) registered(_to) {
        likes[msg.sender][_to] = false;
        number_of_total_dislikes += 1;
    }

    function like(address _to) public registered(msg.sender) registered(_to) isVerified(_to) {
        likes[msg.sender][_to] = true;
        number_of_total_likes += 1;
        
        if (likes[_to][msg.sender]) {
            matches[msg.sender].push(_to);
            matches[_to].push(msg.sender);
            number_of_total_matches += 1;
        }
    }

    function verify(
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c, 
        address _to) public registered(msg.sender) registered(_to) {             
        bool isProofCorrect = verifier.verifyTx2(a, b, c, 
                                                [preferenceCommitments[msg.sender],
                                                 profileCommitments[_to],
                                                 1]); 

        verifies[msg.sender][_to] = isProofCorrect;                                   
    }

    function getAppStatistics() public view isContractOwner returns (uint256, uint256, uint256, uint256) {
        return (number_of_total_users, number_of_total_likes, number_of_total_dislikes, number_of_total_matches);
    }

    function getMyMatches() public view registered(msg.sender) returns (address[] memory) {
        return matches[msg.sender];
    }
}