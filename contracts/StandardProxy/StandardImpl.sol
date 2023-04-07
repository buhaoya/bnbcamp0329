// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract StandardImpl {
    // uint256 public constant VERSION = 1;
    uint256 public constant VERSION = 2;

    bool public initialized;

    uint256 public value;
    bytes32 public hashValue;
    uint256[2] public numbers = [1, 2];
    uint8 public shortNumberA;
    uint8 public shortNumberB;
    uint128 public shortNumberC;

    modifier initializer() {
        require(!initialized, "Only initialize once");
        _;
        initialized = true;
    }

    function initialize(uint256 _initValue) public initializer {
        value = _initValue;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue + 10;
    }

    function setHashvalue(bytes32 _newValue) public {
        hashValue = _newValue;
    }

    function setNumbers(uint256[2] memory _newValue) public {
        numbers = _newValue;
    }

    function setShortNumberA(uint8 _newValue) public {
        shortNumberA = _newValue;
    }

    function setShortNumberB(uint8 _newValue) public {
        shortNumberB = _newValue;
    }

    function setShortNumberC(uint128 _newValue) public {
        shortNumberC = _newValue;
    }
}
