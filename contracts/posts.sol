// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Posts {
    mapping(string => string) private  pubKeyToDisplayName;
    mapping(string => string) private displayNameToPubKey;

    function setpubKeyToDisplayName(
        string memory displayName,
        string memory public_key
    ) public {
        require(bytes(displayName).length > 0, "Display name not set");
        require(
        bytes(displayNameToPubKey[displayName]).length == 0,
        "Display name already taken"
        );

        displayNameToPubKey[displayName] = public_key;
        pubKeyToDisplayName[public_key] = displayName; //Address of the account that called mapped to its display name
    }

    function getDisplayName(string memory public_key)
        public
        view
        returns (string memory)
    {
        return pubKeyToDisplayName[public_key];
    }

    struct Post {
        uint256 postIndex; // Unique Identification of Post
        uint256 postTime;
        string CIDHash;
        uint256 Reward; //Initialises with value 0
    }
    mapping(string => Post[]) private userPosts;
    mapping(uint256 => string) private PostToUser;

    Post[] public allPosts;

    // mapping(uint256 => Post) private allPosts;

    function createPost(Post memory post, string memory displayName) public {
        allPosts.push(post);
        PostToUser[post.postIndex]=displayName;
        userPosts[displayName].push(post);
    }

    function getUserPosts(string memory displayName)
        public
        view
        returns (Post[] memory)
    {
        return userPosts[displayName];
    }

    function getAllPosts() public view returns (Post[] memory) {
        return allPosts;
    }

    function sendRewardToPost(uint256 postId) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(
            address(msg.sender).balance >= msg.value,
            "Insufficient balance in the account"
        );
        allPosts[postId].Reward += msg.value;
    }

    function withdrawReward(string memory displayName,uint256 postId) public payable {
        require(
            keccak256(abi.encodePacked(displayName)) == keccak256(abi.encodePacked(PostToUser[postId])),
            "Display name does not match."
        );
        (bool success, ) = payable(msg.sender).call{value: allPosts[postId].Reward}("");
        require(success, "Transfer failed.");
        allPosts[postId].Reward = 0;
    }

    function Hello() public pure returns(string memory){
        return "Hello from Contract";
    }
}


