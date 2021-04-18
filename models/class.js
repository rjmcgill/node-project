const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        validate: [
            {
                validator: async function (value) {
                    if(value === this.className) {
                        return true;
                    }

                    const count = await this.model('Class').countDocuments({ className: value });

                    return count == 0;
                },
                message: props => `${props.value} exists. Please try a different class.`
            }
        ]
    },
    spellcaster: {
        type: Boolean,
        required: true
    },
    mainAbilities: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Class', ClassSchema);