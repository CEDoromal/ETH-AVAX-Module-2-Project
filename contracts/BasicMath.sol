// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BasicMath {

    int latestResult;

    function add(int num1, int num2) external {
        latestResult = num1 + num2;
    }

    function subtract(int num1, int num2) external {
        latestResult = num1 - num2;
    }

    function getLatestResult() external view returns (int) {
        return latestResult;
    }
}