const Operation = require("../models/operation");

const saveOperation = async (req, res) => {
    const { operation } = req.body;
    console.log(operation);
    const newOperation = new Operation(
        {
            operation: operation,
        }
    );
    const saveOperation = await newOperation.save();
    res.json({
            status: 'success',
            message: 'Form data submitted and saved to MongoDB!',
            data: saveOperation,
        });
}

const getOperations = async (req, res) => {
    try {
        const data = await Operation.find({}).exec();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { saveOperation, getOperations };