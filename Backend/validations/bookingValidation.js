const Joi = require('joi');

const validateBooking = (data) => {
    const schema = Joi.object({
        passengerName: Joi.string().min(3).required(),
        flightNumber: Joi.string().alphanum().required(),
        seatNumber: Joi.string().required(),
        totalPrice: Joi.number().min(0).required(),
        bookingDate: Joi.date().iso().required()
    });

    return schema.validate(data);
};

module.exports = { validateBooking };