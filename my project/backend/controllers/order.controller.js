const orderModel=require("../models/order.model");

const placeOrder=async(req,res)=>{
    try{
        const order=await orderModel.create(req.body);
        res.status(201).json({status:"success",message:"Order is placed.",data:order})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ status: "error", message: "userId is required." });
        }
        const orders = await orderModel.find({ user: userId }).populate('items.product');
        res.status(200).json({
            status: "success",
            message: "User's orders retrieved successfully.",
            data: orders
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ status: "error", message: "An internal server error occurred.", error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;  // Extracting orderId from URL params
        const { orderStatus } = req.body;

        if (!id || !orderStatus) {
            return res.status(400).json({
                status: "error", 
                message: "orderId and orderStatus are required."
            });
        }

        // Find and update the order status
        const order = await orderModel.findByIdAndUpdate(
            id,
            { orderStatus: orderStatus },
            { new: true } // Return the updated document
        );

        // If order is not found
        if (!order) {
            return res.status(404).json({
                status: "error", 
                message: "Order not found."
            });
        }

        // Successful update response
        res.status(200).json({
            status: "success",
            message: "Order status updated successfully.",
            data: order
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            status: "error", 
            message: "An internal server error occurred."
        });
    }
};

const getAllOrders=async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user items.product');
        res.status(200).json({
            status: "success",
            message: "Orders retrieved successfully.",
            data: orders
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getNumberOrders=async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user items.product');
        res.status(200).json({
            status: "success",
            message: "Number of orders retrieved successfully.",
            data: orders.length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const setDeliveryDetails = async (req, res) => {
    try {
        const { id } = req.params; // Order ID from URL params
        const { deliveryFee, deliveryDays } = req.body; // Fee and days from request body

        // Validate input
        if (!id || deliveryFee == null || deliveryDays == null) {
            return res.status(400).json({
                status: "error",
                message: "Order ID, delivery fee, and delivery days are required.",
            });
        }

        if (deliveryFee <= 0 || deliveryDays <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Delivery fee and delivery days must be positive values.",
            });
        }

        // Calculate the estimated delivery date
        const estimatedDeliveryDate = new Date();
        estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + deliveryDays);

        // Update the order with delivery details
        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                deliveryFee,
                estimatedDeliveryDate,
            },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "error",
                message: "Order not found.",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Delivery details updated successfully.",
            data: updatedOrder,
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            status: "error",
            message: "An internal server error occurred.",
            error: err.message,
        });
    }
};

module.exports={
    placeOrder,
    updateOrderStatus,
    getUserOrders,
    getAllOrders,
    getNumberOrders,
    setDeliveryDetails
}