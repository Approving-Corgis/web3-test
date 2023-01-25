pragma solidity ^0.8.13;

contract Test {
    bool public open = false;

    constructor() {
        // 
    }

    function setOpen(bool _open) external {
        open = _open;
    }
}