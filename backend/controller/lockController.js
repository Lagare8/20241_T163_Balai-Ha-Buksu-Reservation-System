// lockController.js
import Lock from '../models/users/lockSchema.js';

let isAddingEmployee = false; 

// Check if the action is locked
const checkLock = async (req, res) => {
    try {
        res.json({ isLocked: isAddingEmployee });  // Return the current lock status
    } catch (error) {
        console.error("Error checking lock status:", error);
        res.status(500).json({ error: "Error checking lock status" });
        console.log(`CHECK STATUS: ${isAddingEmployee}` )
    }
};

// Lock the action for adding employee (lock the process)
const lockAction = (req, res) => {
    console.log("Attempting to acquire lock. Current state:", isAddingEmployee);
    if (isAddingEmployee) {
        console.log("Lock already acquired. Another admin is adding an employee.");
        return res.status(400).json({ message: 'Another admin is adding an employee. Please wait.' });
    }
    isAddingEmployee = true;  // Lock the action
    console.log("Lock acquired. Current state:", isAddingEmployee);
    res.status(200).json({ message: 'Lock acquired. You can now add an employee.' });
};

const unlockAction = (req, res) => {
    console.log("Attempting to release lock. Current state:", isAddingEmployee);
    isAddingEmployee = false;  // Unlock the action
    console.log("Lock released. Current state:", isAddingEmployee);
    res.status(200).json({ message: 'Employee added and lock released.' });
};

export { checkLock, lockAction, unlockAction };
